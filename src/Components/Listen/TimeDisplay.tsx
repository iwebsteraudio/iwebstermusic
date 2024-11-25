import React from "react";

interface TimeDisplayProps {
  currTime: { min: string; sec: string };
  totalTime: { min: string; sec: string };
  seconds: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  currTime,
  totalTime,
  seconds,
  onSeek,
}) => {
  return (
    <div>
      <p>
        {currTime.min}:{currTime.sec} / {totalTime.min}:{totalTime.sec}
      </p>

      <input
        type="range"
        min="0"
        max={seconds || 0}
        value={seconds || 0}
        className="timeline"
        onChange={onSeek}
      />
    </div>
  );
};

export default TimeDisplay;