import React from 'react';
import { Col, Row } from 'reactstrap';
import { Cloudinary } from '../Common/Cloudinary/Cloudinary';

export const OfficeReportDetail = (props) => {
    const { capacity, description, /* id,*/ imageUrl, name, price, privacy, table } = props.office;
    return (

        <form>
            <Row>
                <Col xs="12" md="12" lg="12" xg="12" >
                    <Row style={{ paddingLeft: 20 }} >
                        <Col xs="6" md="6" lg="6" xg="6">
                            <div className="imageContainer" style={{ width: '80%' }}>
                                <Cloudinary publicId={imageUrl} className="office-branch-card-image" />
                            </div>
                        </Col>
                        <Col xs="6" md="6" lg="6" xg="6">
                            <Row>
                                <div className="office-branch-card-title" >
                                    <h1 style={{ color: '#EB5D60' }}>
                                        {name}
                                    </h1>
                                </div>
                            </Row>
                            <Row>
                                <label htmlFor="description" style={{ fontSize: 16, marginRight: '10px' }}>
                                    {description}
                                </label>
                            </Row>
                        </Col>
                    </Row>

                </Col>

                <Col xs="12" md="12" lg="12" xg="12" style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <hr style={{ borderWidth: 2, borderBlockColor: '#133148', marginTop: 8 }} />
                    <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Col>
                            <div className='capacity'>
                                <label htmlFor="capacity" className="form-label">Capacidad: <strong className="infoDetail">{capacity}</strong></label>
                            </div>

                            <div className='number-of-tables'>
                                <label htmlFor="number-of-tables" className="form-label">Cantidad de mesas: <strong className="infoDetail">{table.quantity}</strong></label>
                            </div>
                        </Col>
                        <Col>
                            <div className='office-type'>
                                <label htmlFor="office-type" className="form-label">Tipo de oficina: <strong className="infoDetail">{privacy === 'PRIVATE' ? 'Privada' : 'Compartida'}</strong></label>
                            </div>

                            <div className='price-hour'>
                                <label htmlFor="price-hour" className="form-label">Precio por hora: $<strong className="infoDetail">{price}</strong></label>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row >

        </form >

    )
}
