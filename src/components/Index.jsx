import React, { useState } from "react";
import ResourceList from "./ResourceList";
import ScheduleTable from "./ScheduleTable";
import Header from "./Header";
import { format } from "date-fns";
const res = [
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
];

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [resources, setResources] = useState(res);
  return (
    <>
      <Header />
      <div className="flex">
        <ResourceList resources={resources} setResources={setResources} />
        <ScheduleTable
          resources={resources}
          currentDate={currentDate}
          currentMonth={format(currentDate, "MMMM")}
          currentYear={format(currentDate, "yyyy")}
        />
      </div>
    </>
  );
};

export default Index;
