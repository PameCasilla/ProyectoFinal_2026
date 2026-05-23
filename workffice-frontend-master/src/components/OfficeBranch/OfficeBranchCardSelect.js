import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Badge, Button, Card, CardBody, ListGroup, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { CloudinaryContext, Image } from 'cloudinary-react';

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
          {<CloudinaryContext cloudName="workffice" width="310" height="175">
            <div>
              <Image publicId={branch.images ? branch.images[0]?.url || "sample" : "sample"} width={310} />
            </div>
          </CloudinaryContext>}
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
