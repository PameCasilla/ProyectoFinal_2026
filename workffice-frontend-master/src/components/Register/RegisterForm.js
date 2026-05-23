// import React from 'react';
// import { useFormik } from 'formik';
// import {
//   Alert,
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardTitle,
//   FormGroup,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
// } from 'reactstrap';
// import { useHistory } from 'react-router-dom';
// import { customizedErrorAuth } from '../../infra/errorsAuth';


// export const RegisterForm = props => {
//   const history = useHistory();

//   const validate = values => {
//     const errors = {};
//     if (!values.password) {
//       errors.password = '* Requerido.';
//     } else if (values.password.length < 8 && values.password.length > 10) {
//       errors.password = '* La contraseña debe tener 8 caracteres o más'
//     } else if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i.test(values.password)) {
//       errors.password = '* La contraseña debe contener almenos un caracter, un número, una mayúscula y menos de 16 caracteres ';
//     }
//     if (!values.type) {
//       errors.type = '* Requerido.';
//     }
//     if (!values.email) {
//       errors.email = '* Requerido.';
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//     ) {
//       errors.email = 'Dirección de email inválida.';
//     }
//     return errors;
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       type: '',
//     },
//     validate,
//     onSubmit: async values => {
//       await props.onRegister(values);
//       !props.error && history.push('/auth/confirmation-account');
//     },
//   });
//   return (
//     <Form className="form" onSubmit={formik.handleSubmit}>
//       <Card className="card-signup text-center">
//         <CardHeader>
//           {
//             <Alert
//               isOpen={props.error !== null}
//               color="danger"
//             >
//               <span>{customizedErrorAuth(props.error)}</span>
//             </Alert>
//           }
//           <CardTitle tag="h4">Creemos tu cuenta</CardTitle>
//         </CardHeader>
//         <CardBody>
//           <FormGroup
//             className={
//               formik.errors.email && formik.touched.email
//                 ? 'has-danger'
//                 : 'has-success'
//             }>
//             <InputGroup>
//               <InputGroupAddon addonType="prepend">
//                 <InputGroupText>
//                   <i className="fa fa-user" />
//                 </InputGroupText>
//               </InputGroupAddon>
//               <Input
//                 name="email"
//                 placeholder="Email.."
//                 type="email"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.email}
//               />
//             </InputGroup>
//             {formik.errors.email &&
//               formik.touched.email ? (
//               <div className="error">{formik.errors.email}</div>
//             ) : null}
//           </FormGroup>
//           <FormGroup
//             className={
//               formik.errors.password && formik.touched.password
//                 ? 'has-danger'
//                 : 'has-success'
//             }>
//             <InputGroup>
//               <InputGroupAddon addonType="prepend">
//                 <InputGroupText>
//                   <i className="fa fa-key" />
//                 </InputGroupText>
//               </InputGroupAddon>
//               <Input
//                 name="password"
//                 placeholder="Contraseña..."
//                 type="password"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//               />
//             </InputGroup>
//             {
//               formik.errors.password && formik.touched.password ? (
//                 <div className="error">{formik.errors.password}</div>
//               ) : null
//             }
//           </FormGroup >
//           <FormGroup>
//             <Input
//               type="select"
//               name="type"
//               id="select"
//               onChange={formik.handleChange}
//               value={formik.values.type}>
//               <option value={null}>Tipo de cuenta</option>
//               <option value="RENTER">Usuario Cliente</option>
//               <option value="OFFICE_HOLDER">Propietario de oficinas</option>
//             </Input>
//             {formik.errors.type &&
//               formik.touched.type &&
//               formik.validateOnChange.type ? (
//               <div className="error">{formik.errors.type}</div>
//             ) : null}
//           </FormGroup>
//         </CardBody >
//         <CardFooter>
//           <Button
//             className="btn-round"
//             color="info"
//             type="submit"
//             disabled={formik.isSubmitting}>
//             Crear cuenta
//           </Button>
//         </CardFooter>
//       </Card >
//     </Form >

//   )
// };
