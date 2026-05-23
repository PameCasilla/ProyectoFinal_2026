import { uniqueId } from 'lodash-es';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Collapse, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import { getAccessLabel, getResourceLabel } from '../../utils/rolesTranslation';
import { DeleteConfirmation } from '../Common/Alert/DeleteConfirmation';
import './styles/RolComponent.css';

export const RoleCard = ({ name, permissions, onDelete }) => {
  const [opened, setOpened] = useState(false)
  const [alert, setAlert] = useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const openAlert = () => {
    setAlert(<DeleteConfirmation
      title={`Desea borrar el rol "${name}" ?`}
      onConfirm={() => {
        onDelete()
        hideAlert()
      }}
      onCancel={() => hideAlert()}
    >
    </DeleteConfirmation>)
  }

  return (
    <>
      {alert}
      <Card style={{ marginRight: '5%' }}>
        <CardHeader style={{ display: 'flex', 'justifyContent': 'space-between', 'alignItems': 'center' }}>
          <h2 style={{ margin: 0 }}>
            Rol: <small>{name}</small>
          </h2>
          <Button className="btn-neutral btn-icon btn-danger" onClick={openAlert}>
            <i className='nc-icon nc-simple-remove'></i>
          </Button>
        </CardHeader>
        <CardBody>
          <ListGroup flush>
            <ListGroupItemHeading style={{ display: 'flex', 'justifyContent': 'space-between', 'alignItems': 'center' }}>
              Permisos: {permissions ? permissions.length : 0}
              <Button
                size="sm"
                className="btn-round btn-icon"
                onClick={() => setOpened(!opened)}
              >
                <i className={opened ? "nc-icon nc-minimal-up" : "nc-icon nc-minimal-down"} />
              </Button>
            </ListGroupItemHeading>
            <Collapse isOpen={opened}>
              <ListGroup flush>
                {
                  permissions && permissions.map((permission) =>
                    <ListGroupItem key={uniqueId()} className='text'>
                      <label className="form-label">
                        {getResourceLabel(permission.resource)} : <h6 className="text-danger">{getAccessLabel(permission.access)}</h6>
                      </label>
                    </ListGroupItem>
                  )
                }
              </ListGroup>
            </Collapse>
          </ListGroup>
        </CardBody>
      </Card>
    </>
  );
}
