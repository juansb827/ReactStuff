import React, { Component } from 'react';
import classes from  './Person.css';


import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/_Aux';

const person = (props) => {
    
    return (
        <Aux  >
            <p onClick={props.click}>Person {props.name} component</p>
            <p>{props.age}</p>
            <input onChange={props.changed} value={props.name} />
        </Aux>
    );
}

export default withClass( person, classes.Person);