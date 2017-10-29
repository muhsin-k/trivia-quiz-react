import React from "react";
function Timer(props) {
  return (
    <h3 className="timerCount">
      <span>{props.timeInSeconds}</span> s
    </h3>
  );
}
export default Timer;
