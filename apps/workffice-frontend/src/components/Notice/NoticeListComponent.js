import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { readFromLocalStorage } from '../../infra/api/localStorage';
import { EmptyComponent } from '../Common/Empty/EmptyComponent';
import { Notification } from "../Common/Notification/Notification";
import { NoticeComponent } from './NoticeComponent';

// import { EmptyComponent } from '../Empty/EmptyComponent';

export const NoticeListComponent = props => {
  const { news, sendNews, deleteNews, notification, hideNotification } = props;
  const newsOperation = useSelector(state => state.news.news);
  const userType = readFromLocalStorage("USER_TYPE");
  const displayEditButton = userType === "RENTER" ? false : true;
  const displaySendButton = userType === "RENTER" ? false : true;
  const displayDeleteButton = userType === "OFFICE_HOLDER" ? true : false;

  React.useEffect(() => {
    setTimeout(() => {
      hideNotification()
    }, 2500)
  }, [notification.show])

  const getErrorMessage = errorCode => {
    switch (errorCode) {
      case "NEWS_IS_NOT_DRAFT": return "No se puede enviar una noticia en estado ENVIADA"
      default: "Oops algo salio mal"
    }
  }

  return (
    <div className="content">
      <Row style={{ display: 'grid', paddingTop: 40 }}>
        <Col xs="12" md="12" lg="12" xg="12">
          <h1>
            Gestionar <small color="red">noticias</small>
          </h1>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col
          xs="6"
          md="6"
          lg="12"
          xg="12"
          style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button className="btn-round" color="primary">
            <Link to="/admin/new-notice" style={{ color: 'white', textDecoration: 'none' }}>
              {' '}
              <i className="fa fa-plus" /> Nueva noticia
            </Link>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12" lg="12" xg="12">
          <Notification
            show={notification.show && notification.isError}
            isError
            message={getErrorMessage(notification.errorCode)}
            hideNotification={hideNotification}
          />
        </Col>
        <Col xs="12" md="12" lg="12" xg="12">
          <Notification
            show={notification.show && notification.isSuccess && newsOperation != null}
            message="La operacion ha sido realizada correctamente"
            hideNotification={hideNotification}
          />
        </Col>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'start', marginTop: 16 }}>
        {
          news != null && news.length > 0 ? news.map((n) => {
            if (n.status !== "DELETED") {
              return <Col xs="10" md="6" lg="6" xg="4">
                <NoticeComponent
                  key={n.id}
                  id={n.id}
                  news={n}
                  displayEditButton={displayEditButton}
                  displaySendButton={displaySendButton}
                  displayDeleteButton={displayDeleteButton}
                  sendNews={sendNews}
                  deleteNews={deleteNews}
                />
              </Col>
            }
          }) : <EmptyComponent />
        }
      </Row>
    </div >
  );
}