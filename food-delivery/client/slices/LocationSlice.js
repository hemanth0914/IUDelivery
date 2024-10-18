import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        latitude: null,
        longitude: null,
        streetName: ' ',
        errorMessage: null,
    },
    reducers: {
        setUserLocation: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
            state.streetName = action.payload.streetName;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const { setUserLocation, setErrorMessage } = locationSlice.actions;
export const selectUserLocation = (state) => state.location;

export default locationSlice.reducer;
