// import { createSlice } from "@reduxjs/toolkit";

// const userData = JSON.parse(localStorage.getItem("userdata")) || null;
// const token = JSON.parse(localStorage.getItem("token")) || null;
// const spotifyToken = JSON.parse(localStorage.getItem("spotifytoken")) || null;

// const initialState = {
//   token,
//   spotifyToken,
//   isLoggedIn: !!token,
//   userData: userData,
//   isSidebarOpen: false,
//   storyInfo: { name: null, id: null },
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.token = action.payload.token;
//       localStorage.setItem("token", JSON.stringify(action.payload.token));
//       state.spotifyToken = action.payload.spotifyToken.access_token;
//       localStorage.setItem(
//         "spotifytoken",
//         JSON.stringify(action.payload.spotifyToken.access_token)
//       );
//       state.isLoggedIn = true;
//       state.userData = action.payload;
//       localStorage.setItem("userData", JSON.stringify(action.payload)); // Save userData to localStorage
//     },
//     logout: (state, action) => {
//       state.token = null;
//       state.spotifyToken = null;
//       state.userData = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("spotifytoken");
//       localStorage.removeItem("userdata");
//       state.isLoggedIn = false;
//     },
//     setUserProfile: (state, action) => {
//       state.userData = action.payload;
//       localStorage.setItem("userdata", JSON.stringify(action.payload));
//     },
//     updateUserProfile: (state, action) => {
//       state.userData = { ...state.userData, ...action.payload };
//       localStorage.setItem("userdata", JSON.stringify(state.userData));
//     },

//     toggleLanguageSelection: (state, action) => {
//       const langugageId = action.payload;
//       const index = state.userData.languages.indexOf(langugageId);
//       if (index === -1) {
//         state.userData.languages.push(langugageId);
//       } else {
//         state.userData.languages.splice(index, 1);
//       }
//       const updatedData = { ...userData, languages: state.userData.languages };
//       localStorage.setItem("userdata", JSON.stringify(updatedData));
//     },
//     toggleSidebar: (state) => {
//       state.isSidebarOpen = !state.isSidebarOpen;
//     },
//     setStoryInfo: (state, action) => {
//       (state.storyInfo.id = action.payload.s_id),
//         (state.storyInfo.name = action.payload.s_name);
//     },
//     updateSpotifyToken: (state, action) => {
//       state.spotifyToken = action.payload.spotifyToken.access_token;
//       localStorage.setItem(
//         "spotifytoken",
//         JSON.stringify(action.payload.spotifyToken.access_token)
//       );
//     },
//   },
// });

// export const {
//   login,
//   logout,
//   setUserProfile,
//   updateUserProfile,
//   toggleLanguageSelection,
//   toggleSidebar,
//   setStoryInfo,
//   updateSpotifyToken,
// } = authSlice.actions;

// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash"; // For deep merging

// Load initial state from localStorage
const userData = JSON.parse(localStorage.getItem("userData")) || null;
const token = JSON.parse(localStorage.getItem("token")) || null;
const spotifyToken = JSON.parse(localStorage.getItem("spotifytoken")) || null;

const initialState = {
  token,
  spotifyToken,
  isLoggedIn: !!token,
  userData: userData,
  isSidebarOpen: false,
  storyInfo: { name: null, id: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      try {
        state.token = action.payload.token;
        localStorage.setItem("token", JSON.stringify(action.payload.token));

        if (action.payload.spotifyToken) {
          state.spotifyToken = action.payload.spotifyToken.access_token;
          localStorage.setItem(
            "spotifytoken",
            JSON.stringify(action.payload.spotifyToken.access_token)
          );
        }

        state.isLoggedIn = true;
        state.userData = action.payload;
        localStorage.setItem("userData", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save data to localStorage:", error);
      }
    },
    logout: (state) => {
      try {
        state.token = null;
        state.spotifyToken = null;
        state.userData = null;
        localStorage.removeItem("token");
        localStorage.removeItem("spotifytoken");
        localStorage.removeItem("userData");
        state.isLoggedIn = false;
      } catch (error) {
        console.error("Failed to remove data from localStorage:", error);
      }
    },
    setUserProfile: (state, action) => {
      try {
        state.userData = action.payload;
        localStorage.setItem("userData", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save user profile to localStorage:", error);
      }
    },
    updateUserProfile: (state, action) => {
      try {
        state.userData = merge({}, state.userData, action.payload); // Deep merge
        localStorage.setItem("userData", JSON.stringify(state.userData));
      } catch (error) {
        console.error("Failed to update user profile in localStorage:", error);
      }
    },
    toggleLanguageSelection: (state, action) => {
      try {
        const languageId = action.payload;
        const index = state.userData.languages.indexOf(languageId);
        if (index === -1) {
          state.userData.languages.push(languageId);
        } else {
          state.userData.languages.splice(index, 1);
        }
        localStorage.setItem("userData", JSON.stringify(state.userData));
      } catch (error) {
        console.error(
          "Failed to update language selection in localStorage:",
          error
        );
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setStoryInfo: (state, action) => {
      state.storyInfo.id = action.payload.s_id;
      state.storyInfo.name = action.payload.s_name;
    },
    updateSpotifyToken: (state, action) => {
      try {
        state.spotifyToken = action.payload.spotifyToken.access_token;
        localStorage.setItem(
          "spotifytoken",
          JSON.stringify(action.payload.spotifyToken.access_token)
        );
      } catch (error) {
        console.error("Failed to update Spotify token in localStorage:", error);
      }
    },
  },
});

export const {
  login,
  logout,
  setUserProfile,
  updateUserProfile,
  toggleLanguageSelection,
  toggleSidebar,
  setStoryInfo,
  updateSpotifyToken,
} = authSlice.actions;

export default authSlice.reducer;
