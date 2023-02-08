import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
const initialState = {
  //! When user click submit, submit button will be disabeled...
  isLoading: false,
  user: null,
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
    console.log(`Login user : ${JSON.stringify(user)}`)
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      toast.success(`Hello There ${user.name} `)
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export default userSlice.reducer
