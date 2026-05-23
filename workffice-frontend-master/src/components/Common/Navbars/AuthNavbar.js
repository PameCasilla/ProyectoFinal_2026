import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from 'reactstrap';
import logo from '../../../assets/img/Recurso 6.png';

// reactstrap components

function AuthNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [color, setColor] = React.useState('navbar-transparent');
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  const toggleCollapse = () => {
    if (!collapseOpen) {
      setColor('bg-white');
    } else {
      setColor('navbar-transparent');
    }
    setCollapseOpen(!collapseOpen);
  };
  return (
    <Navbar
      className={classnames('navbar-absolute fixed-top', color)}
      expand="lg">
      <Container>
        <div className="navbar-wrapper">
          <NavbarBrand href="#" onClick={e => e.preventDefault()}>
            <img src={logo} />
          </NavbarBrand>
        </div>
        <button
          aria-controls="navigation-index"
          aria-expanded={false}
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-toggle="collapse"
          type="button"
          onClick={toggleCollapse}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </button>
        <Collapse isOpen={collapseOpen} className="justify-content-end" navbar>
          <Nav navbar>
            <NavItem>
              <NavLink to="/auth/register" className="nav-link">
                <i className="fa fa-user-plus" />
                Creemos tu cuenta
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/auth/login" className="nav-link">
                <i className="fa fa-user" />
                Iniciar Sesion
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/auth/recovery-password" className="nav-link">
                <i className="fa fa-key" />
                Recuperar Contraseña
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default AuthNavbar;
