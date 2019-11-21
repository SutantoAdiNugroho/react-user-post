import React, { Component } from 'react'
import ComponentUnmount from './ComponentUnmount'
import ComponentUpdate from './ComponentUpdate'
import axios from 'axios'

export default class ComponentMount extends Component {
    constructor(props) {
        super(props);

        this.state={
            color: "red",
            text: "Update",
            data: []
        };
    }

    componentDidMount = () => {
        axios
            .get("https://api.github.com/users/SutantoAdiNugroho") 
            .then(response => {
                this.setState({data : response.data});
            })
            .catch(error => {
                console.log(error)
            });
    };

    // fetch("https://api.github.com/users/SutantoAdiNugroho")
        // .then(response=> {
        //     return response.json();
        // })
        // .then(data=> {
        //     this.setState({data: data})
        // });

    render() {
        return (
            <div>
                <ComponentUnmount />
                <p>This color is {this.state.color}</p>
                <p style={{background:"red"}}>
                    {this.state.text !== "" && this.state.text}{" "}
                </p>
                <img src={this.state.data.avatar_url} alt="profile"/>
                <ComponentUpdate text={this.state.text}/>
            </div>
        );
    }
}
