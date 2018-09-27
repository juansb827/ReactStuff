import React, {Component} from 'react';

import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigatation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigatation/SideDrawer/SideDrawer';


class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    drawerToggleClickedHandler = () =>{
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        } );
    }

    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.drawerToggleClickedHandler}/>        
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.content} >
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}



export default Layout;