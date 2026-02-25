import React from "react";

function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

export default EmptyState;
