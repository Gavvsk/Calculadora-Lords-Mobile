import React, { useState, useMemo } from 'react';

const BASE_TIMES = {
  t1: 15, // seconds
  t2: 30,
  t3: 60,
  t4: 120,
};

const TIERS = ['t1', 't2', 't3', 't4'];
const TROOP_TYPES = [
  { id: 'inf', name: 'Infantería' },
  { id: 'cav', name: 'Caballería' },
  { id: 'art', name: 'Artillería' },
  { id: 'sie', name: 'Asedio' },
];

const formatSeconds = (totalSeconds: number): string => {
  if (totalSeconds <= 0) return '0s';

  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};


const TrainingCalculator: React.FC = () => {
  const [trainingSpeed, setTrainingSpeed] = useState('');
  const [troopCounts, setTroopCounts] = useState(() => {
    const initialState: { [tier: string]: { [type: string]: string } } = {};
    TIERS.forEach(tier => {
      initialState[tier] = {};
      TROOP_TYPES.forEach(type => {
        initialState[tier][type.id] = '';
      });
    });
    return initialState;
  });

  const handleInputChange = (tier: string, type: string, value: string) => {
    if (/^\d*$/.test(value)) {
      setTroopCounts(prev => ({
        ...prev,
        [tier]: {
          ...prev[tier],
          [type]: value,
        },
      }));
    }
  };
  
  const totalTimeSeconds = useMemo(() => {
    let totalBaseSeconds = 0;
    for (const tier of TIERS) {
      const baseTime = BASE_TIMES[tier as keyof typeof BASE_TIMES];
      for (const type of TROOP_TYPES) {
        const count = parseInt(troopCounts[tier][type.id], 10) || 0;
        totalBaseSeconds += count * baseTime;
      }
    }
    
    const speedBonus = parseFloat(trainingSpeed) || 0;
    if (speedBonus <= -100) return Infinity; // Avoid division by zero or negative speed

    return totalBaseSeconds / (1 + speedBonus / 100);
  }, [troopCounts, trainingSpeed]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
            Calculadora de Entrenamiento
          </h1>
          <p className="mt-2 text-slate-400 max-w-2xl mx-auto">Calcula el tiempo necesario para entrenar tus tropas.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {TIERS.map((tier, index) => (
              <div key={tier} className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700/50">
                <h2 className="text-xl font-bold font-serif text-slate-100 p-4 border-b border-slate-700/50">
                  Tropas T{index + 1}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                  {TROOP_TYPES.map(type => (
                    <div key={type.id}>
                      <label htmlFor={`${tier}-${type.id}`} className="block text-sm font-medium text-slate-400 mb-1">
                        {type.name}
                      </label>
                      <input
                        type="text"
                        id={`${tier}-${type.id}`}
                        value={troopCounts[tier][type.id]}
                        onChange={e => handleInputChange(tier, type.id, e.target.value)}
                        placeholder="0"
                        className="w-full bg-slate-900/70 border border-slate-600 rounded-md shadow-sm text-slate-100 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="lg:sticky top-6 space-y-6">
              <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700/50 p-6">
                 <label htmlFor="training-speed" className="block text-lg font-medium text-slate-100 mb-2">
                   Velocidad de Entrenamiento (%)
                 </label>
                 <input
                    type="text"
                    id="training-speed"
                    value={trainingSpeed}
                    onChange={e => /^\d*\.?\d*$/.test(e.target.value) && setTrainingSpeed(e.target.value)}
                    placeholder="Ej: 550.5"
                    className="w-full bg-slate-900/70 border border-slate-600 rounded-md shadow-sm text-slate-100 focus:ring-emerald-500 focus:border-emerald-500 transition text-lg px-4 py-2"
                    inputMode="decimal"
                 />
              </div>

              <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700/50 text-center">
                <h2 className="text-xl font-serif font-bold p-4 bg-slate-900/50 border-b border-slate-700/50 text-emerald-400">
                  Tiempo Total de Entrenamiento
                </h2>
                <div className="p-6">
                  <p className="text-3xl sm:text-4xl font-bold font-mono text-slate-100 tracking-wider">
                    {formatSeconds(totalTimeSeconds)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCalculator;