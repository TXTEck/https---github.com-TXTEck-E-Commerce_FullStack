import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditJersey extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            team: ``,
            player: ``,
            number: ``,
            price: ``,
            colour:``,
            redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER
        }
    }

    componentDidMount() 
    {      
        this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/jerseys/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                { 
                    this.setState({
                        team: res.data.team,
                        player: res.data.player,
                        number: res.data.number,
                        price: res.data.price,
                        colour: res.data.colour
                    })
                }
            }
            else
            {
                console.log(`Record not found`)
            }
        })
    }


    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const jerseyObject = {
            team: this.state.team,
            number: this.state.number,
            player: this.state.player,
            price: this.state.price,
            colour: this.state.colour
        }

        axios.put(`${SERVER_HOST}/jerseys/${this.props.match.params.id}`, jerseyObject, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {             
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {      
                    console.log(`Record updated`)
                    this.setState({redirectToDisplayAllCars:true})
                }
            }
            else
            {
                console.log(`Record not updated`)
            }
        })
    }


    render() 
    {
        return (
            <div className="form-container">
    
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}  
                        
                <Form>
                    <Form.Group controlId="team">
                        <Form.Label>Model</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="team" value={this.state.team} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="player">
                        <Form.Label>Player</Form.Label>
                        <Form.Control type="text" name="player" value={this.state.player} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="number">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" name="number" value={this.state.number} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}