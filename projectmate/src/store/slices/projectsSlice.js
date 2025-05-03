import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock API calls
const fetchProjects = createAsyncThunk("projects/fetchProjects", async (_, { rejectWithValue }) => {
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

const createProject = createAsyncThunk("projects/createProject", async (projectData, { rejectWithValue }) => {
  try {
    // This would be an API call in a real app
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: Date.now().toString(), ...projectData })
      }, 1000)
    })
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    userProjects: [],
    currentProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false
        state.projects.push(action.payload)
        state.userProjects.push(action.payload)
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setCurrentProject } = projectsSlice.actions
export { fetchProjects, createProject }
export default projectsSlice.reducer
