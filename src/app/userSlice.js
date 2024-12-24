import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    profilePic: '',
    ageGroup: '',
    gender: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.name = action.payload.name || state.name;
            state.email = action.payload.email || state.email;
            state.profilePic = action.payload.profilePic || state.profilePic;
        },
        setAgeGroup: (state, action) => {
            state.ageGroup = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        logout: () => initialState,
    },
});

export const { setUserData, setAgeGroup, setGender, logout } = userSlice.actions;
export default userSlice.reducer;
