import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  name: ""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.name = "";
    },
    setName: (state, action) =>{
        state.name = action.payload;
    }
     
  },
});

export const { setToken, clearToken, setName } = authSlice.actions;
export default authSlice.reducer;
