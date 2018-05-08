import { Map } from 'immutable'
import fetch from 'isomorphic-fetch'

let urlMap = Map()

const get = url =>
  () => {
    const currentPromise = urlMap.get(url)
    if (currentPromise) return new Promise(() => { })
    const headers = {
      'Content-Type': 'application/json',
    }

    const payload = {
      method: 'GET',
      headers,
    }
    const promise = new Promise((resolve, reject) => {
      fetch(url, payload)
        .then(response => {
          processResponse(resolve, reject, response, url)
        })
        .catch(error => {
          reject(error)
        })

    })

    setUrlPromiseMap(url, promise)
    return promise
  }

const requestWithBody = (url, body, method) =>
  () => {
    const currentPromise = urlMap.get(url)
    if (currentPromise) return new Promise(() => { })

    const headers = {
      'Content-Type': 'application/json',
    }

    const payload = {
      method,
      headers,
      body: JSON.stringify(body),
    }

    const promise = new Promise((resolve, reject) => {
      fetch(url, payload)
        .then(response => {
          processResponse(resolve, reject, response, url)
        })
        .catch(error => {
          reject(error)
        })
    })

    setUrlPromiseMap(url, promise)
    return promise
  }

const setUrlPromiseMap = (url, promise) => {
  urlMap = urlMap.set(url, promise)
}

const clearPromiseForUrl = url => {
  urlMap = urlMap.delete(url)
}

const getResponse = (response) => {
  return response.status === 204 ? Promise.resolve('') : response.json()
}

const processResponse = (resolve, reject, response, url) => {
  if (response.ok) {
    clearPromiseForUrl(url)
    resolve(getResponse(response))
  } else {
    processError(response, error => {
      clearPromiseForUrl(url)
      reject(error)
    })
  }
}

const getErrorMessage = error => {
  if (error.error) return error.error
  if (error.message) return error.message

  return String(error)
}

const processError = (response, reject) => {
  if (response.status === 401) {
    // do something
  }
  return response.text()
    .then(error => JSON.parse(error))
    .then(error => {
      reject(getErrorMessage(error))
    })
}


export default {
  get,
  post: (url, body) => requestWithBody(url, body, 'POST'),
}