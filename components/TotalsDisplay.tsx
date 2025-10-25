import React from 'react';

interface TotalsDisplayProps {
  totalNormal: number;
  totalResearch: number;
  totalTraining: number;
  totalNormalAndResearch: number;
  totalNormalAndTraining: number;
  grandTotal: number;
}

const formatMinutes = (totalMinutes: number): string => {
  if (totalMinutes <= 0) return '0m';

  const days = Math.floor(totalMinutes / 1440); // 60 * 24
  const remainingMinutesAfterDays = totalMinutes % 1440;
  const hours = Math.floor(remainingMinutesAfterDays / 60);
  const minutes = remainingMinutesAfterDays % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.join(' ');
};

const TotalRow: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex justify-between items-baseline py-3 px-4 odd:bg-slate-700/30 even:bg-slate-700/10">
    <span className="text-slate-300 font-medium">{label}</span>
    <span className="text-xl font-bold font-mono text-yellow-300 tracking-wider">{formatMinutes(value)}</span>
  </div>
);

const TotalsDisplay: React.FC<TotalsDisplayProps> = ({
  totalNormal,
  totalResearch,
  totalTraining,
  totalNormalAndResearch,
  totalNormalAndTraining,
  grandTotal,
}) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700/50 overflow-hidden">
        <h2 className="text-2xl font-serif font-bold text-center p-4 bg-slate-900/50 border-b border-slate-700/50 text-yellow-400">
          Resumen de Totales
        </h2>
        <div className="flex flex-col">
            <TotalRow label="Normal" value={totalNormal} />
            <TotalRow label="Investigación" value={totalResearch} />
            <TotalRow label="Entrenamiento" value={totalTraining} />
            <div className="border-t-2 border-slate-700 my-2 mx-4"></div>
            <TotalRow label="Normal + Investigación" value={totalNormalAndResearch} />
            <TotalRow label="Normal + Entrenamiento" value={totalNormalAndTraining} />
            <div className="border-t-2 border-yellow-500/50 my-2 mx-4"></div>
            <div className="flex justify-between items-baseline py-4 px-4 bg-yellow-500/10">
                <span className="text-lg text-yellow-300 font-bold">Total General</span>
                <span className="text-2xl font-bold font-mono text-yellow-200 tracking-wider">{formatMinutes(grandTotal)}</span>
            </div>
        </div>
    </div>
  );
};

export default TotalsDisplay;