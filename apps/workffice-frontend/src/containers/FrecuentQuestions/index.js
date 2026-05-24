import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Collapse, Label, Row } from 'reactstrap';

const FrequentQuestions = () => {

    const [openedCollapses, setOpenedCollapses] = useState("");

    const collapsesToggle = (collapse) => {
        if (openedCollapses === collapse) {
            setOpenedCollapses("");
        } else {
            setOpenedCollapses(collapse);
        }
    };

    return (
        <div className="content">
            <Row style={{ display: 'grid', paddingTop: 40 }}>
                <Col xs="12" md="6" lg="12" xg="12">
                    <h1>
                        Preguntas <Label style={{ color: "#EB5D60" }}>frecuentes</Label>
                    </h1>
                    <hr />
                </Col>
            </Row>
            <Row>

                <div
                    aria-multiselectable={true}
                    className="card-collapse"
                    id="accordion"
                    role="tablist"
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '95%'
                    }}
                >
                    <h3
                        style={{
                            color: "#34B18A",
                            marginBottom: 0,
                            marginTop: "1%",
                        }}>
                        Para los inquilinos
                    </h3>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseOne"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseOne") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo registrarme en Workffice?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseOne"}
                        >
                            <CardBody>
                                Para registrarse en Workffice como inquilino debe ir a {" "}
                                <strong>
                                    <Link to='/auth/register' style={{ textDecoration: 'none' }}>
                                        www.worffice.com/auth/register
                                    </Link>
                                </strong>
                                ,{" "} completar el formulario con su correo, establecer una contraseña
                                y en <strong>Tipo de cuenta</strong> seleccionar <strong>"Usuario cliente"</strong>.
                                Luego le enviaremos un link a su mail para activar la cuenta (recuerde revisar su casilla
                                de spam o de correo no deseado). Una vez que active su cuenta, deberá iniciar sesión y ya estará
                                listo para utilizar Workffice.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseTwo"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseTwo") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo reservo una oficina?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseTwo"}
                        >
                            <CardBody>
                                Para reservar una oficina debe presionar el botón <strong>"Alquilar oficina"</strong>. Esto lo llevará a un pequeño
                                formulario donde deberá seleccionar la <strong>fecha, hora de ingreso, hora de salida y la cantidad de personas </strong>
                                que utilizarán esa oficina. Luego debe presionar <strong>"Alquilar oficina"</strong> y seguir las instrucciones de pago.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseThree"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseThree") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo comprar una membresía?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseThree"}
                        >
                            <CardBody>
                                Para acceder a una membresía debe ponerse en contacto con la
                                sucursal a la que desea asistir y solicitarla. De esta manera
                                podrá armar un paquete de días y oficinas que se adapte a sus necesidades.
                            </CardBody>
                        </Collapse>
                    </Card>
                    {/* <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseFour"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseFour") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo realizar una reseña?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseFour"}
                        >
                            <CardBody>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life
                                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                non cupidatat skateboard dolor brunch. Food truck quinoa
                                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla assumenda
                                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                                excepteur butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt you probably
                                haven't heard of them accusamus labore sustainable VHS.
                            </CardBody>
                        </Collapse>
                    </Card> */}
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseFive"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseFive") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo realizar una operación de pago y que medios de pago tengo disponible?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseFive"}
                        >
                            <CardBody>
                                Las operaciones de pago, ya sea para reservar una oficina o para comprar una membresía,
                                se realizarán a través de mercado pago. Por lo tanto los medios de pago disponibles
                                son todos los que incluya dicha plataforma.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseSix"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseSix") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo puedo ver el historial de mis reservas?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseSix"}
                        >
                            <CardBody>
                                Para ver su historial de reservas, despliegue la opción <strong>Reserva</strong> en el menú lateral y
                                seleccione <strong>"Mis Reservas"</strong>. Si desea ver las reservas con fechas anteriores
                                seleccione <strong>"Reservas Anteriores"</strong>.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseSeventeen"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseSeventeen") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo ver el manual de usuario de inquilino?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseSeventeen"}
                        >
                            <CardBody>
                                Para ver y descargar el manual de usuario acceda al siguiete link {" "}
                                <strong>
                                    <a href='https://drive.google.com/drive/folders/1IyjdwrzXZ5SXLL7jXx-YeB15LQFFWVaK' style={{ textDecoration: 'none' }}>
                                        www.worffice.com/manual
                                    </a>
                                </strong>. Allí debe ver el documento llamado <strong>Manual de usuario inquilino</strong>.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%", marginBottom: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseFour"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseFour") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - Videos tutoriales
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseFour"}
                        >
                            <CardBody>
                                Para poder ver los videos tutoriales referentes al usuario inquilino debe acceder al siguiete link {" "}
                                <strong>
                                    <a href='https://www.youtube.com/playlist?list=PLCTdkDqj4jQ1EhsV2Ww_Wx5NtdJLk4Kz7' style={{ textDecoration: 'none' }}>
                                        "Tutoriales para usuario inquilino".
                                    </a>
                                </strong>.
                            </CardBody>
                        </Collapse>
                    </Card>

                    <h3
                        style={{
                            color: "#34B18A",
                            marginBottom: 0,
                            marginTop: "2%",
                        }}>
                        Para los propietarios de oficina
                    </h3>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseSeven"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseSeven") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo registrarme en Workffice?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseSeven"}
                        >
                            <CardBody>
                                Para registrarse en Workffice como propietario debe ir a {" "}
                                <strong>
                                    <Link to='/auth/register' style={{ textDecoration: 'none' }}>
                                        www.worffice.com/auth/register
                                    </Link>
                                </strong>
                                ,{" "} completar el formulario con su correo, establecer una contraseña
                                y en <strong>Tipo de cuenta</strong> seleccionar <strong>"Propietario de oficinas"</strong>.
                                Luego le enviaremos un link a su mail para activar la cuenta (recuerde revisar su casilla
                                de spam o de correo no deseado). Una vez que active su cuenta, deberá iniciar sesión y ya estará
                                listo para utilizar Workffice.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseEight"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseEight") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo crear un perfil colaborador?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseEight"}
                        >
                            <CardBody>
                                Para crear un perfil de colaborador, debe dirigirse al menú lateral y
                                dentro de <strong>Colaboradores</strong> seleccionar <strong>"Nuevo colaborador"</strong>.
                                Una vez allí solo deberá completar el formulario, presionar <strong>Crear </strong>
                                y el perfil quedará creado.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseNine"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseNine") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo crear una sucursal?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseNine"}
                        >
                            <CardBody>
                                Apenas inicie sesión con su perfil de <strong>Propietario de oficina</strong> será redirigido
                                a una pantalla donde verá todas sus sucursales si las tuviera. Si desea crear una sucursal,
                                debe presionar el botón de <strong>Nueva sucursal</strong>. Allí será redirigido a un formulario
                                que deberá cargar. Una vez finalizado, presionar <strong>Crear</strong> y su sucursal quedará creada.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseTen"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseTen") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo crear una oficina?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseTen"}
                        >
                            <CardBody>
                                Para crear una oficina, diríjase al menú lateral y dentro de <strong>Oficinas </strong>
                                seleccione <strong>Nueva oficinas</strong>. Luego complete el formlario con todos los datos
                                que se solicitan y presione <strong>Crear</strong>. De esta forma su oficina quedará creada.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseEleven"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseEleven") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo configuro la disponibilidad de mis oficinas?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseEleven"}
                        >
                            <CardBody>
                                Cuando realice la carga del formulario de creación de una oficina, verá que
                                uno de los campos le solicita que ingrese los días en que la oficina no estará disponible.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseTwelve"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseTwelve") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo crear una membresía?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseTwelve"}
                        >
                            <CardBody>
                                Para crear una membresía, diríjase al menú lateral y dentro de <strong>Configuraciones </strong>
                                seleccione <strong>Gestionar Membresía</strong>. Allí aparecerán todas las membresías existentes.
                                Para crear una nueva presione en <strong>Nueva Membresía</strong>. Luego complete el formlario con todos los datos
                                que se solicitan y presione <strong>Crear</strong>. De esta forma su membresía quedará creada.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseThirteen"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseThirteen") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo ver una reserva de oficina y su verificación?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseThirteen"}
                        >
                            <CardBody>
                                Para ver las reservas de una oficina debe ir al menú lateral, seleccionar
                                <strong> Oficinas</strong> y luego <strong>Mis Oficinas</strong>. Una vez allí
                                presione el botón de <strong>ver reservas</strong>. Será redirigido a una página donde
                                podrá ver todas las reservas por fecha.
                            </CardBody>
                        </Collapse>
                    </Card>
                    {/* <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseFourteen"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseFourteen") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo enviar una noticia a mis inquilinos?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseFourteen"}
                        >
                            <CardBody>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life
                                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                non cupidatat skateboard dolor brunch. Food truck quinoa
                                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                put a bird on it squid single-origin coffee nulla assumenda
                                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                                excepteur butcher vice lomo. Leggings occaecat craft beer
                                farm-to-table, raw denim aesthetic synth nesciunt you probably
                                haven't heard of them accusamus labore sustainable VHS.
                            </CardBody>
                        </Collapse>
                    </Card> */}
                    <Card className="card-plain" style={{ marginLeft: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseFiveteen"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseFiveteen") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo ver los reporte?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseFiveteen"}
                        >
                            <CardBody>
                                Para los reportes debe tener acceso al menu <strong>Dashboard</strong>. Como dueño de oficina <strong>por defecto tienes acceso.</strong> Al hacer click ahí podrá
                                ver <strong>información respecto de los reporte que actualmente Workffice le puede ofrecer </strong>. Entre estos están: <br />
                                <ul>
                                    <li style={{color:'rgb(235, 93, 96)', fontWeight:'bold'}}>Cantidad de colaboradores</li>
                                    <li style={{color:'rgb(235, 93, 96)', fontWeight:'bold'}}>Ingresos por año</li>
                                    <li style={{color:'rgb(235, 93, 96)', fontWeight:'bold'}}>Ingresos por oficina</li>
                                    <li style={{color:'rgb(235, 93, 96)', fontWeight:'bold'}}>Cantidad de reservar por oficina</li>
                                    <li style={{color:'rgb(235, 93, 96)', fontWeight:'bold'}}>Oficina destacada</li>
                                </ul>
                                
                                <p style={{color: 'rgb(52, 177, 138)'}}><strong>Próximamente estaremos trabajando en Nuevos reportes para que pueda mejorar la calidad de la información de su oficina</strong></p>
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%"}}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "collapseSixteen"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("collapseSixteen") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - ¿Cómo ver el manual de usuario de un dueño de oficina?
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "collapseSixteen"}
                        >
                            <CardBody>
                                Para ver y descargar el manual de usuario acceda al siguiete link {" "}
                                <strong>
                                    <a href='https://drive.google.com/drive/folders/1IyjdwrzXZ5SXLL7jXx-YeB15LQFFWVaK' style={{ textDecoration: 'none' }}>
                                        www.worffice.com/manual
                                    </a>
                                </strong>. Allí debe ver el documento llamado <strong>Manual de usuario propietario de oficina</strong>.
                            </CardBody>
                        </Collapse>
                    </Card>
                    <Card className="card-plain" style={{ marginLeft: "2%", marginBottom: "2%" }}>
                        <CardHeader role="tab">
                            <a
                                aria-expanded={openedCollapses === "twenty"}
                                href="#"
                                data-parent="#accordion"
                                data-toggle="collapse"
                                onClick={(e) => { e.preventDefault(); collapsesToggle("twenty") }}
                            >
                                <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className='text'>
                                        <Label className="form-label" style={{ fontSize: 18, marginTop: "auto", marginBottom: "auto" }}>
                                            - Videos tutoriales
                                        </Label>
                                    </div>
                                    <i
                                        className="nc-icon nc-minimal-down"
                                        style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            color: "#133148",
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Row>
                            </a>
                        </CardHeader>
                        <Collapse
                            role="tabpanel"
                            isOpen={openedCollapses === "twenty"}
                        >
                            <CardBody>
                                Para poder ver los videos tutoriales referentes al usuario propietario de oficina debe acceder al siguiete link {" "}
                                <strong>
                                    <a href='https://www.youtube.com/playlist?list=PLCTdkDqj4jQ0eGiKOLv3s4z7Udd2fBJ5a' style={{ textDecoration: 'none' }}>
                                        "Tutoriales para usuario propietario de oficina".
                                    </a>
                                </strong>.
                            </CardBody>
                        </Collapse>
                    </Card>
                </div>
            </Row>
        </div>
    )
}

export default FrequentQuestions;
