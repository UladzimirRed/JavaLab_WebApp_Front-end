import React, {Component} from "react";
import NewsDataService from "../../service/NewsDataService";

class NewsComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            shortText: '',
            fullText: '',
            creationDate: '',
            modificationDate: '',
            authors: [],
            tags: []
        }

        // this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)

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
                authors: response.data.authors,
                tags: response.data.tags
            }))
    }

    render() {

        return (
            <div className="container">
                <h3>News</h3>
                <div className="container">
                    <h4>{this.state.title}</h4>
                    <h5>{this.state.shortText}</h5>
                    <h6>{this.state.fullText}</h6>
                    <h6>{this.state.creationDate}</h6>
                    <h6>{this.state.modificationDate}</h6>
                </div>
                <br/>
                <br/>
                <br/>
            </div>

        )
    }
}

export default NewsComponent