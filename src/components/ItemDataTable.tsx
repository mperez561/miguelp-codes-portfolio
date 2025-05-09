import React from 'react';
import type { BoxItem } from '../pages/ShippingOptimizerDemo';
import { FiPlus, FiSave, FiXCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';

// Helper to generate somewhat distinct HSL color strings for items based on their ID
const generateColorForTable = (itemId: string): string => {
  let hue = 0;
  for (let i = 0; i < itemId.length; i++) {
    // Multiply charCode by position to ensure different orderings of same chars yield different results
    // Using a prime multiplier (like 19) can help spread values.
    hue = (hue + itemId.charCodeAt(i) * (i * 19 + 1)) % 360;
  }
  // Ensure hue is positive, though with positive inputs and start, it should be.
  hue = (hue % 360 + 360) % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

interface ItemDataTableProps {
  items: BoxItem[];
  editingItemId: string | null;
  itemBeingEdited: BoxItem | null; // This holds the data for the row being edited (new or existing)
  onAddNewItemPlaceholder: () => void;
  onEditFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveItem: () => void;
  onCancelEdit: () => void;
  onDeleteItem: (itemId: string) => void;
  onStartEditItem: (item: BoxItem) => void;
}

const ItemDataTable: React.FC<ItemDataTableProps> = ({ 
  items,
  editingItemId,
  itemBeingEdited,
  onAddNewItemPlaceholder,
  onEditFormChange,
  onSaveItem,
  onCancelEdit,
  onDeleteItem,
  onStartEditItem,
}) => {

  const renderEditableRow = (rowData: BoxItem) => (
    <tr key={rowData.id} className="bg-secondary/50">
      <td className="p-2">
        <input type="text" name="name" value={rowData.name} onChange={onEditFormChange} className="input-primary text-sm p-2 w-full" placeholder="Item Name"/>
      </td>
      <td className="p-2"><input type="number" name="quantity" value={rowData.quantity} onChange={onEditFormChange} className="input-primary text-sm p-2 w-16" placeholder="Qty" min="1"/></td>
      <td className="p-2"><input type="number" name="length" value={rowData.length} onChange={onEditFormChange} className="input-primary text-sm p-2 w-16" placeholder="L"/></td>
      <td className="p-2"><input type="number" name="width" value={rowData.width} onChange={onEditFormChange} className="input-primary text-sm p-2 w-16" placeholder="W"/></td>
      <td className="p-2"><input type="number" name="height" value={rowData.height} onChange={onEditFormChange} className="input-primary text-sm p-2 w-16" placeholder="H"/></td>
      <td className="p-2 whitespace-nowrap text-center">
        <button onClick={onSaveItem} className="p-2 text-green-400 hover:text-green-300"><FiSave size={18}/></button>
        <button onClick={onCancelEdit} className="p-2 text-red-400 hover:text-red-300 ml-1"><FiXCircle size={18}/></button>
      </td>
    </tr>
  );

  const renderStaticRow = (item: BoxItem) => {
    const itemColor = generateColorForTable(item.id);
    return (
      <tr key={item.id} className="hover:bg-primary/40 transition-colors duration-150">
        <td className="p-3 whitespace-nowrap text-sm text-left flex items-center">
          <span 
            style={{ 
              backgroundColor: itemColor,
              width: '14px', 
              height: '14px', 
              borderRadius: '3px', 
              marginRight: '10px',
              display: 'inline-block',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          ></span>
          {item.name}
        </td>
        <td className="p-3 whitespace-nowrap text-sm text-left">{item.quantity}</td>
        <td className="p-3 whitespace-nowrap text-sm text-left">{item.length}</td>
        <td className="p-3 whitespace-nowrap text-sm text-left">{item.width}</td>
        <td className="p-3 whitespace-nowrap text-sm text-left">{item.height}</td>
        <td className="p-3 whitespace-nowrap text-sm text-center">
          <button onClick={() => onStartEditItem(item)} className="p-1 text-blue-400 hover:text-blue-300"><FiEdit2 size={16}/></button>
          <button onClick={() => onDeleteItem(item.id)} className="p-1 text-red-400 hover:text-red-300 ml-2"><FiTrash2 size={16}/></button>
        </td>
      </tr>
    );
  };

  // Determine if the itemBeingEdited is a new placeholder not yet in the main items list
  const isNewPlaceholderActive = itemBeingEdited && editingItemId === itemBeingEdited.id && !items.find(i => i.id === itemBeingEdited.id);

  return (
    <div className="space-y-6 glass-effect p-0 rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
        <h3 className="text-xl font-semibold text-text-primary gradient-text">Packing List</h3>
        <button 
          onClick={onAddNewItemPlaceholder}
          className="btn-primary inline-flex items-center justify-center text-sm p-2.5"
          disabled={!!editingItemId}
          aria-label="Add new item"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '14%' }} />
          </colgroup>
          <thead className="bg-secondary/40">
            <tr>
              <th className="p-2 text-left text-xs font-medium text-highlight uppercase tracking-wider">Name</th>
              <th className="p-2 text-left text-xs font-medium text-highlight uppercase tracking-wider">Qty</th>
              <th className="p-2 text-left text-xs font-medium text-highlight uppercase tracking-wider">L</th>
              <th className="p-2 text-left text-xs font-medium text-highlight uppercase tracking-wider">W</th>
              <th className="p-2 text-left text-xs font-medium text-highlight uppercase tracking-wider">H</th>
              <th className="p-2 text-center text-xs font-medium text-highlight uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="text-text-secondary divide-y divide-white/5">
            {/* Render the new item placeholder row if it's active */} 
            {isNewPlaceholderActive && itemBeingEdited && renderEditableRow(itemBeingEdited)}

            {/* Render existing items */} 
            {items.map((item) => (
              item.id === editingItemId && itemBeingEdited 
                ? renderEditableRow(itemBeingEdited) // If this existing item is being edited
                : renderStaticRow(item) // Otherwise, render static row
            ))}
            
            {/* Message if no items and no placeholder is active */}
            {items.length === 0 && !isNewPlaceholderActive && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-text-secondary/60 italic">
                  Your packing list is empty. Click "+" to begin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemDataTable; 