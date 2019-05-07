import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const BASE_URL = publicRuntimeConfig.baseUrl

export const apiGet = {
  getIndex: () => {
    return axios.get(`${BASE_URL}/api/home`)
  },
  getQuestion: id => {
    return axios.get(`${BASE_URL}/api/questions/${id}`)
  },
  getPopularTags: () => {
    return axios.get(`${BASE_URL}/api/tags`)
  },
}

export const apiPost = {
  subscribeMail: value => {
    return axios.post(`${BASE_URL}/api/subscribe`, { email: value })
  },
  sendAnswer: (authorId, questionId, editor, description, repository) => {
    return axios.post(`${BASE_URL}/api/answers`, {
      author: authorId,
      question: questionId,
      editor: editor,
      description: description,
      repository_url: repository
    })
  }
}

export const apiPut = {
  updateQuestionScore: (type, questionId, userId) => {
    return axios.put(`${BASE_URL}/api/questions/${questionId}/vote`, {
      is_upvote: type,
      user_id: userId,
    })
  },
}
