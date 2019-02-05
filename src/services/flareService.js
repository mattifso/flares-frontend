import axios from 'axios'
const baseUrl = '/api/flares'

const getFlares = async (year) => {
  const response = await axios.get(`${baseUrl}/year/${year}`)
  return response.data
}

export default { getFlares }