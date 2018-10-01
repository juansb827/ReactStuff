import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../_Aux/_Aux';

const withErrorHandler = (WrappedComponent) => {
    return (props) => {
        return (
            
            <Aux>
            <Modal show>
                Something didnt work
            </Modal>
            <WrappedComponent {...props}  />
            </Aux>
        )
    }
}

export default withErrorHandler;