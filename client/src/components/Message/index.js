import React from "react";
import { format } from "date-fns";
import "./Message.css";

export default function Message(props) {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props;

  const friendlyTimestamp = format(data.timestamp, "LLLL");

  return (
    <div
      className={[
        "message",
        `${isMine ? "mine" : ""}`,
        `${startsSequence ? "start" : ""}`,
        `${endsSequence ? "end" : ""}`,
      ].join(" ")}
    >
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {data.message}
        </div>
      </div>
    </div>
  );
}
