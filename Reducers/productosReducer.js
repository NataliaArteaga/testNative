import { IS_LOADING_PRODUCTS, LOAD_DATA, IS_UPLOAD_PRODUCTS, IS_FINISHED_UPLOAD_PRODUCTS, ADD_PRODUCTS } from '../Actions/types'

const stateHome = {
    isLoadingProducts: true,
    dataProducts: [],
    isLoadingUploadProducts: false,
    isFinishedUploadProducts: false,
}

export default function (state = stateHome, action) {
    switch (action.type) {
        case IS_LOADING_PRODUCTS:
            return { ...state, isLoadingProducts: true }
        case LOAD_DATA:        
            return { ...state, dataProducts: action.payload, isLoadingProducts: false }
        case ADD_PRODUCTS:
            var newProducts = state.dataProducts
            action.payload.map(data =>
                newProducts.push(data)
            )
            return { ...state, dataProducts: newProducts, isLoadingProducts: false }

        case IS_UPLOAD_PRODUCTS:
            return { ...state, isLoadingUploadProducts: true, isFinishedUploadProducts: false }
        case IS_UPLOAD_PRODUCTS:
            return { ...state, isLoadingUploadProducts: true, isFinishedUploadProducts: true }
        default:
            return state
    }
}