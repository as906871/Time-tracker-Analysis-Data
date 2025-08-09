import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, AlertCircle } from 'lucide-react';
import { ViewformatDate } from '../constants/customFunction';

const CustomModal = ({ isOpen, onClose, selectedDate, selectedDateData }) => {

  const chartData = useMemo(() => {
    if (!selectedDateData) return [];
    
    return selectedDateData.map(userObj => {
      const [userName, value] = Object.entries(userObj)[0];
      return {
        name: userName.replace('_', ' ').toUpperCase(),
        value: value,
        fill: `hsl(${Math.random() * 360}, 70%, 50%)`
      };
    });
  }, [selectedDateData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-hidden md:max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedDate ? ViewformatDate(selectedDate) : 'Date Analytics'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {selectedDateData ? (
            <div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">User Activity Overview</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedDateData.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Total Activity</p>
                    <p className="text-2xl font-bold text-green-900">
                      {selectedDateData.reduce((sum, user) => sum + Object.values(user)[0], 0)}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Average</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {Math.round(selectedDateData.reduce((sum, user) => sum + Object.values(user)[0], 0) / selectedDateData.length)}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-600 font-medium">Peak User</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {Math.max(...selectedDateData.map(user => Object.values(user)[0]))}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">User Activity Chart</h4>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <div style={{ width: '100%', height: '250px' }}>
                    <ResponsiveContainer>
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: '#374151' }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis tick={{ fill: '#374151' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#374151'
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          radius={[4, 4, 0, 0]}
                          fill="#3b82f6"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">No Data Found</h4>
              <p className="text-gray-600">
                No data found for the selected date: {selectedDate ? ViewformatDate(selectedDate) : ''}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try selecting a highlighted date on the calendar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal