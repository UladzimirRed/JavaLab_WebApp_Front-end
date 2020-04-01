import React, {Component} from "react";
import TagDataService from "../../service/TagDataService";

class TagComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            tagName: ''
        }
        this.updateTagsClicked = this.updateTagsClicked.bind(this)
    }

    componentDidMount() {
        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        TagDataService.retrieveTag(this.state.id)
            .then(response => this.setState({
                tagName: response.data.tagName
            }))
    }

    updateTagsClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/tags/${id}`)
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {

        let {tagName, id} = this.state

        return (
            <div>
                <div className="container">
                    <br/>
                    <h4>Tag:</h4>
                    <h4>- {tagName}</h4>
                    <br/>
                    <br/>
                    <button className="btn btn-warning"
                            onClick={() => this.updateTagsClicked(id)}>Update
                    </button>
                    <br/>
                    <br/>
                    <button type="submit" className="btn btn-primary" onClick={() => this.goBack()}>Back</button>
                </div>
                <br/>
                <br/>
                <br/>
            </div>

        )
    }
}

export default TagComponent