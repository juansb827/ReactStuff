import React, { Component } from 'react';
import { connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'    
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'    
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP'    
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'    
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'    
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue : 'Fastest'},
                       {value: 'cheapest', displayValue : 'Cheapest'}
                    ]  
                },
                value: 'fastest',
            },
        },       
        formIsValid: false        
    }

    checkValidity(value, rules){
        if(!rules){
            return true;
        }

        if (rules.required && value.trim() === ''){
            return false;
        }

        if (rules.minLength && !(value.length >= rules.minLength)){
            return false;
        }

        if (rules.maxLength && !(value.length <= rules.maxLength)){
            return false;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if(!pattern.test(value)){
                return false;
            } 
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            if(!pattern.test(value)){
                return false;
            }
        }
        return true;

    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = {...this.state.orderForm};
        const updatedElement = {...updatedForm[inputId]};
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[inputId] = updatedElement;
        
        let formIsValid = true;
        for(let key in updatedForm){
            const formElement = updatedForm[key];
            if(formElement.validation && !formElement.valid){
                formIsValid = false;
                break;
            }
        }
        this.setState({ orderForm: updatedForm, formIsValid: formIsValid })        
    }

    componentWillMount() {
        console.log("Contact Props", this.props);
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}; 

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData
        }

        this.props.onOrderBurger(order, this.props.token);

            
    }

    render() {
        const orderForm = this.state.orderForm;
        const formElementsArray = Object.keys(orderForm)
            .map(key => {
                const config = orderForm[key];
                return <Input key={key} 
                    elementType={config.elementType} 
                    elementConfig={config.elementConfig} 
                    value={config.value}
                    invalid={ !config.valid}
                    shouldValidate={ config.touched && config.validation }
                    
                    changed={(event) => { this.inputChangedHandler(event, key) } } />
            })
        

        let form = (
            <form onSubmit={this.orderHandler} >                
                {formElementsArray}
                <Button buttonType="Success" clicked={this.orderHandler} disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Data:</h4>
                {form}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token              
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token ))
    }    
}

export default connect(mapStateToProps, mapDispatchToProps )(withErrorHandler(ContactData, axios));