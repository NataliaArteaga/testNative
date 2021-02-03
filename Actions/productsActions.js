import {
    IS_LOADING_PRODUCTS, LOAD_DATA, IS_UPLOAD_PRODUCTS
} from './types'
import { ExecuteQuery } from '../config/QuerySQL'

export const createTable = () => async dispatch => {
    await ExecuteQuery("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(16), price INTEGER)", []);
}

export const loadData = () => async dispatch => {
    let selectQuery = await ExecuteQuery("SELECT * FROM products", [])
    dispatch({
        type: IS_LOADING_PRODUCTS
    })

    dispatch({
        type: LOAD_DATA,
        payload: selectQuery.rows.raw()
    })
}

export const saveProducts = (products, navigation) => async dispatch => {
    dispatch({
        type: IS_LOADING_PRODUCTS
    })
    let addProductsQuery = "INSERT INTO products (name, price) VALUES";
    for (let i = 0; i < products.length; ++i) {
        addProductsQuery = addProductsQuery + "('" + products[i].name + "','" + products[i].price + "')";
        if (i != products.length - 1) {
            addProductsQuery = addProductsQuery + ",";
        }
    }
    addProductsQuery = addProductsQuery + ";";
    let addPrudctResult = await ExecuteQuery(addProductsQuery, []);
    let lastID = addPrudctResult.insertId

    /* 
        for (let i = 0; i < products.length; ++i) {
            console.log(i)
            products[i].id = lastID - (products.length - i) + 2
        } */

    dispatch(loadData())
    navigation.navigate('Home', { clean: true })

}

export const editProducts = (products, navigation) => async dispatch => {
    dispatch({
        type: IS_UPLOAD_PRODUCTS
    })
    let addProductsQuery = []
    for (let i = 0; i < products.length; ++i) {
        addProductsQuery[i] = await ExecuteQuery('UPDATE products SET name = ? , price = ? WHERE id = ?', [products[i].name, products[i].price, products[i].id]);
    }
    dispatch(loadData())
    navigation.navigate('Home', { clean: true })
}

export const deleteProducts = (products, navigation) => async dispatch => {
    dispatch({
        type: IS_UPLOAD_PRODUCTS
    })
    let addProductsQuery = []
    for (let i = 0; i < products.length; ++i) {
        addProductsQuery[i] = await ExecuteQuery('DELETE FROM products WHERE id = ?', [products[i].id]);
    }
    dispatch(loadData())
}





