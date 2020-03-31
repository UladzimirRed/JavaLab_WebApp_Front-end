import React, {Component} from 'react'
import AuthorsListComponent from './author/AuthorsListComponent'
import EditAuthorComponent from './author/EditAuthorComponent'
import NewsListComponent from './news/NewsListComponent'
import TagListComponent from './tag/TagsListComponent'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthorsComponent from './author/AuthorsComponent'
import EditNewsComponent from './news/EditNewsComponent'
import NewsComponent from './news/NewsComponent'
import TagComponent from './tag/TagComponent'
import EditTagComponent from './tag/EditTagComponent'
import SignInComponent from './SignInComponent'
import '../App.css'


class InstructorApp extends Component {

    render() {
        const {history} = this.props
        return (
            <>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                        <a className="navbar-brand" href="/newses">Home</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                                aria-expanded="false" aria-label="Toggle navigation">
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/newses">News</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/authors">Authors</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/tags">Tags</a>
                                </li>
                            </ul>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
                                    onClick={() => window.location.assign('http://localhost:3000/sign')}>Sign out
                            </button>
                        </div>
                    </nav>
                </header>
                <br/>
                <br/>
                <br/>
                <h1>News Management</h1>

                <Router>
                    <Switch>
                        <Route path="/" exact component={SignInComponent}/>
                        <Route path="/authors" exact component={AuthorsListComponent}/>
                        <Route path="/authors/:id" component={EditAuthorComponent}/>
                        <Route path="/newses" exact component={NewsListComponent}/>
                        <Route path="/news/:id" exact component={NewsComponent}/>
                        <Route path="/newses/:id" component={EditNewsComponent}/>
                        <Route path="/tags" exact component={TagListComponent}/>
                        <Route path="/tag" exact component={TagComponent}/>
                        <Route path="/tags/:id" component={EditTagComponent}/>
                    </Switch>
                </Router>

                <footer>
                    <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                        <a className="navbar-brand navbar-color">Copyright EPAM 2020. All rights reserved</a>
                    </nav>
                </footer>
            </>
        )
    }
}

export default InstructorApp