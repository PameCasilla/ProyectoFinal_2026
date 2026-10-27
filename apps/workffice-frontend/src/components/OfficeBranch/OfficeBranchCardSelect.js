import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Badge, Button, Card, CardBody, ListGroup, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Cloudinary } from '../Common/Cloudinary/Cloudinary';

export const OfficeBranchCardSelect = ({ branch, select, selected, currentOfficeBranch }) => {
  const history = useHistory();
  const onSelect = () => {
    select(branch.id);
  }
  useEffect(() => {
    if (selected)
      history.push('/admin/user-profile');
  }, [currentOfficeBranch ? currentOfficeBranch.id : ""])

  return (
    <>
      <Card>
        <CardBody>
          <Cloudinary publicId={branch.images?.[0]?.url} width={310} />
          <ListGroup>
            <ListGroupItemHeading>
              <small>{branch.name}</small>
            </ListGroupItemHeading>
            <ListGroupItemText>
              {branch.collaborator ? <Badge color="danger">Colaborador</Badge> : <Badge color="primary">Dueño</Badge>}
            </ListGroupItemText>
            <ListGroupItemText>
              <b>{branch.location.province}, {branch.location.city}, {branch.location.street}</b>
            </ListGroupItemText>
            <Button className="btn-round" color="primary" size="large" onClick={onSelect}>Administrar</Button>
          </ListGroup>
        </CardBody>
      </Card>
    </>
  );
}
