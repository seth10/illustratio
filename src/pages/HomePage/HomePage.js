import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, FormControl, ControlLabel, Col, Button, Panel } from 'react-bootstrap'
import './HomePage.css'

class HomePage extends Component {
    state = {}
    handleRandom = () => {
        this.props.mongodb.db('illustratio').collection('artwork').aggregate([{ $sample: { size: 1 } }]).asArray().then(data => {
            this.props.history.push('/artwork/'+data[0].id)
        })
    }
    render() {
        return (
            <div className="col-12 pt-4 pb-4">
                <Jumbotron>
                    <h1>illustratio</h1>
                    <p>Experience cultural enlightenment in Baltimore</p>
                </Jumbotron>
                <Panel>
                    <Panel.Body><em>illustratio</em> is an app that informs you of artwork around Baltimore and provides fact about the medium of art.</Panel.Body>
                </Panel>
                
                <hr />
                
                {!this.props.isAuthed ? (
                <React.Fragment>
                    <p>Login to keep track of your patronage:</p>
                    <Form>
                        <FormGroup controlId="formEmail">
                            <Col componentClass={ControlLabel}>
                                Email
                            </Col>
                            <Col>
                                <FormControl type="email" placeholder="hack3r@gmail.com" inputRef={input => this.formEmail = input} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formPass">
                            <Col componentClass={ControlLabel}>
                                Password
                            </Col>
                            <Col>
                                <FormControl type="password" placeholder="hunter2" inputRef={input => this.formPass = input} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col>
                                <Button bsStyle="primary" onClick={() => this.props.handleEmailLogin(this.formEmail.value, this.formPass.value)}>Login</Button>
                            </Col>
                        </FormGroup>
                    </Form>

                    <hr />

                    <p>Or, begin without logging in:</p>
                    <Button bsStyle="warning" onClick={this.props.handleAnonLogin}>Continue without login</Button>
                </React.Fragment>
                ) : (
                <React.Fragment>
                    <p><Button onClick={this.handleRandom}>Show me art (random)</Button></p>
                    <p><Button>Last session</Button></p>
                    <p><Button>My favorites</Button></p>
                </React.Fragment>
                )}
                <div id="scrollingBackground"></div>
            </div>
        )
    }
}

export default HomePage
