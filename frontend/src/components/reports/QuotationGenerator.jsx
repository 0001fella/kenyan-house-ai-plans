
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Calculator, 
  FileText, 
  Download, 
  Mail,
  Printer,
  Settings,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const QuotationGenerator = ({ projectData, onGenerate, userRole = 'Contractor' }) => {
  const [quotationItems, setQuotationItems] = useState([
    {
      item_code: "E101",
      description: "Excavation to formation level",
      unit: "m3",
      quantity: 500,
      unit_rate: 150.00,
      source: "CostX",
      category: "Earthworks",
      total: 75000
    },
    {
      item_code: "C203",
      description: "Concrete class 25/20",
      unit: "m3",
      quantity: 120,
      unit_rate: 8500.00,
      source: "Revit",
      category: "Structural Concrete",
      total: 1020000
    },
    {
      item_code: "F506",
      description: "Formwork to soffits of slabs",
      unit: "m2",
      quantity: 200,
      unit_rate: 420.00,
      source: "Candy",
      category: "Formwork",
      total: 84000
    }
  ]);

  const [totals, setTotals] = useState({
    subtotal: 1179000,
    tax_percent: 16,
    tax_amount: 188640,
    grand_total: 1367640
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleAddItem = () => {
    const newItem = {
      item_code: `NEW${quotationItems.length + 1}`,
      description: "New Item",
      unit: "m2",
      quantity: 1,
      unit_rate: 0,
      source: "Manual",
      category: "General",
      total: 0
    };
    setQuotationItems([...quotationItems, newItem]);
  };

  const handleEditItem = (index, field, value) => {
    const updatedItems = [...quotationItems];
    updatedItems[index][field] = value;
    
    if (field === 'quantity' || field === 'unit_rate') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unit_rate;
    }
    
    setQuotationItems(updatedItems);
    updateTotals(updatedItems);
  };

  const updateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax_amount = subtotal * (totals.tax_percent / 100);
    const grand_total = subtotal + tax_amount;
    
    setTotals({
      ...totals,
      subtotal,
      tax_amount,
      grand_total
    });
  };

  const handleDeleteItem = (index) => {
    const updatedItems = quotationItems.filter((_, i) => i !== index);
    setQuotationItems(updatedItems);
    updateTotals(updatedItems);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const canEdit = userRole === 'Contractor' || userRole === 'Engineer' || userRole === 'Admin';

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Project Quotation</span>
          </CardTitle>
          <div className="flex space-x-2">
            {canEdit && (
              <>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Project Info */}
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Project Details</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="font-medium">Project:</span> {projectData?.name || 'Highway Rehabilitation Phase 2'}</p>
                <p><span className="font-medium">Location:</span> {projectData?.location || 'Nairobi, Kenya'}</p>
                <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Source Systems</h3>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>CostX v7.0</span>
                  <span className="text-green-600">✓ Synced</span>
                </div>
                <div className="flex justify-between">
                  <span>Revit 2024</span>
                  <span className="text-green-600">✓ Synced</span>
                </div>
                <div className="flex justify-between">
                  <span>Candy v2.10</span>
                  <span className="text-green-600">✓ Synced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quotation Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Item Code</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Unit</th>
                  <th className="border border-gray-300 px-3 py-2 text-right text-sm font-medium">Qty</th>
                  <th className="border border-gray-300 px-3 py-2 text-right text-sm font-medium">Rate (KES)</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Source</th>
                  <th className="border border-gray-300 px-3 py-2 text-right text-sm font-medium">Total (KES)</th>
                  {isEditing && <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {quotationItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.item_code}
                          onChange={(e) => handleEditItem(index, 'item_code', e.target.value)}
                          className="w-full px-1 py-1 text-sm border rounded"
                        />
                      ) : (
                        item.item_code
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleEditItem(index, 'description', e.target.value)}
                          className="w-full px-1 py-1 text-sm border rounded"
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">{item.unit}</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleEditItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-20 px-1 py-1 text-sm border rounded text-right"
                        />
                      ) : (
                        item.quantity.toLocaleString()
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.unit_rate}
                          onChange={(e) => handleEditItem(index, 'unit_rate', parseFloat(e.target.value) || 0)}
                          className="w-24 px-1 py-1 text-sm border rounded text-right"
                        />
                      ) : (
                        item.unit_rate.toLocaleString()
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.source === 'CostX' ? 'bg-blue-100 text-blue-800' :
                        item.source === 'Revit' ? 'bg-green-100 text-green-800' :
                        item.source === 'Candy' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.source}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm font-medium">
                      {formatCurrency(item.total)}
                    </td>
                    {isEditing && (
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteItem(index)}
                          className="p-1 h-auto"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-80 space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Subtotal:</span>
                <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>VAT ({totals.tax_percent}%):</span>
                <span>{formatCurrency(totals.tax_amount)}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-800 text-lg font-bold">
                <span>Grand Total:</span>
                <span>{formatCurrency(totals.grand_total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Notes & Terms</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• All prices are in Kenya Shillings (KES) and include VAT where applicable</li>
              <li>• Material costs based on current Nairobi market rates</li>
              <li>• Prices valid for 30 days from quotation date</li>
              <li>• Quantities extracted from integrated BIM models and verified QTO systems</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuotationGenerator;
