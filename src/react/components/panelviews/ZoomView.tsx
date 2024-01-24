import React from "react";
import TextInputDisplayPanel from "../TextInputDisplayPanel";
import ReaderDisplayPanel from "../ReaderDisplayPanel";
import "../../styles/index.css";

const ZoomView = () => {
  return (
    <div className="zoom-container">
        <ReaderDisplayPanel />
        <TextInputDisplayPanel />
    </div>
  );
};

export default ZoomView;
