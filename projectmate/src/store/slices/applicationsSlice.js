import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock API calls
const fetchApplications = createAsyncThunk("applications/fetchApplications", async (_, { rejectWithValue }) => {
  try {
    // This would be an API call in a real app
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([])
      }, 1000)
    })
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const createApplication = createAsyncThunk(
  "applications/createApplication",
  async (applicationData, { rejectWithValue }) => {
    try {
      // This would be an API call in a real app
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: Date.now().toString(), ...applicationData, status: "pending" })
        }, 1000)
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    userApplications: [],
    currentApplication: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false
        state.applications = action.payload
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createApplication.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false
        state.applications.push(action.payload)
        state.userApplications.push(action.payload)
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setCurrentApplication } = applicationsSlice.actions
export { fetchApplications, createApplication }
export default applicationsSlice.reducer
