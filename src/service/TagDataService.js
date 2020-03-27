import axios from 'axios'

const INSTRUCTOR = 'nManagement'
const TAG_API_URL = ''
const INSTRUCTOR_API_URL = `${TAG_API_URL}/${INSTRUCTOR}`

class TagDataService {

    retrieveAllTags() {
        //console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/tags/`);
    }

    retrieveTag(id) {
        //console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/tags/${id}`);
    }

    deleteTag(id) {
        //console.log('executed service')
        return axios.delete(`${INSTRUCTOR_API_URL}/tags/${id}`);
    }

    updateTag(id, tag) {
        //console.log('executed service')
        return axios.put(`${INSTRUCTOR_API_URL}/tags/${id}`, tag);
    }

    createTag(tag) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/tags/`, tag);
    }
}

export default new TagDataService()