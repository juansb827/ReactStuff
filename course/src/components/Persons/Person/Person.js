import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from  './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/_Aux';
import {AuthContext} from '../../../containers/App'
const person = class extends Component {

    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }
    
    componentDidMount(){
        /*
        if(this.props.index === 0){
            this.textInput.current.focus();
        } */
        
    }

    focus(){
        this.textInput.current.focus();
    }

    render() {
        return (
        <Aux>
             <AuthContext.Consumer>
                {auth => auth? <p>Authenticad</p>:null}
            </AuthContext.Consumer>
           
                <p onClick={this.props.click}>Person {this.props.name} component</p>
            
            <p>{this.props.age}</p>
            <input onChange={this.props.changed} value={this.props.name} 
                ref={this.textInput} /> 
        </Aux>
        )
    };
}   

person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass( person, classes.Person);