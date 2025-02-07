import React, {useState} from "react";
import colors from "./assets/colors";
const TableBoxRow = ({
  resourceIndex,
  dayIndex,
  id,
  events,
  setEvents,
  setHoveredEvent
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const resizable = document.getElementById("resizable");
  const leftHandle = document.querySelector(".left-handle");
  const rightHandle = document.querySelector(".right-handle");
  let startX, initialWidth, initialLeft;

  const startResize = (e, handle) => {
    e.preventDefault();
    setIsResizing(true);
    startX = e.clientX;
    initialWidth = resizable.offsetWidth;
    initialLeft = resizable.getBoundingClientRect().left;
    console.log("initialWidth=" + initialWidth + " initialLeft=" + initialLeft);
    if (handle === leftHandle) {
      document.addEventListener("mousemove", resizeLeft);
    } else if (handle === rightHandle) {
      document.addEventListener("mousemove", resizeRight);
    }
    document.addEventListener("mouseup", stopResize);
  };

  const resizeLeft = (e) => {
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
  };

  const resizeRight = (e) => {
    if (!isResizing) return;
    const deltaX = e.clientX - startX;
    const newWidth = initialWidth + deltaX;
    const containerRect = resizable.parentElement.getBoundingClientRect();
    const currentLeft = resizable.getBoundingClientRect().left;

    if (newWidth > 50 && currentLeft + newWidth < containerRect.right) {
      resizable.style.width = `${newWidth}px`;
    }
  };

  const stopResize = () => {
    // setIsResizing(false);
    document.removeEventListener("mousemove", resizeLeft);
    document.removeEventListener("mousemove", resizeRight);
    document.removeEventListener("mouseup", stopResize);
  };

  const getTextBgColor = (bgColor) => {
    const intensity = parseInt(bgColor.split("-")[2], 10);
    return intensity > 400 ? "text-white" : "text-black";
  };

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
    <>
      <td
        id={id}
        key={dayIndex}
        className={`${(dayIndex===0)?'border-s-0 border border-gray-300': 'border border-gray-300'} w-[72px] h-[62px] bg-white relative`}
        onDoubleClick={() => handleDoubleClick(resourceIndex, dayIndex)}
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
              <button
                onMouseDown={(event) => {
                  console.log("leftHandle clicked");
                  startResize(event, leftHandle);
                }}
                className="handle left-handle cursor-ew-resize h-full absolute w-1 left-0 top-0 opacity-[.3] bg-black select-none transition-opacity-[0.2s] hover:opacity-100"
              ></button>
              <div className="content flex-grow px-2 relative z-10">
                {event.name}
              </div>
              <button
                onMouseDown={(event) => {
                  console.log("rightHandle clicked");
                  startResize(event, rightHandle);
                }}
                className="handle right-handle cursor-ew-resize h-full absolute w-1 right-0 top-0 opacity-[.3] bg-black select-none transition-opacity-[0.2s] hover:opacity-100"
              ></button>
            </button>
          ))}
      </td>
    </>
  );
};

export default TableBoxRow;
