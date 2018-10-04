import React, { Component } from 'react';

class Course extends Component {

    state = {
        title: null
    }

    componentDidMount() {        
        
        const query = new URLSearchParams(this.props.location.search);
        const courseName = query.get("name");
        this.setState({ title: courseName })
    }

    componentDidUpdate(){
        const query = new URLSearchParams(this.props.location.search);
        const courseName = query.get("name");
        if (courseName != this.state.title){
            this.setState({ title: courseName });
        }
        
        

    }
    render () {
        
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;