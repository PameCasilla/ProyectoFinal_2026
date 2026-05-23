import { Button, Col, Row } from "reactstrap";
import avatar from "../../../assets/img/faces/erik-lucatero-2.jpg"
import { getStatus } from "../../../utils/collaboratorTranslations";


export const CollaboratorRow = props => {
    const {
        name,
        status
    } = props

    const getButtonColor = () => {
        switch (status) {
            case "PENDING": return "default"
            case "ACTIVE": return "success"
            case "INACTIVE": return "danger"
        }
    }

    return (
        <li>
            <Row>
                <Col md="2" xs="2">
                    <div className="avatar">
                        <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                                avatar
                            }
                        />
                    </div>
                </Col>
                <Col md="7" xs="7">
                    {name} <br/>
                    <span className={`text-${getButtonColor()}`}>
                        <small>{getStatus(status)}</small>
                    </span>
                </Col>
                <Col className="text-right" md="3" xs="3">
                    <Button
                        className="btn-round btn-icon"
                        color={getButtonColor()}
                        outline
                        size="sm"
                    >
                        <i className="fa fa-envelope" />
                    </Button>
                </Col>
            </Row>
        </li>
    );
}

export default CollaboratorRow;
