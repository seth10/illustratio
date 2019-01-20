import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
    Stitch,
    AnonymousCredential,
    UserPasswordCredential,
    RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'
import HomePage from './pages/HomePage'
import ArtworkPage from './pages/ArtworkPage'
//import Nav from './components/Nav'
import './App.css'

const APP_ID = 'illustratio-vdzkt'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { isAuthed: false }

        this.appId = APP_ID
        if (!Stitch.hasAppClient(this.appId)) {
            this.client = Stitch.initializeDefaultAppClient(this.appId)
        } else {
            this.client = Stitch.defaultAppClient
        }

        this.mongodb = this.client.getServiceClient(
            RemoteMongoClient.factory,
            'mongodb-atlas'
        )
    }

    handleAnonLogin = async () => {
        await this.client.auth.loginWithCredential(new AnonymousCredential())
        this.setState({ isAuthed: true, authMethod: 'anon' })
    }
    handleEmailLogin = async (email, password) => {
        await this.client.auth.loginWithCredential(new UserPasswordCredential(email, password))
        this.setState({ isAuthed: true, authMethod: 'email' })
        //this.mongodb.db('illustratio').collection('users').find({'user_id': this.client.auth.user.id}).asArray().then(data => {
        //    console.log(data)
        //})
        console.log(this.client.auth.user.id)
        //this.mongodb.db('illustratio').collection('users').insertOne({"fdas": "asdf", 'user_id': this.client.auth.user.id })
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    {/*<Nav />*/}
                    <Switch>
                        <Route
                            exact path="/"
                            render={props => <HomePage
                                                isAuthed={this.state.isAuthed} authMethod={this.state.authMethod} mongodb={this.mongodb}
                                                handleAnonLogin={this.handleAnonLogin} handleEmailLogin={this.handleEmailLogin}
                                                {...props}
                                             />
                            }
                        />
                        <Route
                            exact path="/artwork/:id"
                            render={props => <ArtworkPage isAuthed={this.state.isAuthed} mongodb={this.mongodb} client={this.client} {...props} />}
                        />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}

export default App
