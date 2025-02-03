import React, { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import colors from "./assets/colors.js";

const ScheduleTable = ({ resources, currentDate }) => {
  const [events, setEvents] = useState({});
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [isResizing, setIsResizing] = useState(false);


  const resizable = document.getElementById("resizable");
  const leftHandle = document.querySelector(".left-handle");
  const rightHandle = document.querySelector(".right-handle");
  let startX, initialWidth, initialLeft;

  const startResize = (e, handle) =>{
    e.preventDefault();
    setIsResizing(true);
    startX = e.clientX;
    initialWidth = resizable.offsetWidth;
    initialLeft = resizable.getBoundingClientRect().left;
    console.log("initialWidth=" + initialWidth + " initialLeft=" + initialLeft)
    if (handle === leftHandle) {
      document.addEventListener("mousemove", resizeLeft);
    } else if (handle === rightHandle) {
      document.addEventListener("mousemove", resizeRight);
    }
    document.addEventListener("mouseup", stopResize);
  }

  const resizeLeft =(e)=> {
    if (!isResizing) return;
    const deltaX = e.clientX - startX;
    const newWidth = initialWidth - deltaX;
    const newLeft = initialLeft + deltaX;
    const containerRect = resizable.parentElement.getBoundingClientRect();

    if (
      newWidth > 50 &&
      newLeft > containerRect.left &&
      newLeft + newWidth < containerRect.right
    ) {
      resizable.style.width = `${newWidth}px`;
      resizable.style.left = `${newLeft - containerRect.left}px`;
    }
  }

  const resizeRight=(e)=> {
    if (!isResizing) return;
    const deltaX = e.clientX - startX;
    const newWidth = initialWidth + deltaX;
    const containerRect = resizable.parentElement.getBoundingClientRect();
    const currentLeft = resizable.getBoundingClientRect().left;

    if (newWidth > 50 && currentLeft + newWidth < containerRect.right) {
      resizable.style.width = `${newWidth}px`;
    }
  }

  const stopResize =()=> {
    // setIsResizing(false);
    document.removeEventListener("mousemove", resizeLeft);
    document.removeEventListener("mousemove", resizeRight);
    document.removeEventListener("mouseup", stopResize);
  }



  const d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  const handleDoubleClick = (resourceIndex, dayIndex) => {
    const id = `box-${resourceIndex}-${dayIndex}`;
    const eventName = prompt("Enter event name:");
    if (eventName) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setEvents((prevEvents) => ({
        ...prevEvents,
        [id]: [
          ...(prevEvents[id] || []),
          { name: eventName, color: randomColor },
        ],
      }));
    }
  };

  const getTextBgColor = (bgColor) => {
    const intensity = parseInt(bgColor.split("-")[2], 10);
    return intensity > 400 ? "text-white" : "text-black";
  };

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
  const handleDrop = (e, targetResourceIndex, targetDayIndex) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;

    try {
      const { sourceResourceIndex, sourceDayIndex, eventIndex } =
        JSON.parse(data);

      if (
        sourceResourceIndex === targetResourceIndex &&
        sourceDayIndex === targetDayIndex
      )
        return;

      setEvents((prevEvents) => {
        const sourceId = `box-${sourceResourceIndex}-${sourceDayIndex}`;
        const targetId = `box-${targetResourceIndex}-${targetDayIndex}`;
        const updatedEvents = { ...prevEvents };

        // Check if source event exists
        if (!updatedEvents[sourceId] || !updatedEvents[sourceId][eventIndex])
          return prevEvents;

        // Create new array copies to maintain immutability
        const sourceEvents = [...updatedEvents[sourceId]];
        const [movedEvent] = sourceEvents.splice(eventIndex, 1);

        // Update source events
        if (sourceEvents.length === 0) {
          delete updatedEvents[sourceId];
        } else {
          updatedEvents[sourceId] = sourceEvents;
        }

        // Update target events
        const targetEvents = updatedEvents[targetId]
          ? [...updatedEvents[targetId]]
          : [];
        targetEvents.push(movedEvent);
        updatedEvents[targetId] = targetEvents;

        return updatedEvents;
      });
    } catch (error) {
      console.error("Error handling drop:", error);
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
                    onDoubleClick={() =>
                      handleDoubleClick(resourceIndex, dayIndex)
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, resourceIndex, dayIndex)}
                  >
                    {events[id] &&
                      events[id].map((event, idx) => (
                        <button
                          key={idx}
                          id="resizable"
                          className={`resizable m-1 p-1 rounded-sm text-xs ${
                            event.color
                          } cursor-pointer flex justify-between relative group ${getTextBgColor(
                            event.color
                          )}`}
                          onMouseEnter={() =>
                            setHoveredEvent({ cellId: id, eventIndex: idx })
                          }
                          onMouseLeave={() => setHoveredEvent(null)}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "text/plain",
                              JSON.stringify({
                                sourceResourceIndex: resourceIndex,
                                sourceDayIndex: dayIndex,
                                eventIndex: idx,
                              })
                            );
                            e.dataTransfer.effectAllowed = "move";
                          }}
                        >
                          <button onMouseDown={(event)=>{
                            console.log('leftHandle clicked');
                            startResize(event, leftHandle);
                          }} className="handle left-handle cursor-ew-resize h-full absolute w-1 left-0 top-0 opacity-[.3] bg-black select-none transition-opacity-[0.2s] hover:opacity-100"></button>
                          <div className="content flex-grow px-2 relative z-10">
                            {event.name}
                          </div>
                          <button onMouseDown={(event)=>{
                            console.log('rightHandle clicked');
                            startResize(event,rightHandle);
                          }} className="handle right-handle cursor-ew-resize h-full absolute w-1 right-0 top-0 opacity-[.3] bg-black select-none transition-opacity-[0.2s] hover:opacity-100"></button>
                        </button>
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
