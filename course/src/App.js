import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';

import Person from './Person/Person';

class App extends Component {
  
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

    

    let person = null;

    if (this.state.showPersons) {
      person = (

        <div>
          {
            this.state.persons.map((person, index) => {
              return (
                <Person key={person.id}
                  click={() => this.deletePersonHandler(index)}
                  name={person.name}
                  age={person.age}
                  changed={(event) => this.nameChangedHandler(event, person.id)} />
              )
            })
          }
        </div>

      );
      
      

    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      
        <div className={classes.App}>
          <p className={assignedClasses.join(' ')} >Title of the App</p>
          <button onClick={this.togglePersonsHandler} >Switch</button>
          {person}
        </div>
      
    );
  }
}

export default App;
