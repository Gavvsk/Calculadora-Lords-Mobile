
import React from 'react';
import { ACCELERATORS } from '../constants';
import type { SpeedupCategoryEnum, SpeedupDenomination, SpeedupValues } from '../types';

interface SpeedupCategoryProps {
  title: string;
  category: SpeedupCategoryEnum;
  icon: React.ReactNode;
  values: SpeedupValues;
  onValueChange: (category: SpeedupCategoryEnum, id: SpeedupDenomination, value: string) => void;
}

const SpeedupCategory: React.FC<SpeedupCategoryProps> = ({ title, category, icon, values, onValueChange }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700/50">
      <div className="flex items-center gap-3 p-4 border-b border-slate-700/50">
        <span className="text-yellow-400">{icon}</span>
        <h2 className="text-xl font-serif font-bold text-slate-100">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {ACCELERATORS.map((acc) => (
          <div key={acc.id}>
            <label htmlFor={`${category}-${acc.id}`} className="block text-sm font-medium text-slate-400 mb-1">
              {acc.label}
            </label>
            <input
              type="number"
              id={`${category}-${acc.id}`}
              name={`${category}-${acc.id}`}
              value={values[acc.id] || ''}
              onChange={(e) => onValueChange(category, acc.id, e.target.value)}
              placeholder="0"
              min="0"
              className="w-full bg-slate-900/70 border border-slate-600 rounded-md shadow-sm text-slate-100 focus:ring-yellow-500 focus:border-yellow-500 transition"
              aria-label={`Cantidad para ${acc.label} de ${title}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeedupCategory;
