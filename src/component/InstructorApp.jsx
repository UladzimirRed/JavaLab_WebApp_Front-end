import React, {Component} from 'react'
import AuthorsListComponent from './author/AuthorsListComponent'
import NewsListComponent from './news/NewsListComponent'
import TagListComponent from './tag/TagsListComponent'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReactBootstrap, {Navbar, Button, FormControl, Form, Nav, FormGroup} from 'react-bootstrap'
import AuthorsComponent from './author/AuthorsComponent'
import EditNewsComponent from './news/EditNewsComponent'
import NewsComponent from './news/NewsComponent'
import TagComponent from './tag/TagComponent'
import SignInComponent from './SignInComponent'
import '../App.css'


class InstructorApp extends Component {
    render() {
        return (
            <>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                        <a className="navbar-brand" href="/">Home</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                                aria-expanded="false" aria-label="Toggle navigation">
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/news">News</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/authors">Authors</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/tags">Tags</a>
                                </li>
                            </ul>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign out</button>
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
                        <Route path="/authors/:id" component={AuthorsComponent}/>
                        <Route path="/news" exact component={NewsListComponent}/>
                        <Route path="/news/:id" component={EditNewsComponent}/>
                        <Route path="/tags" exact component={TagListComponent}/>
                        <Route path="/tags/:id" component={TagComponent}/>
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