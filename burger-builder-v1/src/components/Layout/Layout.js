import React from 'react';

import Aux from '../../hoc/_Aux';
import classes from './Layout.css';
import Toolbar from '../Navigatation/Toolbar/Toolbar';
import SideDrawer from '../Navigatation/SideDrawer/SideDrawer';


const layout = (props) => (
    <Aux>
        <Toolbar/>        
        <SideDrawer />
        <main className={classes.content} >
            {props.children}
        </main>
    </Aux>
);

export default layout;