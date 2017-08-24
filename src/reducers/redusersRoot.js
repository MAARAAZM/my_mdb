import { combineReducers } from 'redux';
import main from '../components/containers/Main/reducersMain';
import details from '../components/containers/Details/reducersDetailed';

export default combineReducers({
  main,
  details,
});
