import React, {Component} from 'react'
import AuthorDataService from '../../service/AuthorDataService';

class AuthorsListComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            authors: [],
            message: null
        }
        this.deleteAuthorClicked = this.deleteAuthorClicked.bind(this)
        this.updateAuthorClicked = this.updateAuthorClicked.bind(this)
        this.addAuthorClicked = this.addAuthorClicked.bind(this)
        this.refreshAuthors = this.refreshAuthors.bind(this)
    }

    componentDidMount() {
        this.refreshAuthors()
    }

    refreshAuthors() {
        console.log(AuthorDataService.retrieveAllAuthors())
        AuthorDataService.retrieveAllAuthors()
            .then(
                response => {
                    console.log(response)
                    this.setState({authors: response.data})
                }
            )
    }

    deleteAuthorClicked(id) {
        AuthorDataService.deleteAuthor(id)
            .then(
                response => {
                    this.setState({message: `Delete of author ${id} Successful`})
                    this.refreshAuthors()
                }
            )

    }

    addAuthorClicked() {
        this.props.history.push(`/authors/-1`)
    }

    openNewsClicked(id) {
        this.props.history.push(`/author/${id}`)
    }

    updateAuthorClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/authors/${id}`)
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All authors</h3>
                <span>sorted by id</span>
                <br/>
                <br/>

                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Open</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.authors.sort((a,b) => a.id - b.id).map(
                                authors =>
                                    <tr key={authors.id}>
                                        <td>{authors.id}</td>
                                        <td>{authors.authorName}</td>
                                        <td>{authors.authorSurname}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.openNewsClicked(authors.id)}>Open
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.updateAuthorClicked(authors.id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deleteAuthorClicked(authors.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="mb-2">
                        <button className="btn btn-success" onClick={this.addAuthorClicked}>Add</button>
                        <br/>
                        <br/>
                        <button type="submit" className="btn btn-primary" onClick={() => this.goBack()}>Back</button>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default AuthorsListComponent