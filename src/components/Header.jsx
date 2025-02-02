import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// Calendar js
import {
  format,
  getDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";

const Header = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newResource, setNewResource] = useState("");
  const [resources, setResources] = useState([
    "Resource A",
    "Resource B",
    "Resource C",
    "Resource D",
    "Resource E",
    "Resource F",
    "Resource G",
    "Resource H",
    "Resource I",
    "Resource J",
    "Resource K",
    "Resource L",
    "Resource M",
    "Resource N",
    "Resource O",
  ]);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  const handleMonthChange = (offset) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + offset);
      return newDate;
    });
  };

  const isToday = isSameMonth(currentDate, new Date());
  let currentMonth = format(currentDate, "MMMM");
  let currentYear = format(currentDate, "yyyy");
  //Calendar js
  // const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const firstDay = getDay(startOfMonth(currentDate));
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  // const handleMonthChange = (offset) => {
  //   setCurrentDate((prev) => {
  //     const newDate = new Date(prev);
  //     newDate.setMonth(prev.getMonth() + offset);
  //     return newDate;
  //   });
  // };

  const handleDateClick = (date) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
  };

  const handleAddResource = () => {
    if (newResource.trim() !== "") {
      setResources((prevResources) => [...prevResources, newResource]);
      setNewResource("");
    }
  };

  //Calscheduler js
  const d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // const [currentDate, setCurrentDate] = useState(new Date());

  // Get number of days in current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Get first day of the month (0 = Sunday)
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Generate array of day strings (e.g. "1 Wed")
  const generateDayStrings = () => {
    const days = [];
    const date = new Date(currentDate);
    date.setDate(1);

    for (let i = 0; i < daysInMonth; i++) {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      days.push(`${date.getDate()} ${dayName}`);
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
  const dayStrings = generateDayStrings();
  return (
    <>
      <div className="flex justify-between px-3 py-2 bg-gray-50 relative border-b-gray-400">
        <div>
          <button
            onClick={toggleCalendar}
            className="text-xl text-blue-500 cursor-pointer flex hover:text-blue-400"
          >
            <span>{currentMonth}</span>
            <span className="ms-2">{currentYear}</span>
          </button>
          {showCalendar && (
            <div className="bg-white p-3 rounded-lg shadow-lg mt-2 w-64 absolute left-0 top-full z-50">
              <div className="flex justify-between text-lg items-center mb-2">
                <span className="text-blue-500 text-sm font-medium hover:text-blue-400">
                  {format(currentDate, "MMMM yyyy")}
                </span>
                <div className="flex justify-evenly">
                  <button
                    onClick={() => handleMonthChange(-1)}
                    className="text-blue-500 cursor-pointer text-2xl me-3 hover:text-blue-400"
                  >
                    <IoIosArrowBack />
                  </button>
                  <button
                    onClick={() => handleMonthChange(1)}
                    className="text-blue-500 cursor-pointer text-2xl ms-3 hover:text-blue-400"
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
                    className={`p-2 w-8 h-8 flex items-center text-sm justify-center rounded-full cursor-pointer transition-all 
                        ${
                          selectedDate === format(day, "yyyy-MM-dd")
                            ? "bg-blue-500 text-white"
                            : "hover:bg-blue-300"
                        }`}
                    onClick={() =>{
                      handleDateClick(day);
                      setShowCalendar(false);
                      setCurrentDate(format(day,'yyyy-MM-dd'));
                    }
                    }
                  >
                    {format(day, "d")}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="text-blue-500 flex justify-evenly z-40 relative">
          <button
            onClick={() => {
              handleMonthChange(1);
              setShowCalendar(false);
            }}
            className="text-2xl cursor-pointer me-3 hover:text-blue-400"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => {
              setCurrentDate(new Date());
              setShowCalendar(false);
            }}
            className={`text-sm font-bold cursor-pointer hover:text-blue-400`}
          >
            Today
          </button>
          <button
            onClick={() => {
              handleMonthChange(1);
              setShowCalendar(false);
            }}
            className="text-2xl cursor-pointer ms-3 hover:text-blue-400"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="flex">
         <div className="flex flex-col">
          <div className="w-48 h-[26px] border-s-0 border-b-0 border-gray-300 border"></div>
          {resources.map((resource, index) => {
            return (
              <div
                key={index}
                className={`border text-sm font-semibold p-1.5 border-s-0 h-[62px] w-48 ${
                  index < resources.length - 1 ? "border-b-0" : ""
                } border-gray-300`}
              >
                {resource}
              </div>
            );
          })}  
        </div>
        <div className="overflow-x-auto pb-2">
          <table className="border-collapse min-w-max">
            <tbody>
              <tr>
                {dayStrings.map((day, index) => (
                  <td
                    key={index}
                    className="border border-gray-300 w-[72px] h-[26px] text-center"
                  >
                    <div
                      className={`text-sm flex rounded-full  mx-auto items-center justify-center ${
                        currentDate.getDate() == day.split(" ")[0] &&
                        d[currentDate.getDay()] == day.split(" ")[1] &&
                        format(new Date(), "MMMM") == currentMonth &&
                        format(new Date(), "yyyy") == currentYear
                          ? "bg-blue-500"
                          : ""
                      }`}
                    >
                      <div>{day.split(" ")[0]}</div>
                      <div className="ms-1">{day.split(" ")[1]}</div>
                    </div>
                  </td>
                ))}
              </tr>
              {resources.map((_, resourceIndex) => (
                <tr key={resourceIndex}>
                  {monthDays.map((_, dayIndex) => (
                    <td key={dayIndex} className="border w-[72px] h-[62px] border-gray-300">
                      <div className="bg-white"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
      <div className="flex items-center mt-2">
            <input
              type="text"
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
              className="border p-1.5 text-sm w-36"
              placeholder="New Resource"
            />
            <button
              onClick={handleAddResource}
              className="ml-2 bg-green-500 text-white p-1.5 cursor-pointer text-sm rounded hover:bg-green-400"
            >
              Add
            </button>
          </div>
    </>
  );
};

export default Header;
