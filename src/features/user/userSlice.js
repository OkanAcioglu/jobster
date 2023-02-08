import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  //! When user click submit, submit button will be disabeled...
  isLoading: false,
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
})

export default userSlice.reducer
