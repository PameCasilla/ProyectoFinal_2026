import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Row, Col, Card, CardBody, Button, Badge, UncontrolledTooltip } from 'reactstrap';
import image from '../../assets/img/bg/rawpixel-com.jpg';
import './styles/OfficeStyle.css';

import Reviews from '../reviews/Reviews';
import { Loading } from '../Common/Loading/Loading';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { includes } from 'lodash-es';


export const OfficeDetailComponent = props => {
    const history = useHistory();
    const { office, reviews, loadOffice, loadReviews, branch, inactivities, loadInactivities, user } = props;
    const query = new URLSearchParams(useLocation().search);
    const officeId = query.get('id');    // const office = useSelector(state => state.office)
    useEffect(() => {
        loadOffice(officeId);
        loadInactivities(officeId);
    }, []);

    useEffect(() => {
        loadReviews(officeId)
    }, [])

    const loadingReviews = false;
    const getLabelColor = day => {
        return includes(inactivities.map(inactivity => inactivity.dayOfWeek), day)
            ? "danger" : "info"
    }
    const daysOfWeek = [
        "MONDAY", "TUESDAY", "WEDNESDAY",
        "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
    ]
    const getDay = day => {
        switch (day) {
            case ("MONDAY"): return "Lunes"
            case ("TUESDAY"): return "Martes"
            case ("WEDNESDAY"): return "Miércoles"
            case ("THURSDAY"): return "Jueves"
            case ("FRIDAY"): return "Viernes"
            case ("SATURDAY"): return "Sábado"
            case ("SUNDAY"): return "Domingo"
        }
    }
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
    };

    const [slider, setSlider] = useState(null)

    const renderReviews = () => {
        if (loadingReviews)
            return (
                <Col xs="4">
                    <Loading></Loading>
                </Col>
            )
        if (reviews && reviews.length === 0)
            return (
                <div>
                    <p>Aún no hay reseñas de esta oficina</p>
                </div>
            )
        else
            return (
                <>
                    <Col md="1" style={{ display: "flex", alignItems: "center" }}>
                        <Button
                            color="primary"
                            className="btn-round btn-icon"
                            onClick={() => slider.slickPrev()}
                        >
                            <i className="nc-icon nc-minimal-left" />
                        </Button>
                    </Col>
                    <Col md="10">
                        <Slider ref={s => setSlider(s)} {...settings} className="slider">
                            {reviews ? reviews.length > 0 && reviews.map(review => {
                                return (
                                    <Col key={review.id}>
                                        <div>
                                            <Reviews review={review} />
                                        </div>
                                    </Col>
                                )
                            }): <></>}
                        </Slider>
                    </Col>
                    <Col md="1" style={{ display: "flex", alignItems: "center" }}>
                        <Button
                            color="primary"
                            className="btn-round btn-icon btn-primary"
                            onClick={() => slider.slickNext()}
                        >
                            <i className="nc-icon nc-minimal-right" />
                        </Button>
                    </Col>
                </>
            )
    }

    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Detalle <small color="red">oficina</small>
                    </h1>
                    <hr />
                </Col>
            </Row>

            <Row>
                <Card style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}>
                    <CardBody>
                        <form>
                            <div className="form-row">
                                <Col xs="12" md="12" lg="6" xg="6" style={{ paddingLeft: 20, paddingRight: 20 }}>
                                    <div className='form-row' style={{ width: '100%' }}>
                                        <div className="imageContainer" style={{ width: '70%', marginRight: 'auto', marginLeft: 'auto' }}>
                                            <img className="office-branch-card-image" src={image} />
                                        </div>
                                    </div>

                                    <div className="office-branch-card-title" style={{ marginTop: 30 }}>
                                        <h1 style={{ marginBottom: 0, color: '#EB5D60' }}>
                                            {office?.name}

                                        </h1>
                                    </div>
                                    <hr style={{ borderWidth: 2, borderBlockColor: '#133148', marginTop: 3 }} />

                                    <div className='services'>
                                        <Row>
                                            <Col>
                                                <label for="services" class="form-label">Servicios</label>
                                            </Col>
                                        </Row>
                                        <Row xs="12" md="12" lg="6" xg="6" >
                                            <Col>
                                                {
                                                    office?.services.map((s) => <Badge color='success'>{s.name}</Badge>)
                                                }
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className='equipment'>
                                        <Row>
                                            <Col>
                                                <label for="equipment" class="form-label">Equipamiento</label>
                                            </Col>
                                        </Row>
                                        <Row xs="12" md="12" lg="6" xg="6" >
                                            <Col>
                                                {
                                                    office?.equipments.map((e) => <Badge color='success' style={{ width: 'max-content' }}>{e.name}</Badge>)
                                                }
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className='equipment' style={{ marginBottom: 20 }}>
                                        <label for="reviews" class="form-label" style={{ marginBottom: 20 }}>Reseñas</label>
                                    </div>
                                </Col>

                                <Col xs="12" md="12" lg="6" xg="6" style={{ paddingLeft: 20, paddingRight: 20 }}>
                                    <div className='sucursal'>
                                        <label for="sucursal" class="form-label">Sucursal: <strong className="infoDetail">{branch.name}</strong></label>
                                    </div>

                                    <div className='office-type'>
                                        <label for="office-type" class="form-label">Tipo de oficina: <strong className="infoDetail">{office?.privacy === 'PRIVATE' ? 'Privada' : 'Compartida'}</strong></label>
                                    </div>

                                    <div className='price-hour'>
                                        <label for="price-hour" className="form-label">Precio por hora: $<strong className="infoDetail">{office?.price}</strong></label>
                                    </div>

                                    <div className='availability'>
                                        <label for="availability" class="form-label">Disponibilidad: </label>
                                        <br />
                                        {
                                            daysOfWeek.map(day =>
                                                <Badge id={`down-${day}`} key={day} color={getLabelColor(day)}>
                                                    {
                                                        getLabelColor(day) === "danger"
                                                            ? <UncontrolledTooltip placement="bottom" target={`down-${day}`} delay={0}>
                                                                No disponible
                                                            </UncontrolledTooltip> : <></>
                                                    }

                                                    {getDay(day)}
                                                </Badge>
                                            )
                                        }
                                    </div>

                                    <div className='capacity'>
                                        <label for="capacity" class="form-label">Capacidad: <strong className="infoDetail">{office?.capacity}</strong></label>
                                    </div>

                                    <div className='number-of-tables'>
                                        <label for="number-of-tables" className="form-label">Cantidad de mesas: <strong className="infoDetail">{office?.table.quantity}</strong></label>
                                    </div>

                                    <div className='description'>
                                        <label for="description" class="form-label">Descripción </label>
                                        <p for="description" style={{ fontSize: 14 }}>
                                            <br /> {office?.description}
                                        </p>
                                    </div>
                                </Col>
                            </div>
                            <Row style={{ paddingBottom: "5%", display: "flex", justifyContent: "center" }}>
                                {renderReviews()}
                            </Row>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button className='btn-round btn-primary' id='servicesButton' onClick={() => { user.userType !== 'RENTER' ? "/admin/offices" : history.goBack() }}>
                                    Aceptar
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </Row>
        </div>
    );
}
