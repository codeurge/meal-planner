'use client';

import { useState } from 'react';
import type { Ingredient } from '@/data/recipes';

interface IngredientListProps {
  ingredients: Ingredient[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checked);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setChecked(newChecked);
  };

  return (
    <div className="space-y-2">
      {ingredients.map((ingredient, index) => (
        <label 
          key={index}
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <input
            type="checkbox"
            checked={checked.has(index)}
            onChange={() => toggleIngredient(index)}
            className="ingredient-checkbox w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
          />
          <span className={`flex-1 text-gray-800 ${checked.has(index) ? 'line-through opacity-50' : ''}`}>
            {ingredient.amount && (
              <span className="font-medium">{ingredient.amount}</span>
            )}{' '}
            {ingredient.item}
          </span>
        </label>
      ))}
    </div>
  );
}
