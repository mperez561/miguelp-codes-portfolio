import React, { useMemo, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Edges } from '@react-three/drei';
import type { BoxItem } from '../pages/ShippingOptimizerDemo';
import * as THREE from 'three'; // Import THREE for Color

interface ContainerVisualizationProps {
  items: BoxItem[];
  containerLength: number;
  containerWidth: number;
  containerHeight: number;
}

// Helper to generate somewhat distinct colors for items based on their ID
const generateColor = (itemId: string): THREE.Color => {
  let hue = 0;
  for (let i = 0; i < itemId.length; i++) {
    hue = (hue + itemId.charCodeAt(i) * (i * 19 + 1)) % 360;
  }
  hue = (hue % 360 + 360) % 360; // Ensure positive hue
  return new THREE.Color(`hsl(${hue}, 70%, 60%)`);
};

// Define a box with dimensions and position
interface PackedBox {
  id: string;
  itemIndex: number;
  instanceIndex: number;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
}

// Check if two boxes intersect, including a safety gap
const boxesIntersect = (
  box1: PackedBox,
  box2: PackedBox,
  horizontalGap: number = 0.01, // horizontal gap in meters
  verticalGap: number = 0, // no vertical gap
): boolean => {
  return (
    box1.x - horizontalGap < box2.x + box2.width + horizontalGap &&
    box1.x + box1.width + horizontalGap > box2.x - horizontalGap &&
    box1.y - verticalGap < box2.y + box2.height + verticalGap &&
    box1.y + box1.height + verticalGap > box2.y - verticalGap &&
    box1.z - horizontalGap < box2.z + box2.depth + horizontalGap &&
    box1.z + box1.depth + horizontalGap > box2.z - horizontalGap
  );
};

// Check if a box is inside the container
const isBoxInsideContainer = (
  box: PackedBox,
  containerLength: number,
  containerWidth: number,
  containerHeight: number,
  containerOriginX: number,
  containerOriginY: number,
  containerOriginZ: number,
  horizontalGap: number = 0.01, // horizontal gap in meters
): boolean => {
  return (
    box.x - horizontalGap >= containerOriginX &&
    box.x + box.width + horizontalGap <= containerOriginX + containerLength &&
    box.y >= containerOriginY && // No bottom gap
    box.y + box.height <= containerOriginY + containerHeight && // No top gap
    box.z - horizontalGap >= containerOriginZ &&
    box.z + box.depth + horizontalGap <= containerOriginZ + containerWidth
  );
};

// Define possible orientations for a box
const getOrientations = (width: number, height: number, depth: number): Array<{width: number, height: number, depth: number}> => {
  return [
    { width, height, depth },
    { width: depth, height, depth: width },
    { width, height: depth, depth: height },
    { width: height, height: width, depth },
    { width: depth, height: width, depth: height },
    { width: height, height: depth, depth: width }
  ];
};

