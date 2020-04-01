import React, {Component} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik';
import NewsDataService from '../../service/NewsDataService';

class EditNewsComponent extends Component {
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

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {

        console.log(this.state.id)

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

    validate(values) {
        let errors = {}
        if (!values.title) {
            errors.title = 'Enter a Description'
        } else if (values.title.length < 5) {
            errors.title = 'Enter atleast 5 Characters in Description'
        }
        return errors
    }

    onSubmit(values) {

        let news = {
            id: this.state.id,
            title: values.title,
            shortText: values.shortText,
            fullText: values.fullText,
            creationDate: values.creationDate,
            modificationDate: values.modificationDate,
            author: values.author,
            tags: values.tags
        }

        if (this.state.id === -1) {
            news.creationDate = new Date().getMilliseconds()
            news.modificationDate = new Date().getMilliseconds()
            NewsDataService.createNews(news)
                .then(() => this.props.history.push('/newses'))
        } else {
            news.modificationDate = new Date().getMilliseconds()
            NewsDataService.updateNews(this.state.id, news)
                .then(() => this.props.history.push('/newses'))
        }
        console.log(values);
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {

        let {tags, author, creationDate, fullText, shortText, title, id} = this.state
        const tagsList = tags.map(tag => <li>{tag.id} - {tag.tagName}</li>)
        const currentAuthor = author.map(auth => <li>{auth.authorName} {auth.authorSurname}</li>)
        const formatCreationDate = new Date(creationDate).toString()


        return (
            <div>
                <h3>Edit news</h3>
                <div className="container">
                    <Formik
                        initialValues={{id, title, shortText, fullText, formatCreationDate, author, tags}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field className="form-control" type="text" name="title"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Short Text</label>
                                        <Field className="form-control" type="text" name="shortText"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Full Text</label>
                                        <Field className="form-control" type="text" name="fullText"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Creation Date</label>
                                        <Field className="form-control" type="text" name="formatCreationDate" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Author:</label>
                                        <ul>{currentAuthor}</ul>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Tags</label>
                                        <ul>{tagsList}</ul>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                    <br/>
                                    <br/>
                                    <button type="submit" className="btn btn-primary"
                                            onClick={() => this.goBack()}>Back
                                    </button>
                                </Form>
                            )
                        }
                    </Formik>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default EditNewsComponent