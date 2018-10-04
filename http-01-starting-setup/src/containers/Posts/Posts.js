import React, { Component } from 'react';
//import axios from '../../axios'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import Post from '../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost'
class Posts extends Component {

    state = {
        posts: []
    }

    postSelectedHandler = (postId) => {
        this.props.history.push('/posts/' +postId );
    }

    componentDidMount() {
        console.log("Post mounted");
        axios.get('/posts')
            .then(response => {
                console.log("Post fetched");
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Pepe'
                    }
                })
                this.setState({ posts: updatedPosts });
            })
            .catch(() => {
                console.log("Error");
                //this.setState({error: true});
            });
    }


    render() {

        let posts = <p>Something went wrong!</p>

        if (!this.state.error) {
            posts = this.state.posts.map(post => (
                //<Link key={post.id} to={'/'+ post.id}>
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
                //</Link>
            ));
        }


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url+'/:id'} exact component={FullPost} />
            </div>
        )
    }

}

export default Posts;