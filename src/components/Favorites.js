import React, { Component } from 'react'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import UpdateModal from './UpdateModal'

export class Favorites extends Component {

    constructor(props) {
        super(props)
        this.state = {
            favPhotos: [],
            showModal: false,
            updateObject: {}
        }
    }

    runModal = (element) => {
        this.setState({
            updateObject: element,
            showModal: true,
        })
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_PORT}/fav?email=${this.props.auth0.user.email}`)
            .then(response => {
                this.setState({
                    favPhotos: response.data
                })
            })
    }

    deleteFav = (id) => {
        axios.delete(`${process.env.REACT_APP_PORT}/delete/${id}`)
            .then(response => {
                this.setState({
                    favPhotos: response.data
                })
            })
    }
    updateFav = ((event) => {
        // event.preventDefault();
        const photoId = this.state.updateObject._id
        const body = {
            raw: event.target.raw.value,
            alt_description: event.target.alt_description.value,
        }
        axios.put(`${process.env.REACT_APP_PORT}/update/${photoId}`, body).then(update => {
            const photoArr = this.state.favPhotos.map(photo => {
                if (photo._id === photoId) {
                    photo.raw = update.data.raw;
                    photo.alt_description = update.data.alt_description;
                    return photo
                }
                return photo;
            })
            this.setState({ favPhotos: photoArr, showModal: false, updateObject: {} })
        })
    })



    render() {
        return (
            <div>
                <>
                    {this.runModal &&
                        <UpdateModal
                            show={this.state.showModal}
                            runModal={this.runModal}
                            updateFav={this.updateFav}
                            updateObject={this.state.updateObject}
                        />
                    }
                </>
                {this.state.favPhotos.length &&
                    this.state.favPhotos.map((photo, idx) => (
                        <Card key={idx} style={{ width: '16rem', float: 'left', height: '31rem', marginTop: '30px', marginLeft: '57px' }}>
                            <Card.Img style={{ height: '18rem' }} variant="top" src={photo.raw} />
                            <Card.Body>
                                <Card.Title>{photo.alt_description}</Card.Title>
                                <Card.Text>
                                    {photo.likes} ❤
                                </Card.Text>
                                <Button onClick={() => { this.deleteFav(photo._id) }} style={{ position: 'absolute', top: '27rem', left: '3rem' }} variant="danger">Delete</Button>
                                <Button onClick={() => { this.runModal(photo) }} style={{ position: 'absolute', top: '27rem', left: '8rem' }} variant="success">Update</Button>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        )
    }
}

export default withAuth0(Favorites)
