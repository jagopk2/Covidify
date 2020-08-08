const setHomeLocation = (location) => {
  return {
    type: 'SET_HOME_LOCATION',
    payload: location,
  };
};
const setMaskPoints = (points) => {
  return {
    type: 'SET_MASK_POINTS',
    payload: points,
  };
};
const setHandWashPoints = (points) => {
  return {
    type: 'SET_HANDWASH_POINTS',
    payload: points,
  };
};
const setTotalOutsidePoints = (points) => {
  return {
    type: 'SET_TOTALOUTSIDE_POINTS',
    payload: points,
  };
};
const setTotalInsidePoints = (points) => {
  return {
    type: 'SET_TOTALINSIDE_POINTS',
    payload: points,
  };
};
const setActivity = (data) => {
  return {
    type: 'SET_ACTIVITY',
    payload: data,
  };
};

export {
  setHomeLocation,
  setMaskPoints,
  setHandWashPoints,
  setTotalInsidePoints,
  setTotalOutsidePoints,
  setActivity,
};
