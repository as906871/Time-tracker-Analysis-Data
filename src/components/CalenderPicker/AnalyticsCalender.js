import React, { useState, useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { dummyData } from "../../utils/dummyData";
import CustomCalendar from "../../constants/customCalender";
import CustomModal from "../../constants/customModal";
import { formatDate } from "../../constants/customFunction";

const UserAnalyticsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState(null);

  const highlightedDates = useMemo(() => {
    return Object.keys(dummyData);
  }, []);

  const handleDateClick = (selectedDate) => {
    const dateKey = formatDate(selectedDate);
    const dateData = dummyData[dateKey];

    setSelectedDate(selectedDate);
    setSelectedDateData(dateData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
    setSelectedDateData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarDays className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              User Analytics Dashboard
            </h1>
          </div>
        </div>

        <CustomCalendar
          onDateClick={handleDateClick}
          highlightedDates={highlightedDates}
        />

        <CustomModal
          isOpen={showModal}
          onClose={closeModal}
          selectedDate={selectedDate}
          selectedDateData={selectedDateData}
        />
      </div>
    </div>
  );
};

export default UserAnalyticsCalendar;