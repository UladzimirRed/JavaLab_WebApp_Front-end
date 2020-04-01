import axios from 'axios'

const INSTRUCTOR = 'nManagement'
const NEWS_API_URL = ''
const INSTRUCTOR_API_URL = `${NEWS_API_URL}/${INSTRUCTOR}`

class NewsDataService {

    retrieveAllNews() {
        return axios.get(`${INSTRUCTOR_API_URL}/news/`);
    }

    retrieveNews(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/news/${id}`);
    }

    deleteNews(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/news/${id}`);
    }

    updateNews(id, news) {
        return axios.put(`${INSTRUCTOR_API_URL}/news/${id}`, news);
    }

    createNews(news) {
        return axios.post(`${INSTRUCTOR_API_URL}/news/`, news);
    }
}

export default new NewsDataService()