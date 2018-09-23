import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes['build-control']}>
        <div className={classes.label}>{props.label}</div>
        <button className={classes.less}>LESS</button>
        <button className={classes.more}>MORE</button>
    </div>
);

export default buildControl;