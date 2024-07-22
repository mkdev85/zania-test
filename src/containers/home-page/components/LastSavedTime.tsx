import React, { useState, useEffect } from "react";
import { timeAgo } from "@cat/helpers";

interface LastSavedTimeProps {
  time?: number;
}

const LastSavedTime: React.FC<LastSavedTimeProps> = ({ time }) => {
  const [lastSavedtime, setLastSavedTime] = useState<number>(time || 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastSavedTime(Date.now())
    }, 60000)

    return () => clearInterval(intervalId);
  }, [lastSavedtime]);

  return (
    <p className="text-right ml-auto font-medium">Last Saved {timeAgo(time)} ago</p>
  );
};

export default React.memo(LastSavedTime);
