import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'


export class UpdateModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.runModal}>
                <Modal.Header>
                    <Modal.Title>update</Modal.Title>
                </Modal.Header>

                <Form style={{ padding: '20px' }} onSubmit={(e) => this.props.updateFav(e)}>

                    <Form.Group className="mb-3">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type="text" placeholder="Photo" defaultValue={this.props.updateObject.raw} name='raw' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" defaultValue={this.props.updateObject.alt_description} name='alt_description' />
                    </Form.Group>


                    <Button style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }} variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Modal >
        )
    }
}

export default UpdateModal
