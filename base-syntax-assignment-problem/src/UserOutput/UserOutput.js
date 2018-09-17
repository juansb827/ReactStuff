import React, { Component } from 'react';
import './UserOutput.css';
const  userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p >{props.text1}</p>           
            <p >{props.children}</p>           
        </div>
    );
}

export default userOutput;