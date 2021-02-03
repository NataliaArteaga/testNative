import { IS_LOADING_LIST_API, LIST_API } from '../Actions/types'

const initialDataState = {
    listApi: [],
    isLoadingListApi: false
}

export default function (state = initialDataState, action) { 
    
    switch (action.type) {

        case IS_LOADING_LIST_API:
            return { ...state, isLoadingListApi: true }
        case LIST_API:
            return { ...state, isLoadingListApi: false, listApi:action.payload}
        default:
            return state

    }
}