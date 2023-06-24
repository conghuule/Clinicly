import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import medicineApi from '../../services/medicineApi';
const PREFIX = 'medicine/';

const initialState = {
  list: [],
};

export const getAllMedicines = createAsyncThunk(`${PREFIX}getAllMedicines`, async (_) => {
  const response = await medicineApi.getAll();
  return response.data;
});

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMedicines.fulfilled, (state, action) => {
        console.log('action: ', action);
        state.list = action.payload;
      })
      .addDefaultCase((state, action) => {
        console.log(`action type ${action.type}`, current(state));
      });
  },
});

export default medicineSlice.reducer;
