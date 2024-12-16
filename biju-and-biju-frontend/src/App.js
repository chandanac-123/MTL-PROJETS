import "./App.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import React, { lazy, Suspense, useEffect } from "react";
import ForgotPassword from "./Screens/ForgotPassword";
import ResetPassword from "./Screens/ResetPassword";
import PrivacyPolicy from "./Screens/PrivacyPolicy";

const Navigation = lazy(() => import("./Routes/Navigation"));
const SignIn = lazy(() => import("./Screens/SignIn.js"));
function App() {
  return (
    <Suspense
      fallback={
        <Box>
          <CircularProgress />
        </Box>
      }
    >
      <Router>
        <Switch>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/*" element={<Navigation />} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;

const Box = styled.div`
  width: 100%;
  height: 80vh;
  /* width: 96%; */
  display: grid;
  place-items: center;
`;
