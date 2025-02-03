import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLoginstate(state, action) {
      return action.payload
    }
  }
})

export const { setLoginstate } = userSlice.actions
export default userSlice.reducer
