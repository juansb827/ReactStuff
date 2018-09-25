import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes['build-control']}>
        <div className={classes.label}>{props.label}</div>
        <button className={classes.less} 
            onClick={props.clickLess}  
            disabled={props.disabled}>LESS</button>
        <button className={classes.more} 
                onClick={props.clickMore}>MORE</button>
    </div>
);

export default buildControl;