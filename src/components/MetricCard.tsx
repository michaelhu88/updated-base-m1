import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  icon: LucideIcon;
  value: string;
}

const MetricCard = ({ title, icon: Icon, value }: MetricCardProps) => {
  const heights = ['40%', '60%', '30%', '70%', '50%', '80%', '45%', '65%', '35%', '55%', '75%', '50%'];

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-800 p-2 rounded-lg">
          <Icon size={20} className="text-gray-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm">Lorem text</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-20 mb-4 flex items-end justify-center gap-1">
        {heights.map((height, i) => (
          <div
            key={i}
            className="bg-purple-600 w-2 rounded-t opacity-60"
            style={{ height }}
          />
        ))}
      </div>

      {/* Value */}
      <div className="text-4xl font-bold text-white">{value}</div>
    </div>
  );
};

export default MetricCard;
