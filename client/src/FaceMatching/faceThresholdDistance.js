import React, { createContext, useState } from 'react';
// import {maxDescriptorDistance} from "../globalData";
const FaceThresholdDistanceContext = createContext("");
let maxDescriptorDistance = 0.45;
const FaceThresholdDistanceProvider = (props) => {
  const [threshold, SetThreshold] = useState(maxDescriptorDistance);
  function setFaceThresholdDistance(value) {
    SetThreshold(value);
  }
  return (
    <FaceThresholdDistanceContext.Provider value={{ threshold, setFaceThresholdDistance }} {...props} />
  );
};
export { FaceThresholdDistanceContext, FaceThresholdDistanceProvider };