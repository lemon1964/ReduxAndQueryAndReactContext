import axios from 'axios'

const baseUrl = '/api/users'

const getUsers = async () => axios.get(baseUrl).then((res) => res.data)

export default getUsers
