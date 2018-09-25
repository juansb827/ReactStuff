import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import burger from '../Burger';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.buildControls} >
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {   
            controls.map(ctrl => (
                <BuildControl key={ctrl.label}
                    label={ctrl.label}                    
                    clickMore={ () => {props.ingredientAdded(ctrl.type) } }
                    clickLess={ () => {props.ingredientRemoved(ctrl.type) } } 
                    disabled={props.disabledFields[ctrl.type] }
                    />
            ))
        }
        <button 
            className={classes.OrderButton}
            disabled={props.purchasable} 
            onClick={props.ordered}>ORDER NOW :V</button>
    </div>
);

export default buildControls;