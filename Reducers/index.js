import { combineReducers } from "redux"
import productsReducer from "./productosReducer"
import listApiReducer from "./listApiReducer"

export default combineReducers({
    products: productsReducer,
    listApi:listApiReducer
})