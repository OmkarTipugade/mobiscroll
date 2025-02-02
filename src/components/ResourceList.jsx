import React, { useState } from "react";

const ResourceList = ({ resources, setResources }) => {
  const [newResource, setNewResource] = useState("");

  const handleAddResource = () => {
    if (newResource.trim() !== "") {
      setResources([...resources, newResource]);
      setNewResource("");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-48 h-[26px] border border-gray-300"></div>
      {resources.map((resource, index) => (
        <div
          key={index}
          className="border text-sm font-semibold p-1.5 h-[62px] w-48 border-gray-300"
        >
          {resource}
        </div>
      ))}
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
          className="ml-2 bg-green-500 text-white p-1.5 text-sm rounded hover:bg-green-400"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ResourceList;
