import React, { useState } from "react";
import { format } from "date-fns";
import colors from "./colors.js";

const ScheduleTable = ({ resources, currentDate }) => {
  const [events, setEvents] = useState({});
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const dayStrings = [...Array(daysInMonth)].map((_, i) =>
    `${i + 1} ${format(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1), "EEE")}`
  );

  const currentMonth = format(currentDate, "MMMM");
  const currentYear = format(currentDate, "yyyy");

  const handleDoubleClick = (resourceIndex, dayIndex) => {
    const id = `box-${resourceIndex}-${dayIndex}`;
    const eventName = prompt("Enter event name:");
    if (eventName) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setEvents((prevEvents) => ({
        ...prevEvents,
        [id]: [...(prevEvents[id] || []), { name: eventName, color: randomColor }],
      }));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Delete" && hoveredEvent) {
      const { cellId, eventIndex } = hoveredEvent;
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        updatedEvents[cellId] = updatedEvents[cellId].filter((_, idx) => idx !== eventIndex);
        if (updatedEvents[cellId].length === 0) delete updatedEvents[cellId];
        return updatedEvents;
      });
    }
  };

  return (
    <div className="overflow-x-auto pb-2" tabIndex={0} onKeyDown={handleKeyDown}>
      <table className="border-collapse min-w-max">
        <tbody>
          <tr>
            {dayStrings.map((day, index) => (
              <td
                key={index}
                className="border text-sm border-gray-300 w-[72px] h-[26px] text-center"
              >
                <span
                  className={`text-sm flex rounded-full w-[60px] mx-auto items-center justify-center ${
                    currentDate.getDate() == day.split(" ")[0] &&
                    d[currentDate.getDay()] == day.split(" ")[1] &&
                    format(new Date(), "MMMM") == currentMonth &&
                    format(new Date(), "yyyy") == currentYear
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  {day}
                </span>
              </td>
            ))}
          </tr>
          {resources.map((_, resourceIndex) => (
            <tr key={resourceIndex}>
              {dayStrings.map((_, dayIndex) => {
                const id = `box-${resourceIndex}-${dayIndex}`;
                return (
                  <td
                    id={id}
                    key={dayIndex}
                    className="border w-[72px] h-[62px] border-gray-300 bg-white relative"
                    onDoubleClick={() => handleDoubleClick(resourceIndex, dayIndex)}
                  >
                    {events[id] &&
                      events[id].map((event, idx) => (
                        <div
                          key={idx}
                          className={`m-1 p-1 text-xs rounded ${event.color}`}
                          onMouseEnter={() => setHoveredEvent({ cellId: id, eventIndex: idx })}
                          onMouseLeave={() => setHoveredEvent(null)}
                        >
                          {event.name}
                        </div>
                      ))}
                  </td>
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
