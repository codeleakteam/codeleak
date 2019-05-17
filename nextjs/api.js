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
  getTags: () => {
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
      repository_url: repository,
    })
  },
  sendComment: (type, object_id, authorId, content) => {
    return axios.post(`${BASE_URL}/api/comments`, {
      comment_type: type,
      object_id: object_id,
      author: authorId,
      content: content,
    })
  },
  sendQuestion: (title, description, tags, author, editor) => {
    return axios.post(`${BASE_URL}/api/questions`, {
      title: title,
      description: description,
      tags: tags,
      author: author,
      editor: editor,
    })
  },
}

export const apiPut = {
  updateQuestionScore: (type, questionId, userId) => {
    return axios.put(`${BASE_URL}/api/questions/${questionId}/vote`, {
      is_upvote: type,
      user_id: userId,
    })
  },
}
