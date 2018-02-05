import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  return axios.get(baseUrl)
}

const create = async (person) => {
  return axios.post(baseUrl, person)
}

const update = async (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person)
}

const remove = async (id) => {
  try {
    return await axios.delete(`${baseUrl}/${id}`)
  } catch (err) {
    return { status: err.response.status }
  }
}

export default { getAll, create, update, remove }
