import React, { Component } from 'react';
import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Aux>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <div>
                    <BuildControls/>                        
                </div>    
            </Aux>
        ); 
    }
}

export default BurgerBuilder;