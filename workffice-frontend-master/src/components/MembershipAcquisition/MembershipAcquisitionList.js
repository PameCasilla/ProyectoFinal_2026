import { useEffect } from "react"
import { Col, Row } from "reactstrap"
import { MembershipAcquisitionComponent } from "./MembershipAcquisitionComponent"

export const MembershipAcquisitionList = ({
    membershipAcquisitions,
    loadMembershipAcquisitions,
}) => {
    useEffect(() => {
        loadMembershipAcquisitions()
    }, [""])

    return <div className="content">
        <Row style={{ display: 'grid', paddingTop: 40 }}>
            <Col xs="12" md="6" lg="12" xg="12">
                <h1>
                    Membresias adquiridas
                </h1>
                <hr />
            </Col>
        </Row>
        {membershipAcquisitions.map(membershipAcquisition => <MembershipAcquisitionComponent
            key={membershipAcquisition.id}
            {...membershipAcquisition}
            paymentInformation={membershipAcquisition.paymentInformation || {}}
        />)}
    </div>
}
