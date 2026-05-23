
import { CloudinaryContext, Image } from 'cloudinary-react';
import { includes } from "lodash-es";
import React from "react";
import {
    Badge,
    Card, CardBody,
    CardHeader, CardTitle, Col, Row
} from "reactstrap";
import PictureUpload from '../../../components/Common/CustomUpload/PictureUpload';
import { EmptyComponent } from "../../../components/Common/Empty/EmptyComponent";
import Forbidden from "../../../components/Common/Forbidden/Forbidden";
import { Notification } from "../../../components/Common/Notification/Notification";
import { UserUpdate } from "../../../components/User/UserUpdate";
import { COLLABORATOR_RESOURCE } from '../../../stores/actions/errors/permissionActions';
import { COLLABORATOR_FORBIDDEN_MESSAGE } from "../../../utils/collaboratorTranslations";
import CollaboratorRow from "./CollaboratorRow";

export const UserProfile = ({
    userMe,
    onUpdate,
    collaborators,
    notification,
    hideNotification,
    loadCollaborators,
    officeBranch,
    permission,
}) => {
    React.useEffect(() => {
        if (userMe?.userType === "OFFICE_HOLDER") {
            loadCollaborators(officeBranch.id);
        }
    }, [collaborators ? collaborators.length : 0])
    const { name, bio, profileImage } = userMe || {}
    React.useEffect(() => {
        setTimeout(() => {
            hideNotification()
        }, 2000)
    }, [notification.show])

    const updateUser = (imageData) => {
        onUpdate({
            'name': userMe.name,
            'lastname': userMe.lastname,
            'address': userMe.address,
            'bio': userMe.bio,
            'imageData': imageData
        })
    }

    const renderCollaborators = () => {
        if (permission.isForbidden && includes(permission.resources, COLLABORATOR_RESOURCE))
            return <Forbidden message={COLLABORATOR_FORBIDDEN_MESSAGE} />
        return collaborators && collaborators.length !== 0 ? collaborators.map(collaborator => {
            return <CollaboratorRow key={collaborator.id} {...collaborator} />
        }) : < EmptyComponent />
    }
    return (
        <div className="content">
            <Row style={{ paddingTop: 30 }}>
                <Col md="4">
                    <Card className="card-user">
                        <div className="image">
                            <CloudinaryContext cloudName="workffice">
                                <div>
                                    <Image publicId="sample" width="0.5" />
                                </div>
                            </CloudinaryContext>
                        </div>
                        <CardBody>
                            <div className="author">
                                <PictureUpload avatar={profileImage} onChange={(imageData) => updateUser(imageData)} />
                                <h5 className="title">{name || ""}</h5>
                                <Badge
                                    color={userMe?.userType === "RENTER" ? "info" : userMe?.userType === "COLLABORATOR" ? "warning" : "success"}
                                    pill>
                                    {userMe?.userType === "RENTER" ?
                                        "Inquilino" :
                                        userMe?.userType ===
                                            "COLLABORATOR" ?
                                            "Colaborador" :
                                            "Dueño de oficina"}
                                </Badge>
                            </div>
                            <p className="description text-center">{bio}</p>
                        </CardBody>
                    </Card>
                    {
                        userMe?.userType !== "RENTER" &&
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Colaboradores de {userMe?.userType !== "RENTER" && officeBranch.name}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <ul className="list-unstyled team-members">
                                    {renderCollaborators()}
                                </ul>
                            </CardBody>
                        </Card>
                    }
                </Col>

                <Col md="8">
                    <Notification
                        show={notification.show && notification.isSuccess}
                        message="El usuario se actualizo correctamente"
                        hideNotification={hideNotification}
                    />
                    <UserUpdate update={onUpdate} {...userMe}></UserUpdate>
                </Col>
            </Row>
        </div>

    );
}

export default UserProfile;
