import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
//import customFetch from '../../utils/axios'
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk'

//! Used when going back to defaults
const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  getAllJobsThunk
  // async (_, thunkAPI) => {
  //   const { page, search, searchStatus, searchType, sort } =
  //     thunkAPI.getState().allJobs

  //   let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
  //   if (search) {
  //     url = url + `&search=${search}`
  //   }

  //   try {
  //     const resp = await customFetch.get(url)
  //     //console.log(resp.data)
  //     return resp.data
  //   } catch (error) {
  //     return thunkAPI.rejectWithValue('There is a error...')
  //   }
)

export const showStats = createAsyncThunk(
  'allJobs/showStats',
  showStatsThunk

  // async (_, thunkAPI) => {
  //   try {
  //     const resp = await customFetch.get('/jobs/stats')
  //     //console.log(resp.data)
  //     return resp.data
  //   } catch (error) {
  //     return thunkAPI.rejectWithValue(error.response.data.msg)
  //   }
  // }
)

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState }
    },
    changePage: (state, { payload }) => {
      state.page = payload
    },
    clearAllJobsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jobs = payload.jobs
        state.numOfPages = payload.numOfPages
        state.totalJobs = payload.totalJobs
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default allJobsSlice.reducer
export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions
