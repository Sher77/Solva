import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  userName: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; password: string }>) {
      const { name, password } = action.payload;

      if (name === 'test' && password === 'password') {
        state.isLoggedIn = true;
        state.userName = name;
      } else {
        state.isLoggedIn = false;
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
