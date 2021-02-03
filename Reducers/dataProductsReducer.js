import { IS_LOADING_DATA_HOME, DATA_HOME } from '../Actions/types'

const initialDataState = {
    dataHome: [],
    isLoadingDataHome: true
}

export default function (state = initialDataState, action) { 
    switch (action.type) {
        default:
            return state

    }
}