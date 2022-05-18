/* eslint-disable no-unused-expressions */
import axios from 'axios'
import request from '@/utils/request'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? request.baseURL.dev
    : request.baseURL.pro

class HttpRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      header: {}
    }
    return config
  }

  interceptors(instance) {
    instance.interceptors.request.use(
      function (config) {
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    const instance = axios.create()
    options = {
      ...this.getInsideConfig(),
      ...options
    }
    this.interceptors(instance)
    return instance(options)
  }
}
export default new HttpRequest(baseURL)
