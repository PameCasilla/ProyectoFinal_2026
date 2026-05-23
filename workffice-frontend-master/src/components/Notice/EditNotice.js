import React from 'react';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router';
import {
    Row,
    Col,
    Card,
    CardBody,
    Input,
    Button,
    Form,
    FormGroup,
    Label,
    CardHeader,
    Container
} from 'reactstrap';
import { Notification } from '../Common/Notification/Notification';
import './styles/NoticeStyle.css';

export const EditNotice = props => {
    const history = useHistory();
    const { notification, hideNotification, update, loadNews } = props;
    const newsId = useParams().id;
    const validate = values => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Requerido.';
        }
        if (!values.subject) {
            errors.subject = 'Requerido.';
        }
        if (!values.body) {
            errors.body = 'Requerido.';
        }
        return errors;
    };
    let news = loadNews(newsId);


    const formik = useFormik({
        initialValues: {
            subject: news ? news.subject : "",
            title: news ? news.title : "",
            body: news ? news.body : ""
        },
        validate,
        onSubmit: async (values) => {
            await update(newsId, values)
        },
    });
    React.useEffect(() => {
        if (notification.show) {
            if (notification.isSuccess)
                setTimeout(() => {
                    history.push('/admin/notice');
                }, 2500);
            setTimeout(() => {
                hideNotification()
            }, 2000);
        }
    }, [notification.show]);

    const goBack = () => {
        history.push('/admin/notice');
    }
    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Editar <small color="red">noticia</small>
                    </h1>
                    <hr />
                </Col>
            </Row>
            <Container>
                <Form onSubmit={formik.handleSubmit} >
                    <Card style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <CardHeader>
                            <Notification
                                show={notification.show && notification.isSuccess}
                                message="La noticia ha sido creada correctamente"
                                hideNotification={hideNotification}
                            />
                        </CardHeader>
                        <CardBody>
                            <Col xs="12" md="12" lg="12" xg="12" style={{ paddingLeft: 20, paddingRight: 20 }}>
                                <FormGroup className={formik.errors.subject ? 'has-danger' : ''}>
                                    <Label htmlFor="subject" className="label-form">Asunto</Label>
                                    <Input
                                        type="text"
                                        placeholder="Ingrese el asunto de la noticia"
                                        name="subject"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.subject}
                                    />
                                </FormGroup>
                                <FormGroup className={formik.errors.title ? 'has-danger' : ''}>
                                    <Label htmlFor="noticeName" className="label-form">Título</Label>
                                    <Input
                                        type="text"
                                        placeholder="Ingrese el título de la noticia"
                                        name="title"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                    />
                                </FormGroup>
                                <FormGroup className={formik.errors.body ? 'has-danger' : ''}>
                                    <Label htmlFor="body" className="label-form">Descripción</Label>
                                    <Input
                                        type="textarea"
                                        placeholder="Ingrese la descripción de la noticia"
                                        name="body"
                                        id="exampleText"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.body}
                                    />
                                </FormGroup>
                            </Col>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="col-auto">
                                    <Button
                                        type="submit"
                                        className="btn-round btn-primary mb-3"
                                        color="primary"
                                        style={{ minWidth: 107 }}
                                    >
                                        Actualizar
                                    </Button>
                                </div>
                                <div className="col-auto">
                                    <Button
                                        type="reset"
                                        className="btn-round btn-primary mb-3"
                                        style={{ backgroundColor: '#EB5D60', minWidth: 107 }}
                                        onClick={() => goBack()}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Form>
            </Container>
        </div>
    );
}
