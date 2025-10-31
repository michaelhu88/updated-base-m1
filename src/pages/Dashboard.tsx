import { Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <main className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-8 items-start">
        {/* Metrics Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-2xl font-semibold">Metrics</h2>
          <div className="bg-gray-900 rounded-xl p-12 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
            <Plus size={48} className="text-gray-400" />
          </div>
        </div>

        {/* Modules Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-2xl font-semibold">Modules</h2>
          <div className="bg-gray-900 rounded-xl p-12 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
            <Plus size={48} className="text-gray-400" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
