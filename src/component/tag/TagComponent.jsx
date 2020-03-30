import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import TagDataService from '../../service/TagDataService';

class TagComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            tagName: ''
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

        TagDataService.retrieveTag(this.state.id)
            .then(response => this.setState({
                tagName: response.data.tagName
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

        let tag = {
            id: this.state.id,
            tagName: values.tagName
        }

        if (this.state.id === -1) {
            TagDataService.createTag(tag)
                .then(() => this.props.history.push('/tags'))
        } else {
            TagDataService.updateTag(this.state.id, tag)
                .then(() => this.props.history.push('/tags'))
        }

        console.log(values);
    }

    render() {

        let {tagName, id} = this.state

        return (
            <div>
                <h3>Edit tag</h3>
                <div className="container">
                    <Formik
                        initialValues={{id, tagName}}
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
                                        <label>Tag Name</label>
                                        <Field className="form-control" type="text" name="tagName"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default TagComponent