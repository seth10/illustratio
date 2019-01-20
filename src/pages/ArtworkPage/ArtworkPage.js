import React, { Component } from 'react'
import './ArtworkPage.css'

class ArtworkPage extends Component {
    state = {favorited: false}
    constructor(props) {
        super(props)

        this.props.mongodb.db('illustratio').collection('artwork').find({ 'id': this.props.match.params.id }).asArray().then(data => {
            this.setState({ data: data[0] })
            if (data[0].user_likes) {
                //let likes = data[0].likes.map(like => Array.from(like.id).map(b => b.toString(16).padStart(2, "0")).join(""))
                this.setState({ favorited: data[0].user_likes.indexOf(this.props.client.auth.user.id)>=0 })
            }
            if (data[0].data.type) {
                //let types = data[0].data.type.match(/\w+/g).map(String.prototype.toLowerCase)
                let typeWords = data[0].data.type.match(/\w+/g).map(word => word.toLowerCase())
                this.props.mongodb.db('illustratio').collection('materials').find({ 'keyword': {$in: typeWords} }).asArray().then(data2 => {
                    data2[0] && this.setState({ typeFlavor: data2[0].description })
                });
            }
        })
    }
    handleFavorite = event => {
        this.props.mongodb.db('illustratio').collection('artwork').updateOne({ 'id': this.props.match.params.id }, { $pull: {user_likes: this.props.client.auth.user.id} })
        this.setState({ favorited: event.target.checked })
    }
    render() {
        if (!this.state.data) return ( <div></div> )
        return (
            <main role="main" className="container">
                <h1 className="mt-5">{this.state.data.data.name || 'Untitled'}</h1>
                <p className="lead">{this.state.data.data.artists[0] || 'Unattributed'}</p>

                {this.state.data.data.notes ? (
                <div className="input-group fake-input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Notes</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.data.data.notes} disabled />
                </div>
                ) : null}
                {this.state.data.data.site ? (
                <div className="input-group fake-input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Site</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.data.data.site} disabled />
                </div>
                ) : null}
                {this.state.data.data.address && !this.state.data.data.address.endsWith('000Z') ? (
                <div className="input-group fake-input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Address</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.data.data.address} disabled />
                </div>
                ) : null}
                {this.state.data.data.type ? (
                    this.state.typeFlavor ? (
                    <div className="card">
                        <div className="input-group fake-input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Type</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.data.data.type} disabled />
                        </div>
                        <p className="card-body">{this.state.typeFlavor}</p>
                    </div>
                    ) : (
                    <div className="input-group fake-input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Type</span>
                        </div>
                        <input type="text" className="form-control" value={this.state.data.data.type} disabled />
                    </div>
                    )
                ) : null}

                {this.state.data.data.images ? (
                <React.Fragment>
                <button className="btn btn-secondary" type="button" data-toggle="collapse" data-target="#imageSpoiler" aria-expanded="false" aria-controls="collapseExample">
                      Image <span className="badge badge-danger">Spoiler</span>
                </button>
                <div className="collapse mt-1" id="imageSpoiler">
                    <img className="img-fluid" src={this.state.data.data.images[0]} alt="" />
                </div>
                </React.Fragment>
                ) : null}

                <hr />

                <p><button className="btn btn-primary btn-lg btn-block" type="button" data-toggle="collapse" data-target="#visited" aria-expanded="false" aria-controls="collapseExample">
                      I Visited This!
                </button></p>
                <div className="collapse" id="visited">
                    <label htmlFor="my-notes">My Notes</label>
                    <textarea id="my-notes" className="form-control" aria-label="With textarea"></textarea>
                </div>

                <hr />
                {/*<button className="btn btn-danger btn-block" type="button" data-target="#favorited" aria-controls="collapseExample">
                      I Love This!
                </button>*/}
                {/*<div className="btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-danger btn-block">
                    <input type="checkbox" autoComplete="off" checked={this.state.favorited || false} onChange={this.handleFavorite} />I Love This!
                    </label>
                </div>*/}
                <input type="checkbox" checked={this.state.favorited} onChange={this.handleFavorite} /> I Love This!
            </main>
        )
    }
}

export default ArtworkPage
