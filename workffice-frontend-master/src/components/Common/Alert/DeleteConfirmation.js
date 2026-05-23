import PropTypes from 'prop-types'
import SweetAlert from 'react-bootstrap-sweetalert'


export const DeleteConfirmation = ({ title, onConfirm, onCancel }) => {
    return (
        <SweetAlert
            warning
            showConfirm
            showCancel
            style={{ display: "block", marginTop: "-100px" }}
            btnSize="xs"
            title={title}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmBtnBsStyle="primary"
            confirmBtnCssClass="btn-round"
            cancelBtnBsStyle="danger"
            cancelBtnText="Cancelar"
            cancelBtnCssClass="btn-round"
        >
        </SweetAlert>
    )
}

DeleteConfirmation.propTypes = {
    title: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
