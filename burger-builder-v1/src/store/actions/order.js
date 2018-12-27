import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData 
    }
};

export const purchaseBurgerFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START    
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart()); 
        axios.post('/orders.json?auth=' + token, orderData)             
            .then(res => {
                console.log("purchaseBurger", res);
                dispatch(purchaseBurgerSuccess( res.data.name, orderData ))
            })
            .catch(err => {               
                dispatch(purchaseBurgerFail( err ));
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart  = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        
        const queryParams2 = "auth=" + token ;
        //+ `&orderBy="${userId}"&equalTo="${userId}`
        
        
        axios.get('/orders.json?' + queryParams2) 
            .then(res => {                
                const orders = [];
                for(let key in res.data){
                    orders.push({
                        ...res.data[key],
                        id: key    
                    })
                }
                dispatch(fetchOrdersSuccess(orders));                
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}