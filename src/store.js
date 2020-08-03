import {createStore} from 'redux';
import locationReducer from './reducers';
const store = createStore(locationReducer);
export default store;
