import React, { useState } from 'react'
import { formatDate, getDaysInMonth } from '../utils/customFunction';

const CustomCalendar = ({ onDateClick, highlightedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const hasData = (date) => {
    if (!date) return false;
    return highlightedDates.includes(formatDate(date));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            ←
          </button>
          <div className='justify-center items-center flex font-bold'>{currentDate.toLocaleString('default', { month: 'long'})}</div>
          <button
            onClick={() => navigateMonth(1)}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 rounded-lg bg-violet-900 border border-slate-400  text-center font-medium text-white text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div
            key={index}
            className={`
              p-3 text-center cursor-pointer transition-all duration-200 rounded-lg border border-slate-100
              ${!date ? 'invisible' : ''}
              ${isToday(date) ? 'bg-yellow-100 border-2 border-yellow-400' : ''}
              ${hasData(date) ? 'bg-blue-100 hover:bg-blue-200 border-2 border-blue-300' : 'hover:bg-gray-100'}
              ${!date ? '' : 'hover:shadow-md'}
            `}
            onClick={() => date && onDateClick(date)}
          >
            {date && (
              <div className="relative">
                <span className={`text-sm ${hasData(date) ? 'font-semibold text-blue-800' : 'text-gray-700'}`}>
                  {date.getDate()}
                </span>
                {hasData(date) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar