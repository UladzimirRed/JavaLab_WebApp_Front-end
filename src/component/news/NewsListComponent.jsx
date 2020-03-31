import React, {Component} from 'react'
import NewsDataService from '../../service/NewsDataService';

class NewsListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: [],
            message: null
        }
        this.deleteNewsClicked = this.deleteNewsClicked.bind(this)
        this.updateNewsClicked = this.updateNewsClicked.bind(this)
        this.addNewsClicked = this.addNewsClicked.bind(this)
        this.refreshNews = this.refreshNews.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
        this.refreshNews();
    }

    refreshNews() {
        NewsDataService.retrieveAllNews()//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({news: response.data})
                }
            )
    }

    deleteNewsClicked(id) {
        NewsDataService.deleteNews(id)
            .then(
                response => {
                    this.setState({message: `Delete of news ${id} Successful`})
                    this.refreshNews()
                }
            )

    }

    addNewsClicked() {
        this.props.history.push(`/newses/-1`)
    }

    openNewsClicked(id) {
        this.props.history.push(`/news/${id}`)
    }

    updateNewsClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/newses/${id}`)
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All news</h3>
                <span>sorted by editing</span>
                <br/>
                <br/>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Short Text</th>
                            <th>Open</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.news.sort((a, b) => b.modificationDate - a.modificationDate).map(
                                news =>
                                    <tr key={news.id}>
                                        <td>{news.id}</td>
                                        <td>{news.title}</td>
                                        <td>{news.shortText}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.openNewsClicked(news.id)}>Open
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.updateNewsClicked(news.id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deleteNewsClicked(news.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="mb-2">
                        <button type="submit" className="btn btn-success" onClick={this.addNewsClicked}>Add</button>
                        <br/>
                        <br/>
                        <button type="submit" className="btn btn-primary" onClick={this.goBack}>Back</button>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default NewsListComponent