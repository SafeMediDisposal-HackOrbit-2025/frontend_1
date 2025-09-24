import { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Truck, Clock, Navigation, Phone, RefreshCw, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';
import AdminBottomNavigation from '@/react-app/components/AdminBottomNavigation';

interface Vehicle {
  id: string;
  driverName: string;
  vehicleNumber: string;
  currentLocation: string;
  destination: string;
  status: 'en-route' | 'loading' | 'completed' | 'delayed';
  progress: number;
  estimatedArrival: string;
  wasteCollected: string;
  route: string;
  lastUpdate: string;
  speed: number;
  distance: string;
  avatar: string;
}

interface RouteStats {
  activeVehicles: number;
  completedRoutes: number;
  avgDeliveryTime: number;
  totalDistance: number;
}

export default function RouteTracker() {
  const [selectedView, setSelectedView] = useState<'active' | 'completed'>('active');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const stats: RouteStats = {
    activeVehicles: 8,
    completedRoutes: 23,
    avgDeliveryTime: 32,
    totalDistance: 156
  };

  const vehicles: Vehicle[] = [
    {
      id: 'VH-001',
      driverName: 'Rajesh Kumar',
      vehicleNumber: 'MH 01 AB 1234',
      currentLocation: 'Sector 15, Near City Hospital',
      destination: 'Medical Waste Processing Center',
      status: 'en-route',
      progress: 65,
      estimatedArrival: '14:45',
      wasteCollected: '85kg',
      route: 'Route A - North Zone',
      lastUpdate: '2 min ago',
      speed: 45,
      distance: '3.2 km',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'VH-002',
      driverName: 'Amit Patel',
      vehicleNumber: 'MH 01 CD 5678',
      currentLocation: 'Loading at Metro Medical Center',
      destination: 'Processing Facility B',
      status: 'loading',
      progress: 30,
      estimatedArrival: '15:20',
      wasteCollected: '42kg',
      route: 'Route B - Central Zone',
      lastUpdate: '1 min ago',
      speed: 0,
      distance: '7.8 km',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'VH-003',
      driverName: 'Suresh Singh',
      vehicleNumber: 'MH 01 EF 9012',
      currentLocation: 'Processing Center A',
      destination: 'Completed',
      status: 'completed',
      progress: 100,
      estimatedArrival: '14:30',
      wasteCollected: '125kg',
      route: 'Route C - South Zone',
      lastUpdate: '15 min ago',
      speed: 0,
      distance: '0 km',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'VH-004',
      driverName: 'Prakash Mehta',
      vehicleNumber: 'MH 01 GH 3456',
      currentLocation: 'Delayed at Regional Hospital',
      destination: 'Central Processing Unit',
      status: 'delayed',
      progress: 15,
      estimatedArrival: '16:10',
      wasteCollected: '22kg',
      route: 'Route D - East Zone',
      lastUpdate: '5 min ago',
      speed: 0,
      distance: '12.5 km',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const completedRoutes = vehicles.filter(v => v.status === 'completed');
  const activeVehicles = vehicles.filter(v => v.status !== 'completed');

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en-route': return 'En Route';
      case 'loading': return 'Loading';
      case 'completed': return 'Completed';
      case 'delayed': return 'Delayed';
      default: return status;
    }
  };

  // Auto refresh simulation
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      console.log('Auto-refreshing route data...');
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const displayVehicles = selectedView === 'active' ? activeVehicles : completedRoutes;

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
              <h1 className="text-2xl font-bold text-gray-900">Route Tracker</h1>
              <p className="text-gray-500 text-sm mt-1">Monitor vehicles and routes in real-time</p>
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
          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Vehicles</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeVehicles}</p>
              </div>
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <Truck className="w-6 h-6 text-[#50c2c9]" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed Today</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedRoutes}</p>
              </div>
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <Navigation className="w-6 h-6 text-[#50c2c9]" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Avg. Time</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgDeliveryTime}<span className="text-lg text-gray-500">min</span></p>
              </div>
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <Clock className="w-6 h-6 text-[#50c2c9]" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl p-6 border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Distance Today</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalDistance}<span className="text-lg text-gray-500">km</span></p>
              </div>
              <div className="w-12 h-12 bg-[#50c2c9] bg-opacity-10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#50c2c9] bg-opacity-5 rounded-bl-full"></div>
                <MapPin className="w-6 h-6 text-[#50c2c9]" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl border border-[#50c2c9] border-opacity-15 p-1 mb-8">
          <div className="flex">
            <button
              onClick={() => setSelectedView('active')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedView === 'active'
                  ? 'bg-[#50c2c9] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Active ({activeVehicles.length})
            </button>
            <button
              onClick={() => setSelectedView('completed')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedView === 'completed'
                  ? 'bg-[#50c2c9] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Completed ({completedRoutes.length})
            </button>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="space-y-4">
          {displayVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-gradient-to-br from-white to-[#50c2c9]/5 rounded-2xl border border-[#50c2c9] border-opacity-15 hover:border-opacity-25 hover:shadow-md transition-all duration-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={vehicle.avatar}
                      alt={vehicle.driverName}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{vehicle.driverName}</h3>
                      <p className="text-sm text-gray-500">{vehicle.vehicleNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{getStatusText(vehicle.status)}</span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Current Location</p>
                    <p className="font-medium text-gray-900">{vehicle.currentLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Destination</p>
                    <p className="font-medium text-gray-900">{vehicle.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Route</p>
                    <p className="font-medium text-gray-900">{vehicle.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Waste Collected</p>
                    <p className="font-medium text-gray-900">{vehicle.wasteCollected}</p>
                  </div>
                </div>

                {/* Progress */}
                {vehicle.status !== 'completed' && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-900">{vehicle.progress}%</span>
                        <span className="text-sm text-gray-500">ETA {vehicle.estimatedArrival}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#50c2c9] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${vehicle.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Distance: {vehicle.distance}</span>
                    <span>Updated {vehicle.lastUpdate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-[#50c2c9] hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 bg-[#50c2c9] text-white text-sm font-medium rounded-lg hover:bg-[#47b1b8] transition-colors">
                      Track Live
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminBottomNavigation />
    </div>
  );
}
