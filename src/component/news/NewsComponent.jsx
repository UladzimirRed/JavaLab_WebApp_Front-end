import React, {Component} from "react";
import NewsDataService from "../../service/NewsDataService";

class NewsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            shortText: '',
            fullText: '',
            creationDate: '',
            modificationDate: '',
            author: [],
            tags: []
        }
        this.updateNewsClicked = this.updateNewsClicked.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        NewsDataService.retrieveNews(this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                shortText: response.data.shortText,
                fullText: response.data.fullText,
                creationDate: response.data.creationDate,
                modificationDate: response.data.modificationDate,
                author: response.data.author,
                tags: response.data.tags
            }))
    }

    updateNewsClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/newses/${id}`)
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {

        let {tags, author, modificationDate, creationDate, fullText, shortText, title, id} = this.state
        const tagList = tags.map(tag => <li>#{tag.id} - {tag.tagName}</li>),
            currentAuthor = author.map(auth => <li>{auth.authorName} {auth.authorSurname}</li>)

        return (
            <div>
                <div className="container">
                    <label>Title:</label>
                    <h4>{title}</h4>
                    <label>Short text:</label>
                    <h5>{shortText}</h5>
                    <label>Full text:</label>
                    <h6>{fullText}</h6>
                    <label>Creation date:</label>
                    <h6>{new Date(creationDate).toString()}</h6>
                    <label>Modification date:</label>
                    <h6>{new Date(modificationDate).toString()}</h6>
                    <label>Author:</label>
                    <h6>{currentAuthor}</h6>
                    <label>Tags list:</label>
                    <h6>{tagList}</h6>
                    <br/>
                    <br/>
                    <button className="btn btn-warning"
                            onClick={() => this.updateNewsClicked(id)}>Update
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

export default NewsComponent