import React, { Component } from 'react';
import Aux from '../../hoc/_Aux/_Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .7,
    cheese: .3,
    meat: 1.2
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false

    }

    constructor(props){
        super(props);
    }   

    updatePurchaseState(){
        this.setState(prevState => {
            const sum = 
                Object.keys(prevState.ingredients)
                    .map(igKey => {
                        return prevState.ingredients[igKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    },0)
                
            return {purchasable: sum > 0 }        

        })
    }  

    addIngredientHandler = (type) => {

        this.setState(prevState => {
            const ingredients = {...prevState.ingredients};
            const priceAddition = INGREDIENT_PRICES[type];
            ingredients[type]++;
            return {
                ingredients: ingredients,
                totalPrice: prevState.totalPrice + priceAddition
            }    
        });

        this.updatePurchaseState();
        
         
       
    }

    removeIngredientHandler = (type) => {

        this.setState(prevState => {            
            const ingredients = {...prevState.ingredients};
            if(ingredients[type]==0){
                return;
            }
            const priceDeduction= INGREDIENT_PRICES[type];
            ingredients[type]-- ;
            return {
                ingredients: ingredients,
                totalPrice: prevState.totalPrice - priceDeduction
            }    
        });

        this.updatePurchaseState();

    }

    purchaseHandler = () =>{
        console.log('ASDD');
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
        
        this.setState({loading: true});
        axios.post('/orders.json', order)
            .then(res=>{
                this.setState({loading: false});
                console.log("Saved:",res);
            })            
            .catch(err =>{
                console.log("Error", err);
                this.setState({loading: false});
            })
            
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0;        
        }

        let orderSummary = (
            <OrderSummary 
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
        );
        if(this.state.loading){
            orderSummary = (<Spinner />)
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal> 
                <div><Burger ingredients={this.state.ingredients} /></div>
                <div>
                    <BuildControls 
                        totalPrice={this.state.totalPrice}
                        purchasable={!this.state.purchasable}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledFields={disabledInfo}
                        ordered={this.purchaseHandler}
                        />                        
                </div>    
            </Aux>
        ); 
    }
}

export default withErrorHandler(BurgerBuilder);