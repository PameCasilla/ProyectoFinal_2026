/*!

=========================================================
* Paper Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from 'react';
import { Container, Row } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';
import logo from '../../../assets/img/logo3.svg';
function Footer(props) {
  return (
    <footer className={'footer' + (props.default ? ' footer-default' : '')}>
      <Container fluid={props.fluid ? true : false}>
        <Row>
          <div className="credits ml-auto">
            <span className="copyright">
              &copy; {1900 + new Date().getYear()}, made with{' '}
              <img 
                className="animated-icon" 
                src={logo}
                style={{width: 20}}
              ></img> {' '}by Workffice
            </span>
            {/* <i className="fa fa-heart heart" /> */}
          </div>
        </Row>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
