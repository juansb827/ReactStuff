import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    componentWillMount () {

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidUpdate () {
        console.log('Checkout update');
        if ( this.props.purchased ) {
            console.log('Checkout update RESETTING');
            this.props.onResetIngredients(null);
        }
        
    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return (
            <div>
                {summary}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onResetIngredients: () => { dispatch(actions.setIngredients(null)) }        
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
