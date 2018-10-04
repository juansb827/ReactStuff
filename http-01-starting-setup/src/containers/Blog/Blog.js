import React, { Component } from 'react';
//import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import './Blog.css';
import Posts from '../Posts/Posts';
//import NewPost from '../NewPost/NewPost'
import asyncComponet from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponet(() => {
    return import('../NewPost/NewPost');
});

class Blog extends Component {

    state = {
        auth: true
    }
    render() {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact>Home</NavLink></li>
                            <li><NavLink to="/new-post" exact>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>                    
                    { this.state.auth && <Route path="/new-post" exact component={AsyncNewPost} />}
                    <Route path="/posts"  component={Posts} />
                    <Route render={() => <h1>Not Found</h1>} /> 
                    
                </Switch>
            </div>
        );
    }
}
/** <Redirect from="/" to="/posts" /> */
export default Blog;