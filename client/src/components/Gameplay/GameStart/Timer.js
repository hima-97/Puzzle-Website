import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { convertSecondsToHoursString } from "../Constants/Utility";

export default function Timer(props) {
  const { time, onEndCountDown, forceStop, onStopTime } = props; // Time number in seconds
  // Set mutable variable which is timeInterval to keep track of current time without affecting by rerendering
  const ref = useRef(null);
  const currentTimeRef = useRef(time);

  // The state for the timer (string)
  const [timer, setTimer] = useState(convertSecondsToHoursString(time));
  const [isStopTime, setIsStopTime] = useState(false);

  // Usecallback to store function to not refresh on useEffect when rerendering
  const startTimer = useCallback(() => {
    if (ref.current) clearInterval(ref.current);
    if (isStopTime) return;
    const id = setInterval(() => {
      if (isStopTime) {
        clearInterval(ref.current);
        return;
      }
      if (forceStop) {
        clearInterval(ref.current);
        onStopTime(currentTimeRef.current);
        setIsStopTime(true);
        return;
      }

      currentTimeRef.current--;
      setTimer(convertSecondsToHoursString(currentTimeRef.current));

      if (currentTimeRef.current <= 0) {
        clearInterval(ref.current);
        onEndCountDown();
      }
    }, 1000);
    ref.current = id;
  }, [onEndCountDown, forceStop, onStopTime, isStopTime]);

  // We can use useEffect so that when the component mount the timer will start as soon as possible
  useEffect(() => {
    startTimer();
  }, [startTimer]);

  return (
    <div className="App" style={{ color: "azure" }}>
      <h2>{timer}</h2>
    </div>
  );
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  onEndCountDown: PropTypes.func.isRequired,
  forceStop: PropTypes.bool.isRequired,
};
