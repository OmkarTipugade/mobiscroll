import React from "react";
import { format } from "date-fns";
import dayArr from "./assets/days";
const TableHeadRow = ({
  currentDate,
  currentMonth,
  currentYear,
  index,
  day,
}) => {
  return (
    <>
      <td
        key={index}
        className={`${(index==0)?'border-s-0 border-t border-gray-300':'border border-gray-300'} text-sm w-[72px] h-[26px] text-center`}
      >
        <span
          className={`text-sm flex rounded-full w-[60px] mx-auto items-center justify-center ${
            currentDate.getDate() == day.split(" ")[0] &&
            dayArr[currentDate.getDay()] == day.split(" ")[1] &&
            format(new Date(), "MMMM") == currentMonth &&
            format(new Date(), "yyyy") == currentYear
              ? "bg-blue-500 text-white"
              : ""
          }`}
        >
          {day}
        </span>
      </td>
    </>
  );
};

export default TableHeadRow;
