import axios from 'axios'
const baseUrl = 'http://localhost:3001/contacts'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(result =>  result.data)
}

const create = newContact => {
  return axios
    .post(baseUrl, newContact)
    .then(result => result.data)
}

const update = (id, contact) => {
  return axios
    .put(`${baseUrl}/${id}`, contact)
    .then(result => result.data)
}

const remove = id => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(result => result.data)
}

export default {getAll, create, update, remove}