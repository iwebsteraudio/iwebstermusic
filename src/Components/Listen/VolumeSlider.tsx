import React from "react";

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  volume,
  onVolumeChange,
}) => {
  return (
    <div>
       <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        style={{ width: "100px" }}
        className="m-8"
      />
    </div>
  );
};

export default VolumeSlider;
