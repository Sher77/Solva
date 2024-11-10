import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
  data: { [key: string]: any };
  type: string;
  id: string;
}

const initialState: CardState = {
  data: {},
  type: '',
  id: '',
};

export const CardSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearState: (state) => {
      state.data = {};
      state.type = '';
      state.id = '';
    },
  },
});

export const { setData, setType, setId, clearState } = CardSlice.actions;

export default CardSlice.reducer;
