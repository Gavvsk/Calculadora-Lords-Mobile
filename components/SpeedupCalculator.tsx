import React, { useState, useMemo, useCallback } from 'react';
import SpeedupCategory from './SpeedupCategory.tsx';
import TotalsDisplay from './TotalsDisplay.tsx';
import { ClockIcon, FlaskIcon, ShieldIcon } from './icons.tsx';
import { SpeedupCategoryEnum, type AllSpeedups, type SpeedupDenomination, type SpeedupValues } from '../types.ts';
import { ACCELERATORS } from '../constants.ts';

const SpeedupCalculator: React.FC = () => {
  const [speedups, setSpeedups] = useState<AllSpeedups>({
    [SpeedupCategoryEnum.NORMAL]: {},
    [SpeedupCategoryEnum.RESEARCH]: {},
    [SpeedupCategoryEnum.TRAINING]: {},
  });

  const handleSpeedupChange = useCallback((
    category: SpeedupCategoryEnum,
    id: SpeedupDenomination,
    value: string
  ) => {
    const newAmount = parseInt(value, 10);
    setSpeedups(prev => {
      const newCategoryValues = { ...prev[category] };
      if (isNaN(newAmount) || newAmount <= 0) {
        delete newCategoryValues[id];
      } else {
        newCategoryValues[id] = newAmount;
      }
      return {
        ...prev,
        [category]: newCategoryValues,
      };
    });
  }, []);

  const calculateTotalMinutes = (values: SpeedupValues): number => {
    return ACCELERATORS.reduce((total, accelerator) => {
      const count = values[accelerator.id] || 0;
      return total + count * accelerator.value;
    }, 0);
  };
  
  const totalNormal = useMemo(() => calculateTotalMinutes(speedups.normal), [speedups.normal]);
  const totalResearch = useMemo(() => calculateTotalMinutes(speedups.research), [speedups.research]);
  const totalTraining = useMemo(() => calculateTotalMinutes(speedups.training), [speedups.training]);

  const totalNormalAndResearch = useMemo(() => totalNormal + totalResearch, [totalNormal, totalResearch]);
  const totalNormalAndTraining = useMemo(() => totalNormal + totalTraining, [totalNormal, totalTraining]);
  const grandTotal = useMemo(() => totalNormal + totalResearch + totalTraining, [totalNormal, totalResearch, totalTraining]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
            Calculadora de Aceleradores
          </h1>
          <p className="mt-2 text-slate-400 max-w-2xl mx-auto">Ingresa tus aceleradores para ver el tiempo total calculado al instante.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <SpeedupCategory
              title="Aceleradores Normales"
              category={SpeedupCategoryEnum.NORMAL}
              icon={<ClockIcon className="w-8 h-8"/>}
              values={speedups.normal}
              onValueChange={handleSpeedupChange}
            />
            <SpeedupCategory
              title="Aceleradores de Investigación"
              category={SpeedupCategoryEnum.RESEARCH}
              icon={<FlaskIcon className="w-8 h-8"/>}
              values={speedups.research}
              onValueChange={handleSpeedupChange}
            />
            <SpeedupCategory
              title="Aceleradores de Entrenamiento"
              category={SpeedupCategoryEnum.TRAINING}
              icon={<ShieldIcon className="w-8 h-8"/>}
              values={speedups.training}
              onValueChange={handleSpeedupChange}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky top-6">
              <TotalsDisplay
                totalNormal={totalNormal}
                totalResearch={totalResearch}
                totalTraining={totalTraining}
                totalNormalAndResearch={totalNormalAndResearch}
                totalNormalAndTraining={totalNormalAndTraining}
                grandTotal={grandTotal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedupCalculator;