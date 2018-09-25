import React, { Component } from 'react';
import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        purchasing: false
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
        alert('You continue');
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0;        
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    <OrderSummary 
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
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

export default BurgerBuilder;