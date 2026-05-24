import { useFormik } from 'formik';
import { includes } from 'lodash-es';
import React, { useState } from 'react';
import Select from 'react-select';
import { Badge, Button, Form, FormGroup } from 'reactstrap';
import { ROLE_RESOURCE } from '../../stores/actions/errors/permissionActions';
import { getStatus } from '../../utils/collaboratorTranslations';
import { ROLE_FORBIDDEN_MESSAGE } from '../../utils/rolesTranslation';
import { DeleteConfirmation } from '../Common/Alert/DeleteConfirmation';
import Forbidden from '../Common/Forbidden/Forbidden';


export const CollaboratorCard = props => {
  const {
    id,
    name,
    email,
    status,
    officeBranchRoles,
    collaboratorRoles,
    updateCollaborator,
    permission,
    onDelete
  } = props
  React.useEffect(() => {
    props.loadCollaboratorRoles(props.id);
  }, [])

  const [alert, setAlert] = useState(null)

  const hideAlert = () => {
    setAlert(null)
  }
  const openAlert = () => {
    setAlert(<DeleteConfirmation
      title={`Desea borrar el colaborador "${name}" ?`}
      onConfirm={() => {
        onDelete()
        hideAlert()
      }}
      onCancel={() => hideAlert()}
    >
    </DeleteConfirmation>)
  }


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roles: collaboratorRoles ? collaboratorRoles.map(role => {
        return { value: role.id, label: role.name }
      }) : [],
    },
    onSubmit: async ({ roles }) => {
      const roleIds = roles.map(role => role.value)
      updateCollaborator(id, {
        name: name,
        roleIds: roleIds,
      })
    },
  });

  const getStatusColor = () => {
    switch (status) {
      case "PENDING": return "default"
      case "ACTIVE": return "success"
      case "INACTIVE": return "danger"
    }
  }

  return (<>
    {alert}
    <div className='card-user card'>
      <div style={{ position: 'relative' }}>
        <div className='image' id='image' style={{ position: 'absolute' }}>
          <img alt='...' src='https://demos.creative-tim.com/paper-dashboard-pro-react/static/media/damir-bosnjak.efcaca50.jpg' />
        </div>
        <div>
          <div
            className='td-actions text-right'
            style={{
              alignItems: 'flex-end',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <Button onClick={openAlert} title="true" className="btn-round btn-icon btn-icon-mini btn-neutral btn btn-danger" style={{ marginRight: 5 }}>
              <i className='nc-icon nc-simple-remove'></i>
            </Button>
          </div>
        </div>
      </div>
      <div className='card-body' style={{ minHeight: 100 }}>
        <div className='author' style={{ marginTop: -20 }}>
          <a href='#alguien' style={{ textDecoration: 'none' }}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
              <div
                className='avatar border-gray'
                style={{
                  width: 124,
                  height: 124,
                  position: 'relative',
                  backgroundColor: '#34B18A',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  display: 'flex',
                }}>
                <h1 style={{
                  justifyContent: 'center',
                  marginBottom: 0,
                  fontSize: 60,
                  color: 'white',
                }}>C</h1>
              </div>
            </div>
          </a>
          <a href='#' style={{ textDecoration: 'none' }}>
            <h5>{name}</h5>
          </a>
          <p className='description'>{email}</p>
          <Badge color={getStatusColor()}>{getStatus(status)}</Badge>
        </div>
      </div>
      <div>
        <Form style={{ padding: "5%" }} onSubmit={formik.handleSubmit}>
          <FormGroup className='button-container'>
            <label className="form-label" htmlFor="roles">Roles</label>
            <Select
              disabled={true}
              className="react-select"
              classNamePrefix="react-select"
              id="roles"
              name="roles"
              placeholder="Roles"
              closeMenuOnSelect={false}
              isMulti
              value={formik.values.roles}
              onChange={value => formik.setFieldValue("roles", value)}
              onBlur={formik.handleBlur}
              options={officeBranchRoles ? officeBranchRoles.map(role => {
                return { value: role.id, label: role.name }
              }) : []}
            />
            {
              includes(permission.resources, ROLE_RESOURCE) ?
                <Forbidden message={ROLE_FORBIDDEN_MESSAGE} />
                : <></>
            }
          </FormGroup>
          <Button
            style={{ marginLeft: "60%" }}
            className="btn-round btn-primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Actualizar
          </Button>
        </Form>
      </div>
    </div>
  </>)
};
