import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  //! When user click submit, submit button will be disabeled...
  isLoading: false,
  user: null,
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    console.log(`Register user : ${JSON.stringify(user)}`)
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
