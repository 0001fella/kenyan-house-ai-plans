
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calculator, Info } from 'lucide-react';

const BudgetInput = ({ onBudgetChange, initialBudget = 0 }) => {
  const [budget, setBudget] = useState(initialBudget);
  const [budgetType, setBudgetType] = useState('total');

  const handleBudgetChange = (value) => {
    setBudget(value);
    onBudgetChange({ amount: value, type: budgetType });
  };

  const budgetRanges = [
    { label: '1M - 2M', value: 1500000 },
    { label: '2M - 3M', value: 2500000 },
    { label: '3M - 5M', value: 4000000 },
    { label: '5M+', value: 6000000 }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>Budget Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Budget Type</label>
          <select 
            value={budgetType}
            onChange={(e) => setBudgetType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="total">Total Project Budget</option>
            <option value="construction">Construction Only</option>
            <option value="materials">Materials Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Budget Amount (KES)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => handleBudgetChange(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
            placeholder="Enter budget amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Quick Select</label>
          <div className="grid grid-cols-2 gap-2">
            {budgetRanges.map((range) => (
              <Button
                key={range.label}
                variant="outline"
                size="sm"
                onClick={() => handleBudgetChange(range.value)}
                className="text-xs"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-md">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Budget includes:</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Materials and labor costs</li>
                <li>• Kenya market pricing</li>
                <li>• 10-15% contingency buffer</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetInput;
