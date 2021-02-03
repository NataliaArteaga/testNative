import { combineReducers } from "redux"
import dataProductsReducer from "./dataProductsReducer"
import listApiReducer from "./listApiReducer"

export default combineReducers({
    dataProducts: dataProductsReducer,
    listApi:listApiReducer
})