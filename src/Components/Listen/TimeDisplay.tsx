import React from "react";

interface TimeDisplayProps {
  currTime: { min: string; sec: string };
  totalTime: number;
  seconds: number;
  onSeek: (value: number) => void;
  onSeekStart: () => void;
  onSeekEnd: () => void;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  currTime,
  totalTime,
  seconds,
  onSeek,
  onSeekStart,
  onSeekEnd,
}) => {
  
  return (
    <div>
      <p>
        {currTime.min}:{currTime.sec} /{" "}
        {String(Math.floor(totalTime / 60)).padStart(2, "0")}:
        {String(Math.floor(totalTime % 60)).padStart(2, "0")}
      </p>

      <input
        type="range"
        min="0"
        max={Math.floor(totalTime)}
        value={seconds || 0}
        className="timeline w-1/2"
        onMouseDown={onSeekStart}
        onMouseUp={onSeekEnd}
        onChange={(e) => onSeek(Number(e.target.value))}
      />
    </div>
  );
};

export default TimeDisplay;
