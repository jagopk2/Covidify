const initialState = {
  location: null,
  maskPoints: 0,
  handWashPoints: 0,
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
    default:
      return state;
  }
};
export default locationReducer;
