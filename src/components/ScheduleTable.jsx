import React, { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import TableBoxRow from "./TableBoxRow.jsx";
import TableHeadRow from "./TableHeadRow.jsx";
const ScheduleTable = ({ resources, currentDate }) => {
  const [events, setEvents] = useState({});
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Generate a unique storage key based on current month and year
  const storageKey = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-based index
    return `scheduleEvents-${year}-${month}`;
  }, [currentDate]);

  // Load events from localStorage when component mounts or storageKey changes
  useEffect(() => {
    const savedEvents = localStorage.getItem(storageKey);
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, [storageKey]);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(events));
  }, [events, storageKey]);
  const dayStrings = [...Array(daysInMonth)].map(
    (_, i) =>
      `${i + 1} ${format(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
        "EEE"
      )}`
  );

  const currentMonth = format(currentDate, "MMMM");
  const currentYear = format(currentDate, "yyyy");

  useEffect(() => {
    if (showPopupMessage) {
      const timer = setTimeout(() => {
        setShowPopupMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopupMessage]);

  const handleKeyDown = (event) => {
    if (event.key === "Delete" && hoveredEvent) {
      const { cellId, eventIndex } = hoveredEvent;
      setShowPopupMessage(true);
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        updatedEvents[cellId] = updatedEvents[cellId].filter(
          (_, idx) => idx !== eventIndex
        );
        if (updatedEvents[cellId].length === 0) delete updatedEvents[cellId];
        return updatedEvents;
      });
    }
  };

  return (
    <div
      className="overflow-x-auto pb-2"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {showPopupMessage && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500">
          Event deleted!
        </div>
      )}
      <table className="border-collapse min-w-max border-gray-200">
        <tbody>
          <tr>
            {dayStrings.map((day, index) => (
              <TableHeadRow
                currentDate={currentDate}
                currentMonth={currentMonth}
                currentYear={currentYear}
                day={day}
                index={index}
              />
            ))}
          </tr>
          {resources.map((_, resourceIndex) => (
            <tr key={resourceIndex}>
              {dayStrings.map((_, dayIndex) => {
                const id = `box-${resourceIndex}-${dayIndex}`;
                return (
                  <TableBoxRow
                    resourceIndex={resourceIndex}
                    dayIndex={dayIndex}
                    id={id}
                    events={events}
                    setEvents={setEvents}
                    setHoveredEvent={setHoveredEvent}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
