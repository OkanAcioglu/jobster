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
      const resp = await customFetch.post('/auth/testingRegister', user)
      console.log(resp)
    } catch (err) {
      toast.error(err.response.data.msg)
      console.log(err.response)
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
})

export default userSlice.reducer
