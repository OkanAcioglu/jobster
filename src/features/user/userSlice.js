import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorage'

const initialState = {
  //! When user click submit, submit button will be disabeled...
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    //console.log(`Register user : ${JSON.stringify(user)}`)
    try {
      const resp = await customFetch.post('/auth/register', user)
      //console.log(resp)
      return resp.data
    } catch (err) {
      //toast.error(err.response.data.msg)
      //console.log(err.response)
      return thunkAPI.rejectWithValue(err.response.data.msg)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    //console.log(`Register user : ${JSON.stringify(user)}`)
    try {
      const resp = await customFetch.post('/auth/login', user)
      //console.log(resp)
      return resp.data
    } catch (err) {
      //toast.error(err.response.data.msg)
      //console.log(err.response)
      return thunkAPI.rejectWithValue(err.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`Hello There ${user.name} `)
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`Welcome Back ${user.name} `)
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})
export const { toggleSidebar } = userSlice.actions
export default userSlice.reducer
