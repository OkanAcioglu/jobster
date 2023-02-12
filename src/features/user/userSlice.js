import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorage'
import { registerUserThunk, loginUserThunk, updateUserThunk } from './userThunk'

const initialState = {
  //! When user click submit, submit button will be disabeled...
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
}

// export const registerUser = createAsyncThunk(
//   'user/registerUser',
//   async (user, thunkAPI) => {
//     //console.log(`Register user : ${JSON.stringify(user)}`)
//     try {
//       const resp = await customFetch.post('/auth/register', user)
//       //console.log(resp)
//       return resp.data
//     } catch (err) {
//       //toast.error(err.response.data.msg)
//       //console.log(err.response)
//       return thunkAPI.rejectWithValue(err.response.data.msg)
//     }
//   }
// )
//! We refactor the above code and create below. Functionality coming from userThunk.js and now code is little bit cleaner...
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
  }
)

// export const loginUser = createAsyncThunk(
//   'user/loginUser',
//   async (user, thunkAPI) => {
//     //console.log(`Register user : ${JSON.stringify(user)}`)
//     try {
//       const resp = await customFetch.post('/auth/login', user)
//       //console.log(resp)
//       return resp.data
//     } catch (err) {
//       //toast.error(err.response.data.msg)
//       //console.log(err.response)
//       return thunkAPI.rejectWithValue(err.response.data.msg)
//     }
//   }
// )
//! We refactor the above code and create below. Functionality coming from userThunk.js and now code is little bit cleaner...
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI)
  }
)

// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async (user, thunkAPI) => {
//     try {
//       const resp = await customFetch.patch('auth/updateUser', user, {
//         headers: {
//           authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//         },
//       })
//       return resp.data
//     } catch (err) {
//       console.log(err.response)
//       //! In case of logging out user when there is a not authorization error, below code can be used...
//       // if (err.response.status === 401) {
//       //   thunkAPI.dispatch(loginUser())
//       //   return thunkAPI.rejectWithValue(err.response.data.msg)
//       // }
//       return thunkAPI.rejectWithValue(err.response.data.msg)
//     }
//   }
// )
//! We refactor the above code and create below. Functionality coming from userThunk.js and now code is little bit cleaner...
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI)
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: (state, { payload }) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
      if (payload) {
        toast.success(payload)
      }
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
    [updateUser.pending]: (state) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`User Updated!`)
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})
export const { toggleSidebar, logoutUser } = userSlice.actions
export default userSlice.reducer
