import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import commonReducer from "../Slices/commonSlice";
import userActionsReducer from "../Slices/userActions";
import verificationReducer from "../Slices/verificationSlice";
import assignedVerificationReducer from "../Slices/assignedVerificationSlice";
import reportReceivedReducer from "../Slices/reportReceivedSlice";
import reportSubmittedReducer from "../Slices/reportSubmittedSlice";
import reportEditReducer from "../Slices/reportEditSlice";
import reportConfirmReducer from "../Slices/reportConfirmSlice";
import databaseReducer from "../Slices/databaseSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    userActions: userActionsReducer,
    verification: verificationReducer,
    assignedVerification: assignedVerificationReducer,
    reportReceived: reportReceivedReducer,
    reportSubmitted: reportSubmittedReducer,
    reportEdit: reportEditReducer,
    reportConfirm: reportConfirmReducer,
    database: databaseReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  // devTools: false,
});
