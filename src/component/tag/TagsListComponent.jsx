import React, {Component} from 'react'
import TagDataService from '../../service/TagDataService';

class TagsListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            message: null
        }
        this.deleteTagClicked = this.deleteTagClicked.bind(this)
        this.updateTagClicked = this.updateTagClicked.bind(this)
        this.addTagClicked = this.addTagClicked.bind(this)
        this.refreshTags = this.refreshTags.bind(this)
    }

    componentDidMount() {
        this.refreshTags();
    }

    refreshTags() {
        TagDataService.retrieveAllTags()//HARDCODED
            .then(
                response => {
                    //console.log(response);
                    this.setState({tags: response.data})
                }
            )
    }

    deleteTagClicked(id) {
        TagDataService.deleteTag(id)
            .then(
                response => {
                    this.setState({message: `Delete of tag ${id} Successful`})
                    this.refreshTags()
                }
            )

    }

    addTagClicked() {
        this.props.history.push(`/tags/-1`)
    }

    updateTagClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/tags/${id}`)
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All tags</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tag name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.tags.map(
                                tag =>
                                    <tr key={tag.id}>
                                        <td>{tag.id}</td>
                                        <td>{tag.tagName}</td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.updateTagClicked(tag.id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deleteTagClicked(tag.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTagClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TagsListComponent