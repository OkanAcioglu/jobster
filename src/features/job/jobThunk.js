import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice'
import customFetch from '../../utils/axios'
import { clearValues } from './jobSlice'
import authHeader from '../../utils/authHeader'

// const authHeader = (thunkAPI) => {
//   return {
//     headers: {
//       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//     },
//   }
// }

// export const createJobThunk = async (job, thunkAPI) => {
//   try {
//     // const resp = await customFetch.post('/jobs', job, {
//     //   headers: {
//     //     authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//     //   },
//     // })
//     const resp = await customFetch.post('/jobs', job, authHeader(thunkAPI))

//     thunkAPI.dispatch(clearValues())
//     return resp.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.msg)
//   }
// }

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job)

    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`)
    thunkAPI.dispatch(getAllJobs())
    return resp.data.msg
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job)
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
