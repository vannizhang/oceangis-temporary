import { combineReducers } from 'redux';
import UI from './UI';
import Map from './Map';
import MyFavItems from './myFavItems';
import SearchResults from './GroupContentSearchResults';

export default combineReducers({ UI, Map, SearchResults, MyFavItems });
