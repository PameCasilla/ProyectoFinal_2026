import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { getAllMembership } from '../../stores/actions/backoffice/membership/membership'
import { EmptyComponent } from '../Common/Empty/EmptyComponent'
import { MembershipComponent } from '../Membership/MembershipComponent'
// import { useFormik } from 'formik';
// import { monthFilter } from '../../utils/filters';

export const DashboardsMembershipComponent = props => {
    const memberships = useSelector(state => state.memberships.membershipList)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getAllMembership(props.officeBranchId))
    }, [])
    // const [currentMonth, setCurrentMonth] = useState(monthFilter[new Date().getMonth()].value)
    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         month: monthFilter[new Date().getMonth()]
    //     },
    //     onSubmit: values => {
    //         setCurrentMonth(values.month.value)
    //     },
    // });
    return (
        <>
            <Row>
                <Col lg="12" sm="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Membresía destacada</CardTitle>
                            <Row style={{ display: 'flex', alignContent: 'center', alignItems: 'flex-end' }}>
                                <Col sm="12">
                                    <p className="card-category" style={{ color: '#34b18a' }}>Membresía mas solicitada</p>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {
                                memberships.length > 0 && memberships.length > 0
                                    ? <MembershipComponent membership={memberships[0]} />
                                    : <EmptyComponent></EmptyComponent>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
