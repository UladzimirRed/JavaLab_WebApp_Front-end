import React, {Component} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik';
import AuthorDataService from '../../service/AuthorDataService';

class AuthorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            authorName: '',
            authorSurname: ''
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

        AuthorDataService.retrieveAuthor(this.state.id)
            .then(response => this.setState({
                authorName: response.data.authorName,
                authorSurname: response.data.authorSurname
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

        let author = {
            id: this.state.id,
            authorName: values.authorName,
            authorSurname: values.authorSurname
        }

        if (this.state.id === -1) {
            AuthorDataService.createAuthor(author)
                .then(() => this.props.history.push('/authors'))
        } else {
            AuthorDataService.updateAuthor(this.state.id, author)
                .then(() => this.props.history.push('/authors'))
        }

        console.log(values);
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {

        let {authorSurname, authorName, id} = this.state

        return (
            <div>
                <h3>Edit author</h3>
                <div className="container">
                    <Formik
                        initialValues={{id, authorName, authorSurname}}
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
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="authorName"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Surname</label>
                                        <Field className="form-control" type="text" name="authorSurname"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                    <br/>
                                    <br/>
                                    <button type="submit" className="btn btn-primary" onClick={() => this.goBack()}>Back
                                    </button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default AuthorComponent