import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/_Aux';

class App extends Component {

  constructor(props){
    super(props);
    console.log("[App.js] constructor", props);
  }

  componentWillMount(){
    console.log("[App.js] componentWillMount");
  }

  componentDidMount(){
    console.log("[App.js] componentDidMount");
  }

  state = {
    persons: [
      { id: 1, name: 'Pedro', age: 23 },
      { id: 2, name: 'Pepe', age: 28 },
      { id: 3, name: 'Juan', age: 18 }
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Juan', age: 18 }
      ]
    })
  }


  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({
      persons: persons
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });

  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  render() {

    console.log("[App.js] render");

    let persons = null;
    

    if (this.state.showPersons) {
      persons = (

        <div >
          <Persons  persons={this.state.persons} 
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}  />
        </div>

      );

     



    }

    

    return (

      <Aux>
        <Cockpit appTitle={this.props.title}
          persons={this.state.persons} 
          showPersons={this.state.showPersons} 
          clicked={this.togglePersonsHandler} />
        {persons}
      </Aux>

    );
  }
}

export default withClass(App, classes.App);
