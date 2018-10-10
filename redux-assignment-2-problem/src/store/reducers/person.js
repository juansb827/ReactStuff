import * as actionsTypes from '../actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_PERSON:
            const newPerson = {
                id: Math.random(),
                name: action.name,
                age: action.age
            }
            return {
                persons: state.persons.concat(newPerson)
            }
        case actionsTypes.DELETE_PERSON:            
            return {
                persons: state.persons.filter(person => person.id !== action.personId)
            }

    }

    return state;
};

export default reducer;