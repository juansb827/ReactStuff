import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                const data = res. data;
                const orders = [];

                for(let key in res.data){
                    orders.push({
                        ...res.data[key],
                        id: key    
                    })
                }
                console.log(res);
                this.setState({ loading: false, orders: orders });
            })
            .catch(err => {
                this.setState({ loading: false })
            });
    }

    
    render() { 
        return (
            <div>
                {
                    this.state.orders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price} />    
                ))
                }
            </div>
          );
    }
}
 
export default withErrorHandler(Orders, axios);