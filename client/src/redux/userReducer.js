import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
        loading: false,
        error: false
    },
    reducers: {
        addCour: (state, { payload }) => {
            state.currentUser.cour.push(payload);
        },
        setUser: (state, { payload }) => {
            state.currentUser = payload;
        },
        loginStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, { payload }) => {
            state.currentUser = payload;
            state.loading = false;
            state.error = false;
        },
        loginError: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
    }
})

export const { loginStart, loginSuccess, loginError, logout, addCour, setUser } = userSlice.actions;

export default userSlice.reducer;