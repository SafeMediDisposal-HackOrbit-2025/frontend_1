import { useState, useEffect } from 'react';
import { ChevronLeft, Package, AlertTriangle, TrendingUp, RefreshCw, MoreHorizontal, ThermometerSun, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';

interface Container {
  id: string;
  location: string;
  type: string;
  capacity: number;
  currentLevel: number;
  status: 'normal' | 'warning' | 'critical' | 'full';
  lastEmptied: string;
  nextScheduled: string;
  wasteType: string;
  rfidTag: string;
  temperature?: number;
  lastUpdate: string;
}

interface Supply {
  id: string;
  name: string;
  category: 'containers' | 'bags' | 'labels' | 'equipment';
  currentStock: number;
  minThreshold: number;
  maxCapacity: number;
  unit: string;
  status: 'in-stock' | 'low' | 'out-of-stock' | 'reorder';
  supplier: string;
  lastRestocked: string;
  nextDelivery: string;
  cost: number;
}

interface InventoryStats {
  totalContainers: number;
  containersNeedingService: number;
  suppliesLowStock: number;
  avgFillLevel: number;
}

export default function InventoryCheck() {
  const [selectedView, setSelectedView] = useState<'containers' | 'supplies'>('containers');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const stats: InventoryStats = {
    totalContainers: 48,
    containersNeedingService: 12,
    suppliesLowStock: 5,
    avgFillLevel: 67
  };

  const containers: Container[] = [
    {
      id: 'CON-001',
      location: 'Block A - Surgery Wing',
      type: 'Red Container (50L)',
      capacity: 50,
      currentLevel: 47,
      status: 'critical',
      lastEmptied: '2 days ago',
      nextScheduled: 'Today 15:30',
      wasteType: 'Infectious Waste',
      rfidTag: 'RF001234',
      temperature: 23,
      lastUpdate: '5 min ago'
    },
    {
      id: 'CON-002',
      location: 'Block B - Emergency Ward',
      type: 'Yellow Container (30L)',
      capacity: 30,
      currentLevel: 22,
      status: 'warning',
      lastEmptied: '1 day ago',
      nextScheduled: 'Tomorrow 09:00',
      wasteType: 'Sharps & Needles',
      rfidTag: 'RF001235',
      temperature: 22,
      lastUpdate: '2 min ago'
    },
    {
      id: 'CON-003',
      location: 'Block C - Pharmacy',
      type: 'Blue Container (25L)',
      capacity: 25,
      currentLevel: 8,
      status: 'normal',
      lastEmptied: '6 hours ago',
      nextScheduled: 'Day after tomorrow',
      wasteType: 'Pharmaceutical',
      rfidTag: 'RF001236',
      temperature: 21,
      lastUpdate: '1 min ago'
    },
    {
      id: 'CON-004',
      location: 'Block D - Laboratory',
      type: 'Black Container (40L)',
      capacity: 40,
      currentLevel: 40,
      status: 'full',
      lastEmptied: '3 days ago',
      nextScheduled: 'URGENT - Today',
      wasteType: 'Hazardous Materials',
      rfidTag: 'RF001237',
      temperature: 24,
      lastUpdate: '3 min ago'
    },
    {
      id: 'CON-005',
      location: 'Block A - ICU',
      type: 'Red Container (50L)',
      capacity: 50,
      currentLevel: 15,
      status: 'normal',
      lastEmptied: '12 hours ago',
      nextScheduled: 'Tomorrow 14:00',
      wasteType: 'Infectious Waste',
      rfidTag: 'RF001238',
      temperature: 23,
      lastUpdate: '1 min ago'
    }
  ];

  const supplies: Supply[] = [
    {
      id: 'SUP-001',
      name: 'Red Biohazard Bags (50L)',
      category: 'bags',
      currentStock: 45,
      minThreshold: 50,
      maxCapacity: 500,
      unit: 'pieces',
      status: 'low',
      supplier: 'MedWaste Supplies Co.',
      lastRestocked: '5 days ago',
      nextDelivery: 'Tomorrow',
      cost: 2.50
    },
    {
      id: 'SUP-002',
      name: 'Sharps Containers (2L)',
      category: 'containers',
      currentStock: 12,
      minThreshold: 20,
      maxCapacity: 100,
      unit: 'pieces',
      status: 'low',
      supplier: 'SafeDisposal Inc.',
      lastRestocked: '8 days ago',
      nextDelivery: 'In 3 days',
      cost: 15.75
    },
    {
      id: 'SUP-003',
      name: 'RFID Tags',
      category: 'labels',
      currentStock: 150,
      minThreshold: 100,
      maxCapacity: 1000,
      unit: 'pieces',
      status: 'in-stock',
      supplier: 'Tech Solutions Ltd.',
      lastRestocked: '2 days ago',
      nextDelivery: 'Next week',
      cost: 1.25
    },
    {
      id: 'SUP-004',
      name: 'Digital Scales',
      category: 'equipment',
      currentStock: 3,
      minThreshold: 5,
      maxCapacity: 10,
      unit: 'pieces',
      status: 'low',
      supplier: 'MedEquip Pro',
      lastRestocked: '2 weeks ago',
      nextDelivery: 'In 5 days',
      cost: 125.00
    },
    {
      id: 'SUP-005',
      name: 'Yellow Clinical Bags',
      category: 'bags',
      currentStock: 0,
      minThreshold: 30,
      maxCapacity: 300,
      unit: 'pieces',
      status: 'out-of-stock',
      supplier: 'MedWaste Supplies Co.',
      lastRestocked: '10 days ago',
      nextDelivery: 'URGENT - Today',
      cost: 1.80
    }
  ];

  const getFillPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  // Auto refresh simulation
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      console.log('Auto-refreshing inventory data...');
    }, 15000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredContainers = filterStatus === 'all' 
    ? containers 
    : containers.filter(c => c.status === filterStatus);

  const filteredSupplies = filterStatus === 'all' 
    ? supplies 
    : supplies.filter(s => s.status === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9F9] via-[#F0F8F8] to-[#F5F9F9] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Inventory Check</h1>
              <p className="text-gray-500 text-sm mt-1">Monitor container levels and supply status</p>
            </div>
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`p-2 rounded-lg transition-colors ${
              autoRefresh 
                ? 'bg-[#50c2c9] text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Containers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalContainers}</p>
              </div>
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <Package className="w-6 h-6 text-[#50c2c9]" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Need Service</p>
                <p className="text-3xl font-bold text-gray-900">{stats.containersNeedingService}</p>
              </div>
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <AlertTriangle className="w-6 h-6 text-[#50c2c9]" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Low Stock Items</p>
                <p className="text-3xl font-bold text-gray-900">{stats.suppliesLowStock}</p>
              </div>
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <Package className="w-6 h-6 text-[#50c2c9]" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg. Fill Level</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgFillLevel}<span className="text-lg text-gray-500">%</span></p>
              </div>
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <TrendingUp className="w-6 h-6 text-[#50c2c9]" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl border border-[#50c2c9] border-opacity-15 p-1 mb-8">
          <div className="flex">
            <button
              onClick={() => setSelectedView('containers')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedView === 'containers'
                  ? 'bg-[#50c2c9] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Containers ({containers.length})
            </button>
            <button
              onClick={() => setSelectedView('supplies')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedView === 'supplies'
                  ? 'bg-[#50c2c9] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Supplies ({supplies.length})
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-4 mb-8">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50c2c9] focus:border-transparent"
          >
            <option value="all">All Status</option>
            {selectedView === 'containers' ? (
              <>
                <option value="normal">Normal</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
                <option value="full">Full</option>
              </>
            ) : (
              <>
                <option value="in-stock">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
                <option value="reorder">Reorder</option>
              </>
            )}
          </select>
        </div>

        {/* Container View */}
        {selectedView === 'containers' && (
          <div className="space-y-4">
            {filteredContainers.map((container) => {
              const fillPercentage = getFillPercentage(container.currentLevel, container.capacity);
              
              return (
                <div key={container.id} className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{container.type}</h3>
                        <p className="text-gray-500 text-sm">{container.location}</p>
                        <span className="text-[#50c2c9] font-medium text-sm">{container.id}</span>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Fill Level */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Fill Level</span>
                        <span className="text-sm font-bold text-gray-900">{container.currentLevel}L / {container.capacity}L ({fillPercentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-[#50c2c9] h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${fillPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Waste Type</p>
                        <p className="font-medium text-gray-900">{container.wasteType}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThermometerSun className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Temperature</p>
                          <p className="font-medium text-gray-900">{container.temperature}°C</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Last Emptied</p>
                          <p className="font-medium text-gray-900">{container.lastEmptied}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Next Scheduled</p>
                          <p className="font-medium text-gray-900">{container.nextScheduled}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        RFID: {container.rfidTag} • Updated {container.lastUpdate}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Supplies View */}
        {selectedView === 'supplies' && (
          <div className="space-y-4">
            {filteredSupplies.map((supply) => {
              const stockPercentage = getStockPercentage(supply.currentStock, supply.maxCapacity);
              
              return (
                <div key={supply.id} className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{supply.name}</h3>
                        <p className="text-gray-500 text-sm capitalize">{supply.category} • {supply.supplier}</p>
                        <span className="text-[#50c2c9] font-medium text-sm">{supply.id}</span>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Stock Level */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Stock Level</span>
                        <span className="text-sm font-bold text-gray-900">{supply.currentStock} / {supply.maxCapacity} {supply.unit} ({stockPercentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-[#50c2c9] h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${stockPercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Min: {supply.minThreshold}</span>
                        <span>Max: {supply.maxCapacity}</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Unit Cost</p>
                        <p className="font-medium text-gray-900">₹{supply.cost.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Total Value</p>
                        <p className="font-medium text-gray-900">₹{(supply.currentStock * supply.cost).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Last Restocked</p>
                        <p className="font-medium text-gray-900">{supply.lastRestocked}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Next Delivery</p>
                        <p className="font-medium text-gray-900">{supply.nextDelivery}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Category: {supply.category.charAt(0).toUpperCase() + supply.category.slice(1)}
                      </div>
                      <button className="px-4 py-2 bg-[#50c2c9] text-white text-sm font-medium rounded-lg hover:bg-[#47b1b8] transition-colors">
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AdminBottomNavigation />
    </div>
  );
}