const ContainerVisualization: React.FC<ContainerVisualizationProps> = ({ 
  items, 
  containerLength,
  containerWidth,
  containerHeight 
}) => {
  const [showVolumeVisualization, setShowVolumeVisualization] = useState(true);
  const HORIZONTAL_GAP = 0.01; // 1 cm horizontal gap in meters, now component-scoped
  const VERTICAL_GAP = 0; // No vertical gap, component-scoped for consistency if used by packing
  // const controlsRef = useRef<any>(null); // No longer needed for logging

  // Advanced 3D bin packing algorithm with useMemo
  const { packedBoxes, unplacedItemsForRender } = useMemo(() => {
    console.log('Running advanced packing algorithm with items:', items);
    console.log('Container dimensions:', { containerLength, containerWidth, containerHeight });
    
    // Container origin (bottom-left-back corner)
    const containerOriginX = -containerLength / 2;
    const containerOriginY = 0; // Start from the bottom of the container
    const containerOriginZ = -containerWidth / 2;
    
    // Create a list of all boxes that need to be packed, including quantities
    const allBoxes: Array<{
      id: string;
      itemIndex: number;
      instanceIndex: number;
      width: number;
      height: number;
      depth: number;
      volume: number;
    }> = [];
    
    items.forEach((item, itemIndex) => {
      for (let i = 0; i < Number(item.quantity); i++) {
        // Convert dimensions to meters and ensure minimum size for visibility
        const width = Math.max(0.05, Number(item.length) / 100);
        const height = Math.max(0.05, Number(item.height) / 100);
        const depth = Math.max(0.05, Number(item.width) / 100);
        
        allBoxes.push({
          id: item.id,
          itemIndex,
          instanceIndex: i,
          width,
          height,
          depth,
          volume: width * height * depth
        });
      }
    });
    
    // Sort boxes by volume (largest first) for better packing
    allBoxes.sort((a, b) => b.volume - a.volume);
    
    console.log('Sorted boxes to pack:', allBoxes);
    
    // Use a grid-based placement approach
    const packedBoxes: PackedBox[] = [];
    const unplacedItemsBuffer: PackedBox[] = []; // To collect unplaced items before final positioning
    
    // Try to place each box in the container
    allBoxes.forEach((box, boxIndex) => {
      console.log(`Trying to place box ${boxIndex} (${box.id}-${box.instanceIndex})`);
      
      // Skip very small boxes that might cause issues
      if (box.width < 0.01 || box.height < 0.01 || box.depth < 0.01) {
        console.log(`Skipping box ${boxIndex} - too small`);
        return;
      }
      
      // Try all possible orientations
      const orientations = getOrientations(box.width, box.height, box.depth);
      let placed = false;
      
      // If this is the first box, place it at origin
      if (packedBoxes.length === 0) {
        const orientation = orientations[0]; // Use default orientation for first box
        packedBoxes.push({
          id: box.id,
          itemIndex: box.itemIndex,
          instanceIndex: box.instanceIndex,
          x: containerOriginX + HORIZONTAL_GAP,
          y: containerOriginY, // No vertical gap from bottom
          z: containerOriginZ + HORIZONTAL_GAP,
          width: orientation.width,
          height: orientation.height,
          depth: orientation.depth
        });
        console.log(`Placed first box at origin: ${box.id}-${box.instanceIndex}`);
        return; // Continue to next box
      }
      
      // For subsequent boxes, try placing at various positions
      const stepSize = 0.05; // 5cm step size for grid search
      
      // Try placing on top of existing boxes first (no vertical gap)
      for (const existingBox of packedBoxes) {
        const topY = existingBox.y + existingBox.height; // No vertical gap
        
        for (const orientation of orientations) {
          const newBox: PackedBox = {
            id: box.id,
            itemIndex: box.itemIndex,
            instanceIndex: box.instanceIndex,
            x: existingBox.x,
            y: topY,
            z: existingBox.z,
            width: orientation.width,
            height: orientation.height,
            depth: orientation.depth
          };
          
          // Check if box fits inside container and doesn't intersect with other boxes
          if (isBoxInsideContainer(
            newBox,
            containerLength,
            containerWidth,
            containerHeight,
            containerOriginX,
            containerOriginY,
            containerOriginZ,
            HORIZONTAL_GAP
          )) {
            let intersects = false;
            for (const packedBox of packedBoxes) {
              if (boxesIntersect(newBox, packedBox, HORIZONTAL_GAP, VERTICAL_GAP)) {
                intersects = true;
                break;
              }
            }
            
            if (!intersects) {
              packedBoxes.push(newBox);
              console.log(`Placed box ${boxIndex} directly on top of another box: ${box.id}-${box.instanceIndex}`);
              placed = true;
              break;
            }
          }
        }
        
        if (placed) break;
      }
      
      // If couldn't place on top, try a grid search with horizontal gaps only
      if (!placed) {
        for (let x = containerOriginX + HORIZONTAL_GAP; x < containerOriginX + containerLength - box.width - HORIZONTAL_GAP; x += stepSize) {
          for (let y = containerOriginY; y < containerOriginY + containerHeight - box.height; y += stepSize) {
            for (let z = containerOriginZ + HORIZONTAL_GAP; z < containerOriginZ + containerWidth - box.depth - HORIZONTAL_GAP; z += stepSize) {
              // Try to place directly on the ground or on top of another box
              let validY = false;
              
              // If y is very close to the ground, snap to ground
              if (y < 0.01) {
                y = containerOriginY;
                validY = true;
              } else {
                // Check if there's a box directly below this position
                for (const packedBox of packedBoxes) {
                  if (
                    packedBox.y + packedBox.height === y &&
                    packedBox.x < x + box.width &&
                    packedBox.x + packedBox.width > x &&
                    packedBox.z < z + box.depth &&
                    packedBox.z + packedBox.depth > z
                  ) {
                    validY = true;
                    break;
                  }
                }
              }
              
              // Only proceed if y is valid (on ground or on another box)
              if (!validY) continue;
              
              for (const orientation of orientations) {
                const newBox: PackedBox = {
                  id: box.id,
                  itemIndex: box.itemIndex,
                  instanceIndex: box.instanceIndex,
                  x: x,
                  y: y,
                  z: z,
                  width: orientation.width,
                  height: orientation.height,
                  depth: orientation.depth
                };
                
                // Check if box fits inside container
                if (!isBoxInsideContainer(
                  newBox,
                  containerLength,
                  containerWidth, 
                  containerHeight,
                  containerOriginX,
                  containerOriginY,
                  containerOriginZ,
                  HORIZONTAL_GAP
                )) {
                  continue;
                }
                
                // Check for intersections with existing boxes
                let intersects = false;
                for (const packedBox of packedBoxes) {
                  if (boxesIntersect(newBox, packedBox, HORIZONTAL_GAP, VERTICAL_GAP)) {
                    intersects = true;
                    break;
                  }
                }
                
                if (!intersects) {
                  packedBoxes.push(newBox);
                  console.log(`Placed box ${boxIndex} at grid position: ${box.id}-${box.instanceIndex}`);
                  placed = true;
                  break;
                }
              }
              
              if (placed) break;
            }
            if (placed) break;
          }
          if (placed) break;
        }
      }
      
      if (!placed) {
        console.log(`Could not place box ${boxIndex}: ${box.id}-${box.instanceIndex}`);
        // Add to a temporary buffer with original dimensions for now
        unplacedItemsBuffer.push({
          id: box.id,
          itemIndex: box.itemIndex,
          instanceIndex: box.instanceIndex,
          x: 0, y: 0, z: 0, // Placeholder, will be updated
          width: box.width, // Use original dimensions
          height: box.height,
          depth: box.depth
        });
      }
    });
    
    // Position unplaced items to the side of the container
    const unplacedStartX = containerLength / 2 + 1; // Start 1m to the right of the container
    let currentUnplacedY = 0; // Start at ground level for vertical stacking
    const unplacedFixedZ = 0; // Place the stack centered along the container's original Z-axis
    const unplacedItemGap = 0.1; // Vertical gap between unplaced items

    const finalUnplacedItems: PackedBox[] = unplacedItemsBuffer.map(item => {
      const newX = unplacedStartX + item.width / 2;
      const newY = currentUnplacedY + item.height / 2;
      const newZ = unplacedFixedZ; // Keep Z fixed for all items in the stack
      
      currentUnplacedY += item.height + unplacedItemGap; // Increment Y for the next item to stack on top
      
      return {
        ...item,
        x: newX,
        y: newY,
        z: newZ
      };
    });
    
    console.log('Final packed boxes result:', packedBoxes);
    console.log('Unplaced items for render:', finalUnplacedItems);
    return { packedBoxes, unplacedItemsForRender: finalUnplacedItems };
  }, [items, containerLength, containerWidth, containerHeight]);
  
  // Debug log
  useEffect(() => {
    console.log('Number of packed boxes:', packedBoxes.length);
    if (packedBoxes.length === 0 && items.length > 0) {
      console.warn('No boxes were packed despite having items - debugging info:');
      console.log('Items:', items);
      console.log('Container:', { containerLength, containerWidth, containerHeight });
    }
  }, [packedBoxes, items, containerLength, containerWidth, containerHeight]);
  
  let boxKeyCounter = 0; // For unique keys

  // Calculate total item volume and the length it would fill in the container, considering gaps
  const { totalItemVolume, volumeFillLength, containerTotalVolume } = useMemo(() => {
    // Ensure container dimensions are positive before calculating total volume
    const currentContainerTotalVolume = 
      containerLength > 0 && containerWidth > 0 && containerHeight > 0 ? 
      containerLength * containerWidth * containerHeight : 0;

    if (!items || items.length === 0) {
      return { totalItemVolume: 0, volumeFillLength: 0, containerTotalVolume: currentContainerTotalVolume };
    }

    let currentTotalVolume = 0;
    items.forEach(item => {
      const rawLength = Number(item.length) / 100; // meters
      const rawWidth = Number(item.width) / 100;   // meters
      const rawHeight = Number(item.height) / 100; // meters
      const quantity = Number(item.quantity);

      // Add gaps to length and width for volume calculation
      const effectiveLength = rawLength + (rawLength > 0 ? 2 * HORIZONTAL_GAP : 0);
      const effectiveWidth = rawWidth + (rawWidth > 0 ? 2 * HORIZONTAL_GAP : 0);
      // VERTICAL_GAP is 0, so rawHeight is effectiveHeight for volume sum

      currentTotalVolume += effectiveLength * effectiveWidth * rawHeight * quantity;
    });

    let fillLength = 0;
    // Fill along the X-axis (containerLength)
    if (containerHeight > 0 && containerWidth > 0) { 
      fillLength = currentTotalVolume / (containerHeight * containerWidth);
    }
    
    // Cap fill length at container length
    fillLength = Math.min(fillLength, containerLength);
    // Ensure fillLength is not negative or NaN
    fillLength = Math.max(0, fillLength || 0); 

    return { 
      totalItemVolume: currentTotalVolume, 
      volumeFillLength: fillLength, 
      containerTotalVolume: currentContainerTotalVolume 
    };
  }, [items, containerLength, containerWidth, containerHeight]);

  const inset = 0.02; // Slightly increased inset

  // Fall back to grid layout if no boxes were packed
  const boxesToRender = packedBoxes.length > 0 ? packedBoxes : [];

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '100%', height: '500px', marginBottom: '10px' }}>
        <Canvas camera={{ position: [5.214, 3.996, 4.524], fov: 50 }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight 
            position={[containerLength * 0.8, containerHeight * 5, containerWidth * 2]}
            intensity={1.2} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          {/* Shipping Container (semi-transparent) */}
          <Box 
            args={[containerLength, containerHeight, containerWidth]}
            position={[0, containerHeight / 2, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#4a90e2" transparent opacity={0.05} />
            <Edges
              lineWidth={2}
              scale={1} // Default, ensure it aligns with the box
              threshold={15} // Default, for edge detection
              color="#4a90e2" // Stronger, opaque color for edges
            />
          </Box>

          {/* Render total volume fill if items exist and toggle is on */}
          {showVolumeVisualization && items.length > 0 && volumeFillLength > 0 && (
            <Box
              args={[
                Math.max(0, volumeFillLength - inset * 2), 
                Math.max(0, containerHeight - inset * 2), 
                Math.max(0, containerWidth - inset * 2)
              ]}
              position={[
                (-containerLength / 2) + inset + Math.max(0, volumeFillLength - inset * 2) / 2, 
                inset + Math.max(0, containerHeight - inset * 2) / 2, 
                0
              ]} 
            >
              <meshStandardMaterial 
                color="lightgreen" 
                transparent 
                opacity={0.35} 
                polygonOffset
                polygonOffsetFactor={-5} // Increased factor
                depthTest={false} // Potentially helps with z-fighting if it's inside another transparent object
              />
              <Edges
                lineWidth={2}
                color="lightgreen"
              />
            </Box>
          )}

          {/* Render packed boxes */}
          {boxesToRender.map((box) => {
            const itemColor = generateColor(box.id);
            
            // Calculate center position from corner position
            const positionX = box.x + box.width / 2;
            const positionY = box.y + box.height / 2;
            const positionZ = box.z + box.depth / 2;
            
            return (
              <Box
                key={`${box.id}-${box.instanceIndex}-${boxKeyCounter++}`}
                args={[box.width, box.height, box.depth]}
                position={[positionX, positionY, positionZ]}
                castShadow
                receiveShadow
              >
                <meshStandardMaterial color={itemColor} />
              </Box>
            );
          })}

          {/* Render unplaced boxes */}
          {unplacedItemsForRender.map((box) => {
            const itemColor = generateColor(box.id);
            // For unplaced items, position is already calculated as center
            return (
              <Box
                key={`unplaced-${box.id}-${box.instanceIndex}-${boxKeyCounter++}`}
                args={[box.width, box.height, box.depth]}
                position={[box.x, box.y, box.z]}
                castShadow
                receiveShadow
              >
                <meshStandardMaterial color={itemColor} />
              </Box>
            );
          })}

          <OrbitControls />
        </Canvas>
        <div 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '5px 10px',
            color: '#e0e0e0',
            fontSize: '12px',
            pointerEvents: 'none',
            textShadow: '0px 0px 3px rgba(0,0,0,0.7)',
          }}
        >
          Drag to rotate view
        </div>
      </div>
      <button 
        onClick={() => setShowVolumeVisualization(!showVolumeVisualization)}
        style={{
          margin: '10px auto', // Keep vertical margin, auto for horizontal centering
          padding: '12px 24px', // Adjusted padding
          fontSize: '16px', // Adjusted font size
          fontWeight: '600', // Semi-bold often looks good
          color: '#ffffff',
          backgroundColor: '#0ea5e9', // Sky blue (project's highlight color)
          border: 'none',
          borderRadius: '8px', // Moderately rounded corners
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Refined shadow
          transition: 'background-color 0.2s ease, transform 0.1s ease', // Smooth hover effect
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0d8cc7')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0ea5e9')}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {showVolumeVisualization ? 'Hide' : 'Show'} Volume Details
      </button>
      
      <div 
        style={{
          backgroundColor: 'rgba(40, 44, 52, 0.9)', // Dark, slightly transparent background
          padding: showVolumeVisualization ? '15px' : '0px', // Adjusted padding
          borderRadius: '8px',
          maxWidth: '400px',
          margin: '0 auto 20px auto',
          overflow: 'hidden',
          opacity: showVolumeVisualization ? 1 : 0,
          maxHeight: showVolumeVisualization ? '200px' : '0px',
          transition: 'opacity 0.3s ease-out, max-height 0.3s ease-out, padding 0.3s ease-out',
          color: '#e0e0e0', // Light gray/off-white text
          textAlign: 'left',
          border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle light border on dark background
        }}
      >
        <p style={{ margin: '0 0 6px 0', fontWeight: '600', fontSize: '0.9em', color: '#e0e0e0' }}>Container Volume: {containerTotalVolume.toFixed(2)} m³</p>
        <p style={{ margin: '0 0 6px 0', fontWeight: '600', fontSize: '0.9em', color: '#e0e0e0' }}>Items Volume: {totalItemVolume.toFixed(2)} m³ (green fill)</p>
        {containerTotalVolume > 0 && items.length > 0 && (
          <p style={{ margin: '0', fontWeight: '600', fontSize: '0.9em', color: '#e0e0e0' }}>Utilization: {((totalItemVolume / containerTotalVolume) * 100).toFixed(1)}%</p>
        )}
      </div>
    </div>
  );
};

export default ContainerVisualization; 