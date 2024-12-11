import React, { useState, useEffect } from "react";

const allowedKeys: Record<number, string> = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  65: "a",
  66: "b",
};

const konamiCode = [
  "up",
  "up",
  "down",
  "down",
  "left",
  "right",
  "left",
  "right",
  "b",
  "a",
];

const EventListenerSpiking: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  let konamiCodePosition = 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = allowedKeys[e.keyCode];
      const requiredKey = konamiCode[konamiCodePosition];

      if (key === requiredKey) {
        konamiCodePosition++;

        if (konamiCodePosition === konamiCode.length) {
          setIsEditMode(true);
          konamiCodePosition = 0;
        }
      } else {
        konamiCodePosition = 0;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <p className="text-white">
      {isEditMode ? "Edit Mode Enabled!" : "HELLO IAN"}
    </p>
  );
};

export default EventListenerSpiking;
