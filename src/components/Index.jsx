import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { format } from "date-fns";
import Calendar from "./Calendar";
import ResourceList from "./ResourceList";
import ScheduleTable from "./ScheduleTable";
import resouces from "./assets/resource";

const Index = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [resources, setResources] = useState(resouces);

  // Function to update the currentDate state when navigating months
  const handleMonthChange = (offset) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + offset);
      return newDate;
    });
  };

  return (
    <>
      <div className="flex justify-between px-3 py-2 bg-gray-50 relative border-b-gray-400">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="text-xl text-blue-500 cursor-pointer flex hover:text-blue-400"
        >
          {/* Ensures correct month/year display */}
          <span>{format(currentDate, "MMMM")}</span>
          <span className="ml-2">{format(currentDate, "yyyy")}</span>
        </button>
        {showCalendar && (
          <Calendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setShowCalendar={setShowCalendar}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleMonthChange={handleMonthChange}
          />
        )}
        <div className="text-blue-500 flex relative">
          {/* Navigation buttons for previous/next month and resetting to today */}
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-2xl cursor-pointer mr-3 hover:text-blue-400"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="text-sm font-bold cursor-pointer hover:text-blue-400"
          >
            Today
          </button>
          <button
            onClick={() => handleMonthChange(1)}
            className="text-2xl cursor-pointer ml-3 hover:text-blue-400"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="flex">
        <ResourceList resources={resources} setResources={setResources} />
        <ScheduleTable resources={resources} currentDate={currentDate} />
      </div>
    </>
  );
};

export default Index;
