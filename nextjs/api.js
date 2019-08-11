// import axios from 'axios'
import axios from './axios'
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
  getTags: ({ q }) => {
    return axios.get(`${BASE_URL}/api/tags?q=${q}`)
  },
  getUserProfile: id => axios.get(`${BASE_URL}/api/users/${id}`),
  getNotifications: userId => axios.get(`${BASE_URL}/api/notifications/${userId}`),
  getUnreadNotifications: userId => axios.get(`${BASE_URL}/api/notifications/${userId}/unread`),
  markAllAsRead: userId => axios.put(`${BASE_URL}/api/notifications/${userId}/mark_all_as_read`),
  searchQuery: q =>
    axios.get(`${BASE_URL}/api/search`, {
      params: {
        q,
      },
    }),
  getTagList: () => axios.get(`${BASE_URL}/api/tags`),
}

export const apiPost = {
  register: ({ fullName, email, password }) => {
    return axios.post(`${BASE_URL}/rest-auth/registration/`, {
      email: email,
      full_name: fullName,
      password1: password,
      password2: password,
    })
  },
  login: ({ email, password }) => {
    return axios.post(`${BASE_URL}/rest-auth/login/`, {
      email,
      password,
    })
  },
  subscribeMail: value => {
    return axios.post(`${BASE_URL}/api/subscribe`, { email: value })
  },
  sendAnswer: ({ authorId, questionId, editor, description, repoUrl, stackBlitzTemplate, fs, dependencies }) => {
    return axios.post(`${BASE_URL}/api/answers`, {
      author: authorId,
      question: questionId,
      editor: editor,
      description: description,
      repository_url: repoUrl,
      stackblitz_template: stackBlitzTemplate,
      fs,
      dependencies,
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
  sendQuestion: ({ author, title, description, tags, editor, repoUrl, fs, dependencies, stackBlitzTemplate }) => {
    console.log('[sendQuestion]', { stackBlitzTemplate })
    return axios.post(`${BASE_URL}/api/questions`, {
      title: title,
      author: author,
      description: description,
      tags: tags,
      editor: editor,
      repository_url: repoUrl,
      stackblitz_template: stackBlitzTemplate,
      fs,
      dependencies,
    })
  },
  reportComment: (userId, type, commentId) => {
    return axios.post(`${BASE_URL}/api/comments/${commentId}/report`, {
      comment_type: type,
      user_id: userId,
      is_report: 'true',
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
  updateAnswerScore: (type, answerId, userId) => {
    return axios.put(`${BASE_URL}/api/answers/${answerId}/vote`, {
      is_upvote: type,
      user_id: userId,
    })
  },
  updateCommentScore: (isUpvote, userId, type, commentId) => {
    return axios.put(`${BASE_URL}/api/comments/${commentId}/vote`, {
      is_upvote: isUpvote,
      user_id: userId,
      comment_type: type,
    })
  },
  updateUser: (data, id) => {
    return axios.put(`${BASE_URL}/api/users/${id}`, data)
  },
}
