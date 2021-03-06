import React, { Component } from 'react';
import Aux from '../../hoc/_Aux/_Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import { connect } from 'react-redux'



class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false
      

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onInitIngredients();  
    }

    updatePurchaseState(ingredients) {

        const sum =
            Object.keys(ingredients)
                .map(igKey => {
                    return ingredients[igKey]
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0)

        return sum > 0 


    }

    purchaseHandler = () => {
        if(!this.props.isAuthenticated) {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');            
        }   
        this.setState({ purchasing: true });
        
        
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients could not be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        totalPrice={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledFields={disabledInfo}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        
                    />
                </Aux>
            )

            orderSummary = (
                <OrderSummary
                    price={this.props.totalPrice}
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />)
        }




        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));