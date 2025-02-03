import { createSlice } from '@reduxjs/toolkit'
import getUsers from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await getUsers()
    dispatch(setUser(users))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
