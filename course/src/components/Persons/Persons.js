import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './Persons.css';
import Person from './Person/Person'



class Persons extends Component{

  constructor(props){
    super(props);
    console.log("[Persons.js] constructor", props);
    this.lastPersonRef = React.createRef();
  }

  componentWillMount(){
    console.log("[Persons.js] componentWillMount");
  }

  componentDidMount(){
    console.log("[Persons.js] componentDidMount");
    this.lastPersonRef.current.focus();
  }

  componentWillUnmount(){
    console.log("[Persons.js] componentWillUnmount");
  }

  render(){
    console.log("[Persons.js] render");
    return this.props.persons.map((person, index) => {
      return (            
          <Person key={person.id}
            index={index}
            ref={this.lastPersonRef}
            click={() => this.props.clicked(index)}
            name={person.name}
            age={person.age}
            changed={(event) =>this.props.changed(event, person.id)} />          
      )
    })
  }
} 
       
    



export default Persons;