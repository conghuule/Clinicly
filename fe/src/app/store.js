import { configureStore } from '@reduxjs/toolkit';
import patientReducer from '../redux/patient/slice';
import medicineReducer from '../redux/medicine/slice';

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    medicine: medicineReducer,
  },
});
