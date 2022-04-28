import { combineReducers } from 'redux';
import LoginReducer from "./LoginReducer";
import CartReducer from './CartReducer';
import FavReducer from "./FavReducer";

const rootReducer = combineReducers({loginReducer: LoginReducer, cartReducer: CartReducer, favReducer:FavReducer});

export default rootReducer;