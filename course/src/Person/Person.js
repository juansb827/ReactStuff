import React, { Component } from 'react';
import classes from  './Person.css';


const person = (props) => {
    
    return (
        <div className={classes.Person} >
            <p onClick={props.click}>Person {props.name} component</p>
            <p>{props.age}</p>
            <input onChange={props.changed} value={props.name} />
        </div>
    );
}

export default person;