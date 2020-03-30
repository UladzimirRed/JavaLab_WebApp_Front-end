import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
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
            authors: [],
            tags: []
        }

        this.onSubmit = this.onSubmit.bind(this)
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

    // validate(values) {
    //     let errors = {}
    //     if (!values.description) {
    //         errors.description = 'Enter a Description'
    //     } else if (values.description.length < 5) {
    //         errors.description = 'Enter atleast 5 Characters in Description'
    //     }
    //
    //     return errors
    //
    // }

    onSubmit(values) {

        let news = {
            id: this.state.id,
            title: values.title,
            shortText: values.shortText,
            fullText: values.fullText,
            creationDate: values.creationDate,
            modificationDate: values.modificationDate,
            authors: values.authors,
            tags: values.tags
        }

        if (this.state.id === -1) {
            NewsDataService.createNews(news)
                .then(() => this.props.history.push('/news'))
        } else {
            NewsDataService.updateNews(this.state.id, news)
                .then(() => this.props.history.push('/news'))
        }

        console.log(values);
    }

    render() {

        let {tags, authors, modificationDate, creationDate, fullText, shortText, title, id} = this.state

        return (
            <div>
                <h3>Edit news</h3>
                <div className="container">
                    <Formik
                        initialValues={{id, title, shortText, fullText, creationDate, modificationDate, authors, tags}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        // validate={this.validate}
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
                                        <Field className="form-control" type="text" name="creationDate"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Modification Date</label>
                                        <Field className="form-control" type="text" name="modificationDate"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Authors</label>
                                        <Field className="form-control" type="text" name="authors"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Tags</label>
                                        <Field className="form-control" type="text" name="tags"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
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