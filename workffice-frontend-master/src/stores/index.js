import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { LOADING } from './actions';
import { activateAccountReducer } from './reducers/auth/activateAccountReducer';
import { activatePasswordReducer } from './reducers/auth/activatePasswordReducer';
import { loginReducer } from './reducers/auth/loginReducer';
import { recoveryReducer } from './reducers/auth/recoveryPasswordReducer';
import { registerReducer } from './reducers/auth/registerReducer';
import { resetPasswordReducer } from './reducers/auth/resetPassReducer';
import { collaboratorsReducer } from './reducers/backoffice/collaborator/collaboratorsReducer';
import { loadingCollaboratorReducer } from './reducers/backoffice/collaborator/loading';
import { equipmentsReducer } from './reducers/backoffice/equipments/equipmentsReducer';
import { membershipReducer } from './reducers/backoffice/membership/membershipReducer';
import { newsReducer } from './reducers/backoffice/news/newsReducer';
import { loadingOfficeReducer } from './reducers/backoffice/office/loading';
import { officeInactivitiesReducer } from './reducers/backoffice/office/officeInactivitiesReducer';
import { officeReducer } from './reducers/backoffice/office/officeReducer';
import { officesReducer } from './reducers/backoffice/office/officesReducer';
import { loadingOfficeBranchReducer } from './reducers/backoffice/officeBranch/loadingReducer';
import { officeBranchAdminReducer } from './reducers/backoffice/officeBranch/officeBranchAdminReducer';
import { officeBranchDetailReducer } from './reducers/backoffice/officeBranch/officeBranchDetailReducer';
import { officeBranchesReducer } from './reducers/backoffice/officeBranch/officeBranchesAdminReducer';
import { collaboratorRolesReducer, rolesReducer } from './reducers/backoffice/rolesReducer';
import { servicesReducer } from './reducers/backoffice/services/servicesReducer';
import { userMeReducer } from './reducers/backoffice/userReducer';
import { bookingReducer, mercadoPagoPreferenceReducer, officeBookingsReducer, userBookingsReducer } from './reducers/booking/bookingReducer';
import { loadingBookingReducer } from './reducers/booking/loadingReducer';
import { membershipAcquisitionReducer, membershipAcquisitionsReducer, mercadoPagoPreferenceReducer as membershipAcquisitionMercadoPagoPreferenceReducer } from './reducers/booking/membershipAcquisitionReducer';
import { entityNotFoundReducer } from './reducers/errors/notFoundReducer';
import { permissionReducer } from './reducers/errors/permissionReducer';
import { notificationReducer } from './reducers/notification/writeNotificationReducer';
import { bookingsQuantityPerOfficeReducer, revenuePerMonthReducer, revenuePerOfficeReducer } from './reducers/reports/reportsReducer';
import { reviewReducer } from './reducers/reviews/reviewReducer';
import { loadingOfficeBranchSearchReducer } from './reducers/search/loadingReducer';
import { officeBranchSearchReducer } from './reducers/search/officeBranchSearchReducer';

const isLoadingReducer = (state = false, { type, payload }) => {
  let currentState = state;
  if (type === LOADING) {
    currentState = payload;
  }
  return currentState;
};


export const reducers = routes =>
  combineReducers({
    router: connectRouter(routes),
    // Authentication
    login: loginReducer,
    userMe: userMeReducer,
    resetPaswword: resetPasswordReducer,
    activateUser: activateAccountReducer,
    activatePass: activatePasswordReducer,
    recovery: recoveryReducer,
    register: registerReducer,
    // Collaborators
    collaborators: collaboratorsReducer,
    loadingCollaborator: loadingCollaboratorReducer,
    collaboratorRoles: collaboratorRolesReducer,
    // Roles
    roles: rolesReducer,
    // Office branch
    officeBranches: officeBranchesReducer,
    officeBranch: officeBranchAdminReducer,
    loadingOfficeBranch: loadingOfficeBranchReducer,
    officeBranchDetail: officeBranchDetailReducer,
    officesFound: officeBranchSearchReducer, // TODO rename to officeBranchesFound
    loadingOfficeBranchSearch: loadingOfficeBranchSearchReducer,
    // Office
    office: officeReducer,
    offices: officesReducer,
    officeInactivities: officeInactivitiesReducer,
    loadingOffice: loadingOfficeReducer,
    // Services & Equipments
    services: servicesReducer,
    equipments: equipmentsReducer,
    // Booking
    booking: bookingReducer,
    mercadoPagoPreference: mercadoPagoPreferenceReducer,
    userBookings: userBookingsReducer,
    officeBookings: officeBookingsReducer,
    loadingBooking: loadingBookingReducer,
    // Errors
    entitiesNotFound: entityNotFoundReducer,
    permission: permissionReducer,
    // Notification
    notification: notificationReducer,
    isLoading: isLoadingReducer,
    // Report
    bookingsQuantityPerOffice: bookingsQuantityPerOfficeReducer,
    revenuePerOffice: revenuePerOfficeReducer,
    revenuePerMonth: revenuePerMonthReducer,
    // NEWS
    news: newsReducer,
    // Review
    reviews: reviewReducer,
    // Membership
    memberships: membershipReducer,
    // Membership acquisitions
    newMembershipAcquisition: membershipAcquisitionReducer,
    membershipAcquisitions: membershipAcquisitionsReducer,
    mercadoPagoPreferenceMembershipAcquisition: membershipAcquisitionMercadoPagoPreferenceReducer,
  });
