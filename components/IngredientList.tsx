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

  const allChecked = checked.size === ingredients.length;

  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium" style={{ color: 'var(--foreground-faint)' }}>
          {checked.size} of {ingredients.length} gathered
        </span>
        {allChecked && (
          <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
            ✓ Ready to cook!
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full mb-4 overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${(checked.size / ingredients.length) * 100}%`,
            background: allChecked ? 'var(--primary)' : 'var(--accent)',
          }}
        />
      </div>

      {/* Ingredients */}
      <div className="space-y-1">
        {ingredients.map((ingredient, index) => {
          const isChecked = checked.has(index);
          return (
            <label
              key={index}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl cursor-pointer transition-colors"
              style={{
                background: isChecked ? 'var(--surface)' : 'transparent',
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleIngredient(index)}
                className="ingredient-checkbox w-5 h-5 rounded cursor-pointer"
              />
              <span
                className="flex-1 text-sm transition-opacity"
                style={{
                  color: isChecked ? 'var(--foreground-faint)' : 'var(--foreground)',
                  textDecoration: isChecked ? 'line-through' : 'none',
                  opacity: isChecked ? 0.5 : 1,
                }}
              >
                {ingredient.amount && (
                  <span className="font-semibold">{ingredient.amount}</span>
                )}{' '}
                {ingredient.item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
