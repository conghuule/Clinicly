import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import patientApi from '../../services/patientApi';
const PREFIX = 'patient/';

const initialState = {
  list: [],
};

export const getAllPatients = createAsyncThunk(`${PREFIX}getAllPatients`, async (_) => {
  try {
    const response = await patientApi.getAll();
    return response.data;
  } catch (error) {
    console.log('error: ', error);
  }
});

export const updatePatient = createAsyncThunk(`${PREFIX}updatePatient`, async ({ id, body }) => {
  try {
    console.log('patient: ', id, body);
    await patientApi.update(id, body);
  } catch (error) {
    console.log('error: ', error);
  }
});

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPatients.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addDefaultCase((state, action) => {
        console.log(`action type ${action.type}`, current(state));
      });
  },
});

export default patientSlice.reducer;
