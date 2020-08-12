const initialState = {
  location: null,
  maskPoints: 0,
  handWashPoints: 0,
  totalOutsidePoints: 0,
  totalInsidePoints: 0,
  activityData: [],
};
const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HOME_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    case 'SET_MASK_POINTS':
      return {
        ...state,
        maskPoints: action.payload,
      };
    case 'SET_HANDWASH_POINTS':
      return {
        ...state,
        handWashPoints: action.payload,
      };
    case 'SET_TOTALOUTSIDE_POINTS':
      return {
        ...state,
        totalOutsidePoints: action.payload,
      };
    case 'SET_TOTALINSIDE_POINTS':
      return {
        ...state,
        totalInsidePoints: action.payload,
      };
    case 'SET_ACTIVITY':
      return {
        ...state,
        activityData: action.payload,
      };
    default:
      return state;
  }
};
export default locationReducer;
