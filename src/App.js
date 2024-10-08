import React from 'react';
import './style.css';

import React, { useState } from 'react';
import Draggable from 'react-draggable';

const DAY_WIDTH = 100; // Width in pixels for each day

const calculateDaysBetween = (start, end) => {
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const PlanBar = ({ color, startDate, endDate, onResize }) => {
  const [width, setWidth] = useState(
    () => calculateDaysBetween(startDate, endDate) * DAY_WIDTH
  );

  const handleDrag = (e, ui) => {
    const newWidth = Math.max(DAY_WIDTH, width + ui.deltaX);
    setWidth(newWidth);
    const newEndDate = new Date(
      startDate.getTime() + (newWidth / DAY_WIDTH) * 24 * 60 * 60 * 1000
    );
    onResize(newEndDate);
  };

  return (
    <div className="relative h-10 mb-2" style={{ width: `${width}px` }}>
      <div className={`w-full h-full rounded-lg ${color}`} />
      <Draggable
        axis="x"
        position={{ x: 0, y: 0 }}
        onDrag={handleDrag}
        bounds={{ left: 0 }}
      >
        <div className="absolute top-0 right-0 w-4 h-full bg-red-500 cursor-ew-resize rounded-r-lg" />
      </Draggable>
    </div>
  );
};

const ResizablePlanBars = () => {
  const [googleDates, setGoogleDates] = useState({
    start: new Date('2024-01-01'),
    end: new Date('2024-01-06'),
  });
  const [metaDates, setMetaDates] = useState({
    start: new Date('2024-01-01'),
    end: new Date('2024-01-06'),
  });

  const days = ['D01', 'D02', 'D03', 'D04', 'D05', 'D06'];

  const handleResize = (company, newEndDate) => {
    if (company === 'google') {
      setGoogleDates((prev) => ({ ...prev, end: newEndDate }));
    } else if (company === 'meta') {
      setMetaDates((prev) => ({ ...prev, end: newEndDate }));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Plan</h2>
      <div className="grid grid-cols-6 gap-4 mb-4">
        {days.map((day) => (
          <div key={day} className="text-center text-sm">
            {day}
          </div>
        ))}
      </div>
      <PlanBar
        color="bg-yellow-200"
        startDate={googleDates.start}
        endDate={googleDates.end}
        onResize={(newEnd) => handleResize('google', newEnd)}
      />
      <PlanBar
        color="bg-purple-200"
        startDate={metaDates.start}
        endDate={metaDates.end}
        onResize={(newEnd) => handleResize('meta', newEnd)}
      />
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <ResizablePlanBars />
    </div>
  );
}
