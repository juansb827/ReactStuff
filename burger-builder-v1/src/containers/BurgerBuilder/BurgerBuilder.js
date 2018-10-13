import React, { Component } from 'react';
import Aux from '../../hoc/_Aux/_Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux'


class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("BOOUT TO FETCH BURGER");
        /*
        axios.get('/ingredients.json')
            .then(response => {                              
                this.setState({ ingredients: response.data });
            })
            .catch(error =>{
                console.log("Error", error  );
                this.setState({ error: true });
            }) */
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
        console.log('ASDD');
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
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
        let burger = this.state.error ? <p>Ingredients could not be loaded</p> : <Spinner />;

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

        if (this.state.loading) {
            orderSummary = (<Spinner />)
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
        ings: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
        onIngredientRemoved: (igName) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: igName })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));