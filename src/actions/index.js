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

export {setHomeLocation, setMaskPoints, setHandWashPoints};
