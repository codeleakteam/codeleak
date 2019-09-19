import axios from './axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const BASE_URL = publicRuntimeConfig.baseUrl

export const apiGet = {
  getIndex: page => {
    return axios.get(`${BASE_URL}/api/home`, {
      params: {
        page,
      },
    })
  },
  getQuestion: ({ questionID }) => {
    return axios.get(`${BASE_URL}/api/questions/${questionID}`)
  },
  getTags: ({ q }) => {
    return axios.get(`${BASE_URL}/api/tags?q=${q}`)
  },
  getMostHelpfulUsers: () => {
    return axios.get(`${BASE_URL}/api/users/most_helpful`)
  },
  getUserProfile: ({ userID, token }) => {
    return axios.get(`${BASE_URL}/api/users/${userID}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },
  getNotifications: ({ userID, token }) => {
    return axios.get(`${BASE_URL}/api/notifications/${userID}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
  },
  getUnreadNotifications: userId => axios.get(`${BASE_URL}/api/notifications/${userId}/unread`),
  markAllAsRead: ({ userID, token }) =>
    axios.put(
      `${BASE_URL}/api/notifications/${userID}/mark_all_as_read`,
      {},
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    ),
  searchQuery: q =>
    axios.get(`${BASE_URL}/api/search`, {
      params: {
        q,
      },
    }),
  getTagList: () => axios.get(`${BASE_URL}/api/tags`),
}

export const apiPost = {
  register: ({ username, email, password }) => {
    return axios.post(`${BASE_URL}/rest-auth/registration/`, {
      email,
      username,
      password1: password,
      password2: password,
    })
  },
  login: ({ email, password }) => {
    return axios.post(
      `${BASE_URL}/rest-auth/login/`,
      {
        email,
        password,
      },
      {
        headers: {
          Authorization: undefined,
        },
      }
    )
  },
  subscribeMail: value => {
    return axios.post(`${BASE_URL}/api/subscribe`, { email: value })
  },
  sendAnswer: ({ authorId, questionId, editor, description, repoUrl, stackBlitzTemplate, fs, dependencies, token }) => {
    return axios.post(
      `${BASE_URL}/api/answers`,
      {
        author: authorId,
        question: questionId,
        editor: editor,
        description: description,
        repository_url: repoUrl,
        stackblitz_template: stackBlitzTemplate,
        fs,
        dependencies,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
  },
  sendComment: (type, object_id, authorId, content, token) => {
    return axios.post(
      `${BASE_URL}/api/comments`,
      {
        comment_type: type,
        object_id: object_id,
        author: authorId,
        content: content,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
  },
  sendQuestion: ({
    author,
    title,
    description,
    tags,
    editor,
    repoUrl,
    fs,
    dependencies,
    stackBlitzTemplate,
    token,
  }) => {
    return axios.post(
      `${BASE_URL}/api/questions`,
      {
        title: title,
        author: author,
        description: description,
        tags: tags,
        editor: editor,
        repository_url: repoUrl,
        stackblitz_template: stackBlitzTemplate,
        fs,
        dependencies,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
  },
  reportComment: (userId, type, commentId, token) => {
    return axios.post(
      `${BASE_URL}/api/comments/${commentId}/report`,
      {
        comment_type: type,
        user_id: userId,
        is_report: 'true',
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
  },
}

export const apiPut = {
  updateQuestionScore: ({ type, questionId, userID, token }) => {
    return axios.put(
      `${BASE_URL}/api/questions/${questionId}/vote`,
      {
        is_upvote: type,
        user_id: userID,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
  },
  updateAnswerScore: (type, answerId, userId, token) => {
    return axios.put(
      `${BASE_URL}/api/answers/${answerId}/vote`,
      {
        is_upvote: type,
        user_id: userId,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
  },
  updateCommentScore: (isUpvote, userId, type, commentId, token) => {
    return axios.put(
      `${BASE_URL}/api/comments/${commentId}/vote`,
      {
        is_upvote: isUpvote,
        user_id: userId,
        comment_type: type,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    )
  },
  updateUser: (data, id, token) => {
    return axios.put(`${BASE_URL}/api/users/${id}/edit`, data, {
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
