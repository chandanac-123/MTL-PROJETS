import Auth from '../Screens/Authentictaion/Auth';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { routes } from './Routes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MasterLayout from '../Layout/MasterLayout';
import TermsAndConditions from '../Screens/CompanyPolicy/TermsAndConditions';
import PrivacyPolicy from '../Screens/CompanyPolicy/PrivacyPolicy';
import LandingPage from '../Screens/LandingPage';

const Index = () => {
  return (
    <Routes>
      <Route path={'terms-conditions'} element={<TermsAndConditions />} />
      <Route path={'privacy-policy'} element={<PrivacyPolicy />} />
      <Route path={'download'} element={<LandingPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MasterLayout />}>
          {routes?.map((item) => {
            if (item?.permission && item?.privetRoute) {
              if (item?.subMenu) {
                return item?.subMenu?.map((sub) => {
                  return <Route key={uuidv4()} path={sub.path} element={<sub.component />} />;
                });
              } else {
                return <Route key={uuidv4()} path={item?.path} element={<item.component />} />;
              }
            }
          })}
        </Route>
      </Route>

      <Route element={<PublicRoute />}>
        {routes?.map((item, index) => {
          if (!item?.privetRoute) {
            return (
              <Route key={index} element={<Auth />}>
                <Route key={uuidv4()} path={item?.path} element={<item.component />} />
              </Route>
            );
          }
        })}
      </Route>
    </Routes>
  );
};

export default Index;
