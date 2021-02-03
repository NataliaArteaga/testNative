import {IS_LOADING_LIST_API,LIST_API,IS_LOADING_ADD_FAVORITE, ADD_FAVORITE} from './types'

export const getListApi = (history) => async dispatch => {
        await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d2f75c50a366b48f468d9a270511e992&sort_by=popularity.desc`, {
            withCredentials: true,
            credentials: 'include',
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',

            }    
        })
            .then(response => response.json())
            .then(respJson => {
                console.log(respJson.results)
                dispatch({
                    type: IS_LOADING_LIST_API
                });
                dispatch({
                    type: LIST_API,
                    payload: respJson.results
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    export const favorites = (item) =>  async dispatch=> {

        dispatch({
            type: IS_LOADING_ADD_FAVORITE
          })

        dispatch({
          type: ADD_FAVORITE,
          payload: item
        })
      } 
  
