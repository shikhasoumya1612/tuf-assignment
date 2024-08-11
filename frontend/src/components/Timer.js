import React from "react";
import FlipCountdown from "@rumess/react-flip-countdown";

const Timer = ({ endTime, setIsVisible }) => {
  if (!endTime) return null;

  const now = new Date();
  const endDate = new Date(endTime);

  const diffTime = endDate - now;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths =
    endDate.getMonth() -
    now.getMonth() +
    12 * (endDate.getFullYear() - now.getFullYear());
  const diffYears = endDate.getFullYear() - now.getFullYear();

  const hideYear = diffYears <= 0;
  const hideMonth = diffMonths <= 0;
  const hideDay = diffDays <= 0;
  const hideHour = diffYears > 0;
  const hideMinute = diffMonths > 0;
  const hideSecond = diffDays > 0;

  return (
    <FlipCountdown
      theme="light"
      size="small"
      hideYear={hideYear}
      hideMonth={hideMonth}
      hideDay={hideDay}
      hideHour={hideHour}
      hideMinute={hideMinute}
      hideSecond={hideSecond}
      dayTitle="Days"
      hourTitle="Hours"
      minuteTitle="Minutes"
      secondTitle="Seconds"
      endAt={endTime}
      endAtZero
      onTimeUp={() => setIsVisible(false)}
    />
  );
};

export default Timer;
