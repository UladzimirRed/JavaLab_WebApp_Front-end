import axios from 'axios'

const INSTRUCTOR = 'nManagement'
const AUTHOR_API_URL = ''
const INSTRUCTOR_API_URL = `${AUTHOR_API_URL}/${INSTRUCTOR}`

class AuthorDataService {

    retrieveAllAuthors() {
        return axios.get(`${INSTRUCTOR_API_URL}/authors/`);

    }

    retrieveAuthor(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/authors/${id}`);
    }

    deleteAuthor(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/authors/${id}`);
    }

    updateAuthor(id, author) {
        return axios.put(`${INSTRUCTOR_API_URL}/authors/${id}`, author);
    }

    createAuthor(author) {
        return axios.post(`${INSTRUCTOR_API_URL}/authors/`, author);
    }
}

export default new AuthorDataService()