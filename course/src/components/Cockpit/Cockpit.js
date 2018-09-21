import React from 'react'
import classes from './Cockpit.css';
import Aux from '../../hoc/_Aux'
const cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = '';

    if(props.showPersons){
        btnClass = [classes.Button,classes.Red].join(' ');
    }else{
        btnClass = classes.Button;
    }
    
    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }
    return (
        <React.Fragment>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')} >Title of the App</p>
            <button className={btnClass} onClick={props.clicked} >Switch</button>
        </React.Fragment>
    )
}

export default cockpit;