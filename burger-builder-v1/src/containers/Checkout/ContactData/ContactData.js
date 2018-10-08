import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';
import axios from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    componentWillMount() {
        console.log("Contact Props", this.props);
    }

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Pepe the frog',
                address: {
                    street: 'Test Street',
                    zipCode: '2432',
                    country: 'Croacia'
                },
                email: 'asda@mail.com',
                deliveryMethod: 'fastest'

            }
        }

        this.setState({ loading: true });
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.replace('/');
                console.log("Saved:", res);
            })
            .catch(err => {
                console.log("Error", err);
                this.setState({ loading: false });
            })
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Enter Name" />
                <input type="text" name="email" placeholder="Enter Email" />
                <input type="text" name="street" placeholder="Enter Street" />
                <input type="text" name="postal" placeholder="Enter Postal Code" />
                <Button buttonType="Success" clicked={this.orderHandler} >ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Data:</h4>
                {form}

            </div>
        );
    }
}

export default ContactData;