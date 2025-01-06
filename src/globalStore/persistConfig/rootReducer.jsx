import { combineReducers } from 'redux';
import IdSlices from '../slices/IdSlices';

const rootReducer = combineReducers({
    id: IdSlices,
});

export default rootReducer;
