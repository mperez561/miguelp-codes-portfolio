import React, { useState } from 'react';
import ItemDataTable from '../components/ItemDataTable';
import ContainerVisualization from '../components/ContainerVisualization';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Define BoxItem interface and initialItem constant here
export interface BoxItem { // Exporting if it might be used by ContainerVisualization later
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  quantity: number;
}

// Base for a new item, ID will be added when placeholder is created
const defaultNewItemValues: Omit<BoxItem, 'id'> = {
  name: '', // Will be overridden for new items
  length: 10, // Default sensible values
  width: 10,
  height: 10,
  quantity: 1,
};

// Default container dimensions (in meters)
const DEFAULT_CONTAINER_LENGTH = 5.898;
const DEFAULT_CONTAINER_WIDTH = 2.352;
const DEFAULT_CONTAINER_HEIGHT = 2.393;

const initialDefaultItems: BoxItem[] = [
  { id: 'demo-item-1', name: 'Large Base Box', length: 110, width: 110, height: 45, quantity: 10 },
  { id: 'demo-item-2', name: 'Standard Cube', length: 55, width: 55, height: 55, quantity: 84 },
  { id: 'demo-item-3', name: 'Document Tube Box', length: 20, width: 20, height: 80, quantity: 84 },
];

const ShippingOptimizerDemo = () => {
  const [items, setItems] = useState<BoxItem[]>(initialDefaultItems);
  
  // State for container dimensions
  const [containerLength, setContainerLength] = useState<number>(DEFAULT_CONTAINER_LENGTH);
  const [containerWidth, setContainerWidth] = useState<number>(DEFAULT_CONTAINER_WIDTH);
  const [containerHeight, setContainerHeight] = useState<number>(DEFAULT_CONTAINER_HEIGHT);
  const [isContainerSettingsOpen, setIsContainerSettingsOpen] = useState(false);

  // State for in-table editing
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemBeingEdited, setItemBeingEdited] = useState<BoxItem | null>(null);

  const handleContainerSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    if (name === 'containerLength') {
      setContainerLength(numValue || DEFAULT_CONTAINER_LENGTH);
    } else if (name === 'containerWidth') {
      setContainerWidth(numValue || DEFAULT_CONTAINER_WIDTH);
    } else if (name === 'containerHeight') {
      setContainerHeight(numValue || DEFAULT_CONTAINER_HEIGHT);
    }
  };

  const handleAddNewItemPlaceholder = () => {
    const newItemId = `new-${Date.now().toString()}`;
    const placeholderItem: BoxItem = {
      id: newItemId,
      ...defaultNewItemValues, // Spread first
      name: `Item ${items.length + 1}`, // Then set the dynamic name
    };
    setItemBeingEdited(placeholderItem);
    setEditingItemId(newItemId);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!itemBeingEdited) return;
    const { name, value } = e.target;
    
    // Handle different field types appropriately
    if (name === 'name') {
      // For text fields, just use the value directly
      setItemBeingEdited(prev => ({
        ...prev!,
        [name]: value
      }));
    } else {
      // For number fields
      if (value === '') {
        // If the field is empty, don't immediately set to 0
        // Instead, keep as empty string which will be treated as invalid on save
        setItemBeingEdited(prev => ({
          ...prev!,
          [name]: value
        }));
      } else {
        // Otherwise, convert to number
        const numValue = parseFloat(value);
        setItemBeingEdited(prev => ({
          ...prev!,
          [name]: numValue
        }));
      }
    }
  };

  const handleSaveEditedItem = () => {
    if (!itemBeingEdited || !editingItemId) return;

    // Create a valid version of the item with defaults applied
    const validatedItem = {
      ...itemBeingEdited,
      // Use default of 10 for any empty dimensions
      length: typeof itemBeingEdited.length === 'string' && itemBeingEdited.length === '' ? 10 : Number(itemBeingEdited.length) <= 0 ? 10 : Number(itemBeingEdited.length),
      width: typeof itemBeingEdited.width === 'string' && itemBeingEdited.width === '' ? 10 : Number(itemBeingEdited.width) <= 0 ? 10 : Number(itemBeingEdited.width),
      height: typeof itemBeingEdited.height === 'string' && itemBeingEdited.height === '' ? 10 : Number(itemBeingEdited.height) <= 0 ? 10 : Number(itemBeingEdited.height),
      // Use default of 1 for quantity and 0 for weight if empty
      quantity: typeof itemBeingEdited.quantity === 'string' && itemBeingEdited.quantity === '' ? 1 : Number(itemBeingEdited.quantity) <= 0 ? 1 : Number(itemBeingEdited.quantity),
    };

    // Basic Validation for name
    if (!validatedItem.name) {
      alert('Please enter an item name.');
      return;
    }

    const existingItemIndex = items.findIndex(item => item.id === editingItemId);

    if (existingItemIndex > -1) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = validatedItem;
      setItems(updatedItems);
    } else {
      // Add new item (it was a placeholder)
      setItems(prevItems => [...prevItems, validatedItem]);
    }
    setEditingItemId(null);
    setItemBeingEdited(null);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setItemBeingEdited(null);
  };

  const handleDeleteItem = (itemIdToDelete: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemIdToDelete));
    if (editingItemId === itemIdToDelete) {
      handleCancelEdit(); // If the deleted item was being edited, cancel edit mode
    }
  };
  
  // Handler for starting to edit an existing item (to be called from ItemDataTable)
  const handleStartEditItem = (itemToEdit: BoxItem) => {
    setEditingItemId(itemToEdit.id);
    setItemBeingEdited({ ...itemToEdit }); // Set a copy for editing
  };

  return (
    <div className="bg-primary min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className="container-custom relative z-10 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Shipping Optimizer</h1>
          <p className="text-text-secondary max-w-3xl mx-auto">
            Visualize and optimize packing for various container and item sizes.
          </p>
        </div>

        <div className="glass-effect rounded-xl shadow-lg">
          <button
            onClick={() => setIsContainerSettingsOpen(!isContainerSettingsOpen)}
            className="w-full flex items-center justify-between p-4 md:p-6 focus:outline-none hover:bg-white/5 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <FiSettings className="w-5 h-5 text-highlight" />
              <span className="text-lg font-semibold text-text-primary">Container Settings</span>
            </div>
            {isContainerSettingsOpen ? <FiChevronUp className="w-6 h-6 text-text-secondary" /> : <FiChevronDown className="w-6 h-6 text-text-secondary" />}
          </button>
          <AnimatePresence initial={false}>
            {isContainerSettingsOpen && (
              <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto', marginTop: '1.5rem', paddingBottom: '1.5rem' },
                  collapsed: { opacity: 0, height: 0, marginTop: '0rem', paddingBottom: '0rem' }
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden px-4 md:px-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                  <div>
                    <label htmlFor="containerLength" className="block text-sm font-medium text-text-secondary mb-1">Length (m)</label>
                    <input 
                      type="number"
                      name="containerLength"
                      id="containerLength"
                      value={containerLength}
                      onChange={handleContainerSettingsChange}
                      placeholder="e.g., 12"
                      className="input-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="containerWidth" className="block text-sm font-medium text-text-secondary mb-1">Width (m)</label>
                    <input 
                      type="number"
                      name="containerWidth"
                      id="containerWidth"
                      value={containerWidth}
                      onChange={handleContainerSettingsChange}
                      placeholder="e.g., 2.4"
                      className="input-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="containerHeight" className="block text-sm font-medium text-text-secondary mb-1">Height (m)</label>
                    <input 
                      type="number"
                      name="containerHeight"
                      id="containerHeight"
                      value={containerHeight}
                      onChange={handleContainerSettingsChange}
                      placeholder="e.g., 2.4"
                      className="input-primary"
                    />
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Item Data Table Section - Props will change significantly */}
          <ItemDataTable 
            items={items}
            editingItemId={editingItemId}
            itemBeingEdited={itemBeingEdited}
            onAddNewItemPlaceholder={handleAddNewItemPlaceholder}
            onEditFormChange={handleEditFormChange}
            onSaveItem={handleSaveEditedItem}
            onCancelEdit={handleCancelEdit}
            onDeleteItem={handleDeleteItem}
            onStartEditItem={handleStartEditItem} // New prop for starting edit of existing item
          />

          {/* 3D Visualization Section */}
          <div className="p-6 glass-effect rounded-xl shadow-lg lg:sticky lg:top-24"> {/* Added shadow & sticky for viz */}
            <h2 className="text-2xl font-bold mb-4 gradient-text">Container Visualization</h2>
            <ContainerVisualization 
              items={items} 
              containerWidth={containerWidth}
              containerLength={containerLength}
              containerHeight={containerHeight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingOptimizerDemo; 