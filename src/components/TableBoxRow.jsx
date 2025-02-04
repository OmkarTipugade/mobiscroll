import React from "react";

const TableBoxRow = ({
  resourceIndex,
  dayIndex,
  id,
  events,
  setHoveredEvent,
  startResize,
  handleDoubleClick,
  handleDrop,
  getTextBgColor,
  rightHandle,
  leftHandle,
}) => {
  return (
    <>
      <td
        id={id}
        key={dayIndex}
        className="border w-[72px] h-[62px] border-gray-300 bg-white relative"
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
