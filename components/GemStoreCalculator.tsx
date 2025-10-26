import React, { useState, useMemo } from 'react';
import { GemIcon } from './icons.tsx';

// Solo se consideran los aceleradores de 24h y 15h con sus precios correctos.
const SPEEDUPS_FOR_GEMS = [
  { name: '24 Horas', timeInMinutes: 24 * 60, cost: 1500 },
  { name: '15 Horas', timeInMinutes: 15 * 60, cost: 1000 },
];

const formatMinutes = (totalMinutes: number): string => {
  if (totalMinutes <= 0) return '0m';
  const days = Math.floor(totalMinutes / 1440);
  const remainingMinutesAfterDays = totalMinutes % 1440;
  const hours = Math.floor(remainingMinutesAfterDays / 60);
  const minutes = remainingMinutesAfterDays % 60;
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  return parts.join(' ') || '0m';
};

const GemStoreCalculator: React.FC = () => {
  const [gems, setGems] = useState<string>('');

  const handleGemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setGems(value);
    }
  };

  const calculation = useMemo(() => {
    const initialGems = parseInt(gems, 10) || 0;
    if (initialGems <= 0) {
      return { purchases: [], totalTime: 0, remainingGems: 0, spentGems: 0 };
    }

    let remainingGems = initialGems;
    const purchases: { name: string; count: number }[] = [];
    let totalTime = 0;

    // Lógica de cálculo secuencial correcta:
    // 1. Comprar tantos aceleradores de 24h como sea posible.
    // 2. Con las gemas restantes, comprar tantos de 15h como sea posible.
    SPEEDUPS_FOR_GEMS.forEach(speedup => {
      if (remainingGems >= speedup.cost) {
        const count = Math.floor(remainingGems / speedup.cost);
        if (count > 0) {
          purchases.push({ name: speedup.name, count });
          totalTime += count * speedup.timeInMinutes;
          remainingGems -= count * speedup.cost;
        }
      }
    });
    
    const spentGems = initialGems - remainingGems;

    return {
      purchases,
      totalTime,
      remainingGems,
      spentGems,
    };
  }, [gems]);
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
            Comprar Aceleradores con Gemas
          </h1>
          <p className="mt-2 text-slate-400 max-w-2xl mx-auto">Calcula la compra óptima de aceleradores según tu cantidad de gemas.</p>
        </header>
        
        <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700/50 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="gems-input" className="flex items-center gap-2 text-lg font-medium text-slate-100 flex-shrink-0">
              <GemIcon className="w-6 h-6 text-cyan-400" />
              <span>Gemas Disponibles:</span>
            </label>
            <input
              type="text"
              id="gems-input"
              value={gems}
              onChange={handleGemsChange}
              placeholder="0"
              className="w-full sm:w-auto flex-grow bg-slate-900/70 border border-slate-600 rounded-md shadow-sm text-slate-100 focus:ring-cyan-500 focus:border-cyan-500 transition text-lg px-4 py-2"
              aria-label="Cantidad de gemas disponibles"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>

        {parseInt(gems, 10) > 0 && (
          <div className="mt-8 bg-slate-800/50 rounded-lg shadow-lg border border-slate-700/50 overflow-hidden">
            <h2 className="text-2xl font-serif font-bold text-center p-4 bg-slate-900/50 border-b border-slate-700/50 text-cyan-400">
              Resultados de la Compra
            </h2>
            
            <div className="p-6">
              {calculation.purchases.length > 0 ? (
                <ul className="divide-y divide-slate-700">
                  {calculation.purchases.map(p => (
                    <li key={p.name} className="flex justify-between items-center py-3">
                      <span className="text-slate-300">Acelerador de {p.name}</span>
                      <span className="font-bold text-slate-100">x {p.count.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                 <p className="text-center text-slate-400 py-4">No tienes suficientes gemas para comprar aceleradores.</p>
              )}
            </div>
            
            <div className="border-t-2 border-slate-700 mx-6"></div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center bg-slate-900/20">
                <div>
                    <p className="text-sm text-slate-400">Gemas Gastadas</p>
                    <p className="text-2xl font-bold font-mono text-slate-100">{calculation.spentGems.toLocaleString()}</p>
                </div>
                 <div>
                    <p className="text-sm text-slate-400">Gemas Restantes</p>
                    <p className="text-2xl font-bold font-mono text-slate-100">{calculation.remainingGems.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400">Tiempo Total Obtenido</p>
                    <p className="text-2xl font-bold font-mono text-cyan-300">{formatMinutes(calculation.totalTime)}</p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GemStoreCalculator;