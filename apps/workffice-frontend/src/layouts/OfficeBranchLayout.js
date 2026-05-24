// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from "./office-branch.routes";


let ps;

export const OfficeBranchLayout = () => {
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
            if (prop.layout === '/office-branch') {
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
            <div className="wrapper wrapper-full-page" ref={fullPages}>
                <div className="full-page section-image">
                    <Switch>{getRoutes(routes)}</Switch>
                </div>
            </div>
        </>
    );
}
