import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { initializeUsers } from './usersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state
        .map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      const newBlog_withUser = { ...newBlog, user: blog.user }
      dispatch(appendBlog(newBlog_withUser))
      dispatch(initializeUsers())
      return { success: true, blog: newBlog_withUser }
    } catch (error) {
      return { success: false, error: error.response.data.error }
    }
  }
}

export const updateExistingBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      dispatch(updateBlog(updatedBlog))
      dispatch(initializeUsers())
      return { success: true, blog: updatedBlog }
    } catch (error) {
      return { success: false, error: error.response.data.error }
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      const result = await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(initializeUsers())
      return { success: true, blog: result }
    } catch (error) {
      return { success: false, error: error.response.data.error }
    }
  }
}

export const addComment = (blogId, newComment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.createComment(blogId, newComment)
      dispatch(updateBlog(updatedBlog))
      dispatch(initializeUsers())
      return { success: true, blog: updatedBlog }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to add comment'
      }
    }
  }
}

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
