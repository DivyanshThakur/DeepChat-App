import React from "react";
import "./Toolbar.css";

export default function Toolbar(props) {
  const { title, leftItems, rightItems, titleAlign = "left" } = props;
  return (
    <div className="toolbar">
      <div className="left-items">{leftItems}</div>
      <h1 className="toolbar-title" style={{ textAlign: titleAlign }}>
        {title}
      </h1>
      <div className="right-items">{rightItems}</div>
    </div>
  );
}
