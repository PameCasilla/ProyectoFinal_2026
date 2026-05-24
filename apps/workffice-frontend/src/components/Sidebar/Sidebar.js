
import PerfectScrollbar from "perfect-scrollbar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { Badge, Collapse, Nav } from "reactstrap";
import { invalidateSession, readFromLocalStorage, USER_TYPE } from "../../infra/api/localStorage";
import { successLogout } from "../../stores/actions/auth/logoutActions";
import { getOfficeBranch } from "../../stores/actions/backoffice/officeBranch/officeBranchAdminActions";
import { Cloudinary } from "../Common/Cloudinary/Cloudinary";


var ps;

function Sidebar(props) {
  const role = readFromLocalStorage(USER_TYPE);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (role !== "RENTER") {
      dispatch(getOfficeBranch(readFromLocalStorage("officeBranch").id));
    }
  }, [dispatch]);
  const officeBranch = useSelector(state => state.officeBranch);



  const [logout, setLogout] = React.useState(false)
  const [openAvatar, setOpenAvatar] = React.useState(false);
  const [collapseStates, setCollapseStates] = React.useState({});
  const sidebar = React.useRef();
  // this creates the intial state of this component based on the collapse routes
  // that it gets through props.routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse && prop.visibility) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return false;
      } else if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };

  const doLogout = () => {
    setLogout(true);
  };

  // LOGOUT
  React.useEffect(() => {
    if (logout) {
      invalidateSession();
      dispatch(successLogout());
      history.replace('/auth/login')
    }
  }, [logout, history])

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse && prop.visibility) {
        var st = {};
        st[prop["state"]] = !collapseStates[prop.state];
        return (
          <li
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={collapseStates[prop.state]}
              onClick={(e) => {
                e.preventDefault();
                setCollapseStates(st);
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={collapseStates[prop.state]}>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        prop.visibility && <li className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink to={prop.layout + prop.path} activeClassName="">
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </NavLink>
        </li>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      // we need to destroy the false scrollbar when we navigate
      // to a page that doesn't have this component rendered
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  React.useEffect(() => {
    setCollapseStates(getCollapseStates(props.routes));
  }, []);
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <p
          className="simple-text logo-normal"
        >
          {role !== "RENTER" && <span style={{ fontFamily: 'Poppins', }}>Sucursal: <br /><small className="text-right lead" >{officeBranch ? officeBranch.name : ""}</small></span>}
        </p>
      </div>

      <hr />
      <div className="sidebar-wrapper" ref={sidebar}>
        <div className="user">
          <div className="photo">
            <Cloudinary publicId={props.user ? props.user.profileImage : ""} />
            {/* <img src={avatar} alt="Avatar" /> */}
          </div>
          <div className="info" >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={openAvatar}
              onClick={() => setOpenAvatar(!openAvatar)}
            >
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                {props.user ? `${props.user.name || 'Username'} ${props.user.lastname || ''}` : ""}
                <br />
                <Badge
                  color={props.user?.userType === "RENTER" ? "info" : props.user?.userType === "COLLABORATOR" ? "warning" : "success"}
                  pill style={{width: '68%'}}>
                  {props.user?.userType === "RENTER" ?
                    "Inquilino" :
                    props.user?.userType ===
                      "COLLABORATOR" ?
                      "Colaborador" :
                      "Dueño de oficina"}
                </Badge>

                <b className="caret" />
              </span>
            </a>
            <Collapse isOpen={openAvatar}>
              <ul className="nav">
                <li>
                  <NavLink to="/admin/user-profile" activeClassName="">
                    <span className="sidebar-mini-icon">MP</span>
                    <span className="sidebar-normal">Mi perfil</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='#' activeClassName="">
                    <span className="sidebar-mini-icon">CS</span>
                    <span className="sidebar-normal" onClick={doLogout}>Cerrar sesion</span>
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </div>
        </div>
        <Nav>{createLinks(props.routes)}</Nav>
      </div>
    </div>
  );
}

export default Sidebar;
