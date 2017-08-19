import { combineReducers } from 'redux';
import main from './reducersMain';
import details from './reducersDetailed';

export default combineReducers({
  main,
  details,
});
