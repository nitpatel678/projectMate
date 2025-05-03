import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock API calls
const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async (userId, { rejectWithValue }) => {
  try {
    // This would be an API call in a real app
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: userId,
          name: "John Doe",
          email: "john@example.com",
          avatar: "/placeholder-avatar.png",
          bio: "Full-stack developer with 5 years of experience",
          skills: ["React", "Node.js", "MongoDB"],
          location: "New York, USA",
          website: "https://example.com",
          github: "johndoe",
          linkedin: "johndoe",
        })
      }, 1000)
    })
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const updateUserProfile = createAsyncThunk("user/updateUserProfile", async (userData, { rejectWithValue }) => {
  try {
    // This would be an API call in a real app
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userData)
      }, 1000)
    })
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export { fetchUserProfile, updateUserProfile }
export default userSlice.reducer
