import React, { Component } from 'react';
//import './Person.css';
const  userInput = (props) => {
    const style = {
        color: 'red'
    }
    return (
        <div className="">
            <input style={style} value={props.username} onChange={props.newUsername} />           
        </div>
    );
}

export default userInput;