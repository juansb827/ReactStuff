import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    deletePostHandler = () => {
        axios.delete('/posts/'+ this.state.loadedPost.id )
            .then(console.log); 
    }

    componentDidMount() {
        this.updateData();

    }

    componentDidUpdate(){
        this.updateData();
    }

    updateData(){
        const id = this.props.match.params.id;
        if (id ) {
            if( this.state.loadedPost == null ||
                (this.state.loadedPost && this.state.loadedPost.id != id) ){
                axios.get('/posts/' + id)
                .then(response => {
                    console.log("Fecthed Blog with id " + id);
                    this.setState({loadedPost: response.data});
                });
            }           
        }
    }


    render() {
        let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: "center" }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;