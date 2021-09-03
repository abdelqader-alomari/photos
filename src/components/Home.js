import React, { Component } from 'react'
import axios from 'axios'
import { Card, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import './home.css'

export class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            showCards: false,
            clicks: 0,
        }
    }
    searchFunction = (e) => {
        e.preventDefault()
        const search = e.target.search.value
        axios.get(`${process.env.REACT_APP_PORT}/api?search=${search}`).then((response) => {
            this.setState({
                photos: response.data.results,
                showCards: true,
            })
        })
    }

    addFav = (index) => {
        const body = {
            likes: this.state.photos[index].likes + this.state.clicks + 1,
            raw: this.state.photos[index].urls.raw,
            alt_description: this.state.photos[index].alt_description,
            email: this.props.auth0.user.email
        }
        console.log(body)
        axios.post(`${process.env.REACT_APP_PORT}/add`, body).then(res => { })
    }



    render() {
        return (
            <div>
                <Card style={{ marginLeft: '100px', marginRight: '100px', backgroundColor: '#137564' }}>
                    <Form style={{ width: "65%", marginLeft: "10%" }}
                        onSubmit={this.searchFunction}>
                        <Button style={{ height: '56px', width: '125px', marginLeft: '625px', position: 'relative', top: '58.2px', left: '20%', backgroundColor: '#27BDBD', fontSize: "20px", fontFamily: 'Helvetica', border: 'none' }} className="formbutton" type='submit'>Search</Button>
                        <Form.Group className="mb-5" controlId="formBasicEmail">
                            <Form.Control style={{ height: '60px', fontSize: '18px', width: '50rem', marginBottom: '55px' }} placeholder='Search For photos' type="text" name="search" />
                        </Form.Group>

                    </Form>
                </Card>
                {this.state.showCards &&
                    this.state.photos.map((photo, idx) => (

                        <Card style={{ width: '16rem', float: 'right', height: '31rem', marginTop: '30px', marginRight: '55px' }}>
                            <Card.Img style={{ height: '18rem' }} variant="top" src={photo.urls.raw} />
                            <Card.Body>
                                <Card.Title>{photo.alt_description}</Card.Title>
                                <Card.Text>
                                    {photo.likes} ❤
                                </Card.Text>
                                <Button className="click" onClick={() => { this.addFav(idx) }} style={{ position: 'absolute', top: '27rem', left: '5.5rem' }} variant="dark">I like it</Button>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        )
    }
}

export default withAuth0(Home)
