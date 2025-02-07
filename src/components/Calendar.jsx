import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  format,
  getDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

const Calendar = ({
  currentDate,
  setShowCalendar,
  selectedDate,
  setSelectedDate,
  handleMonthChange,
}) => {
  // Get the index of the first day of the month (0 = Sunday, 6 = Saturday)
  const firstDay = getDay(startOfMonth(currentDate));

  // Get all days of the current month as an array
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg mt-2 w-64 absolute left-0 top-full z-50">
      {/* Header section with month/year display and navigation buttons */}
      <div className="flex justify-between text-lg items-center mb-2">
        <span className="text-blue-500 text-sm font-medium">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <div className="flex">
          {/* Button to go to the previous month */}
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-blue-500 text-2xl me-2 hover:text-blue-400"
          >
            <IoIosArrowBack />
          </button>
          {/* Button to go to the next month */}
          <button
            onClick={() => handleMonthChange(1)}
            className="text-blue-500 text-2xl ms-2 hover:text-blue-400"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Calendar grid with days of the week */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="text-xs">
            {day}
          </div>
        ))}

        {/* Empty slots before the first day of the month */}
        {Array(firstDay)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="w-8 h-8"></div>
          ))}

        {/* Render each day of the month */}
        {monthDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
              selectedDate === format(day, "yyyy-MM-dd")
                ? "bg-blue-500 text-white" // Highlight selected date
                : "hover:bg-blue-300"
            }`}
            onClick={() => {
              setSelectedDate(format(day, "yyyy-MM-dd"));
              setShowCalendar(false); // Hide calendar after selection
            }}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
