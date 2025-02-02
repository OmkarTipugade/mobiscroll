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
  const firstDay = getDay(startOfMonth(currentDate));
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg mt-2 w-64 absolute left-0 top-full z-50">
      <div className="flex justify-between text-lg items-center mb-2">
        <span className="text-blue-500 text-sm font-medium">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <div className="flex">
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-blue-500 text-2xl hover:text-blue-400"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => handleMonthChange(1)}
            className="text-blue-500 text-2xl hover:text-blue-400"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="text-xs">
            {day}
          </div>
        ))}
        {Array(firstDay)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="w-8 h-8"></div>
          ))}
        {monthDays.map((day, index) => (
          <div
            key={index}
            className={`p-2 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
              selectedDate === format(day, "yyyy-MM-dd")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-300"
            }`}
            onClick={() => {
              setSelectedDate(format(day, "yyyy-MM-dd"));
              setShowCalendar(false);
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
