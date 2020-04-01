import React, {Component} from "react";
import AuthorDataService from "../../service/AuthorDataService";

class AuthorsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            authorName: '',
            authorSurname: ''
        }
        this.updateAuthorsClicked = this.updateAuthorsClicked.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        AuthorDataService.retrieveAuthor(this.state.id)
            .then(response => this.setState({
                authorName: response.data.authorName,
                authorSurname: response.data.authorSurname
            }))
    }

    updateAuthorsClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/authors/${id}`)
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {

        let {authorSurname, authorName, id} = this.state

        return (
            <div>
                <div className="container">
                    <h4>Author:</h4>
                    <label>Name:</label>
                    <h4>{authorName}</h4>
                    <label>Surname:</label>
                    <h5>{authorSurname}</h5>
                    <br/>
                    <br/>
                    <button className="btn btn-warning"
                            onClick={() => this.updateAuthorsClicked(id)}>Update
                    </button>
                    <br/>
                    <br/>
                    <button type="submit" className="btn btn-primary" onClick={this.goBack}>Back</button>
                </div>
                <br/>
                <br/>
                <br/>
            </div>

        )
    }
}

export default AuthorsComponent