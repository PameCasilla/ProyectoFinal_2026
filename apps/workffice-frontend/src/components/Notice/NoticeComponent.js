import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, UncontrolledTooltip } from 'reactstrap';
import './styles/NoticeComponent.css';
import ima from '../../assets/img/flags/noticias.png'
import { Link } from 'react-router-dom';


export const NoticeComponent = (props) => {

  const {
    news,
    id,
    displayEditButton,
    displaySendButton,
    displayDeleteButton,
    sendNews,
    deleteNews,
    // recipients
  } = props;

  const { title, subject, body, created } = news;

  const send = (id) => {
    sendNews(id);
  }
  const deleteN = (id) => {
    deleteNews(id)
    // newsUpdated();
  }
  return (
    <>
      <Card style={{ marginRight: '5%', marginLeft: '5%' }}>
        <CardHeader>
          <div className="office-branch-card-title">
            <h5 style={{ marginBottom: 0, width: ' 80%' }}>
              <img src={ima} alt="Logo noticas" width="12%" /> {title} - <label style={{ color: "#34B18A" }}>{subject}</label>
            </h5>
            <label> <small style={{ color: '#403D39', fontSize: 12 }}>{`${created}`}</small></label>
          </div>
          <div className="buttons" style={{ display: 'flex' }}>
            {
              displayEditButton ?
                <div>
                  <Link to={`/admin/notice/edit/${id}`}>
                    <Button id={`editNews-${id}`} color="primary" className="btn-round btn-icon" size="sm">
                      <i className="nc-icon nc-ruler-pencil"></i>
                    </Button>
                    <UncontrolledTooltip placement="right" target={`editNews-${id}`} delay={0}>
                      Editar Noticia
                    </UncontrolledTooltip>
                  </Link>
                </div> : <></>
            }
            {
              displaySendButton  ?
                <div>
                  <Button id={`sendNews-${id}`} color="success" className="btn-round btn-icon" size="sm" onClick={() => send(id)} >
                    <i className="nc-icon nc-bell-55"></i>
                  </Button>
                  <UncontrolledTooltip placement="right" target={`sendNews-${id}`} delay={0}>
                    Enviar Noticia
                  </UncontrolledTooltip>
                </div> : <></>
            }
            {
              displayDeleteButton ?
                <div>
                  <Button id={`deleteNews-${id}`} color="danger" className="btn-round btn-icon" size="sm" onClick={() => deleteN(id)} >
                    <i className="fa fa-trash"></i>
                  </Button>
                  <UncontrolledTooltip placement="right" target={`deleteNews-${id}`} delay={0}>
                    Eliminar Noticia
                  </UncontrolledTooltip>
                </div> : <></>
            }
          </div>
        </CardHeader>
        <CardBody>
          <hr style={{ color: '#133148' }} />
          <div>
            <label style={{ color: '#403D39', fontSize: 14 }}>
              {body}
            </label>
          </div>
          <hr />

        </CardBody>
        <CardFooter>
          <p style={{ fontStyle: 'oblique', fontSize: '12px' }}>Estado:  {news.status === 'DRAFT' ? 'Borrador' : 'Enviada'}</p>
        </CardFooter>
      </Card>
    </>
  );
}
