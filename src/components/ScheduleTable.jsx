import React from "react";
import { format } from "date-fns";

const ScheduleTable = ({
  resources,
  currentDate,
  currentMonth,
  currentYear,
}) => {
  const d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const dayStrings = [...Array(daysInMonth)].map(
    (_, i) =>
      `${i + 1} ${format(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
        "EEE"
      )}`
  );

  return (
    <div className="overflow-x-auto pb-2">
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
                    // Highlight the Today's date
                    currentDate.getDate() == day.split(" ")[0] &&
                    d[currentDate.getDay()] == day.split(" ")[1] &&
                    format(new Date(), "MMMM") == currentMonth &&
                    format(new Date(), "yyyy") == currentYear
                      ? "bg-blue-500"
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
              {dayStrings.map((_, dayIndex) => (
                <td
                  key={dayIndex}
                  className="border w-[72px] h-[62px] border-gray-300 bg-white"
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
