import { configureStore } from "@reduxjs/toolkit"
import projectsReducer from "./slices/projectsSlice"
import applicationsReducer from "./slices/applicationsSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    applications: applicationsReducer,
    user: userReducer,
  },
})
