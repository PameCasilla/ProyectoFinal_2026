import { max, min } from 'lodash-es';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Cloudinary } from '../Common/Cloudinary/Cloudinary';

export const OfficeBranchCard = ({ branch }) => {
  const firstImage = branch?.images?.[0];
  const imagePublicId = typeof firstImage === 'string' ? firstImage : firstImage?.url;

  const cheapestPrice = offices => {
    const prices = offices.map(office => office.price)
    return min(prices)
  }

  const mostExpensivePrice = offices => {
    const prices = offices.map(office => office.price)
    return max(prices)
  }

  return (
    <>
      {branch &&
        <Link to={`/admin/office-branch?id=${branch.id}`} style={{ color: 'white', textDecoration: 'none' }}>
          <Card>
            <CardBody>
              <Cloudinary className="office-branch-card-image" publicId={imagePublicId} />
              <div className="office-branch-card-title">
                <h5>
                  <small>{branch.name}</small>
                </h5>
                <i className="fa fa-building" />
              </div>
              <Row>
                <Col>
                  <div>
                    <p><b>Desde</b> {branch.offices && branch.offices.length > 0 ? `$ ${cheapestPrice(branch.offices)}/hs` : "$ -"}</p>
                  </div>
                </Col>
                <Col>
                <div>
                    <p><b>Hasta</b> {branch.offices && branch.offices.length > 0 ? `$ ${mostExpensivePrice(branch.offices)}/hs` : "$ -"}</p>
                  </div>
                </Col>
              </Row>
                  <div>
                    <b>Cantidad de oficinas</b> {branch.offices ? branch.offices.length : 0}
                  </div>
              <hr />
              <p>
                <b>{branch.location ? branch.location.province : branch.province}, {branch.location ? branch.location.city : branch.city} {branch.location ? branch.location.street : null}</b>
              </p>
              <p><b>Contacto: </b>{branch.phone}</p>
            </CardBody>
          </Card>
        </Link>
      }
    </>
  );
}
