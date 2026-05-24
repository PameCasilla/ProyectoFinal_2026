import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch } from 'react-router-dom';
import AuthNavbar from '../components/Common/Navbars/AuthNavbar.js';
import Footer from '../components/Common/Footer/Footer.js';
import { routes } from "./auth.routes";

let ps;

export const AuthLayout = () => {
  const fullPages = React.useRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(fullPages.current);
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
    };
  });
  const getRoutes = routes =>
    routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/auth') {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    });
  return (
    <>
      <AuthNavbar />
      <div className="wrapper wrapper-full-page" ref={fullPages}>
        <div className="full-page section-image">
          <Switch>{getRoutes(routes)}</Switch>
          <Footer fluid />
        </div>
      </div>
    </>
  );
}
