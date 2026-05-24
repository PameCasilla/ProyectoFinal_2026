import { NotAccess } from '../components/Common/ErrorPages/NotAccess';
import { NoticeListComponent } from '../components/Notice/NoticeListComponent';
import { OfficeBookingContainer } from '../containers/backoffice/OfficeBookingContainer';
import { OfficeBranchDetailContainer } from '../containers/backoffice/OfficeBranchDetailContainer';
import { OfficeDetailContainer } from '../containers/backoffice/OfficeDetailContainer';
import { OfficesSearchContainer } from '../containers/backoffice/OfficesSearchContainer';
import { BookingDetailContainer } from '../containers/booking/BookingDetailContainer';
import { OfficeBookingListContainer, UserBookingListContainer, UserPastBookingListContainer } from '../containers/booking/BookingListContainer';
import { MembershipAcquisitionListContainer } from '../containers/booking/MembershipAcquisitionListContainer';
import FrequentQuestions from '../containers/FrecuentQuestions';
import { NewReviewContainer } from '../containers/reviews/NewReviewContainer';
import { UserProfileContainer } from '../containers/UserProfileContainer';

export const renterRoutes = [
  {
    collapse: true,
    name: 'Perfil',
    icon: 'fa fa-user',
    state: 'profileCollapse',
    visibility: true,
    views: [
      {
        path: '/user-profile',
        name: 'Perfil Usuario',
        mini: 'PU',
        component: UserProfileContainer,
        layout: '/admin',
        visibility: true
      },
    ]
  },
  {
    collapse: true,
    name: 'Dashboard',
    icon: 'nc-icon nc-chart-bar-32',
    state: 'dashboardCollapse',
    visibility: false,
    views: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        mini: 'D',
        component: NotAccess,
        layout: '/admin',
        visibility: true
      },
    ]
  },
  {
    collapse: true,
    name: 'Sucursales',
    icon: 'fa fa-building',
    state: 'officebranchCollapse',
    visibility: false,
    views: [
      {
        path: '/office-branch',
        name: 'Mi sucursal',
        mini: 'MS',
        component: OfficeBranchDetailContainer,
        layout: '/admin',
        visibility: false,
      },
      {
        path: '/edit-officebranch',
        name: 'Editar Sucursal',
        mini: 'ES',
        layout: '/admin',
        visibility: false,
        component: NotAccess,
      },
      {
        path: '/select',
        name: 'Cambiar Sucursal',
        mini: 'NS',
        layout: '/office-branch',
        component: NotAccess,
        visibility: false,
      },
    ]
  },
  {
    collapse: true,
    name: 'Oficinas',
    icon: 'fa fa-laptop',
    state: 'officesCollapse',
    visibility: false,
    views: [
      {
        path: '/offices',
        name: 'Oficinas',
        mini: 'O',
        component: NotAccess,
        layout: '/admin',
        visibility: false
      },
      {
        path: '/new-office',
        name: 'Nueva oficina',
        mini: 'NO',
        component: NotAccess,
        layout: '/admin',
        visibility: false
      },
      {
        path: '/offices/edit',
        name: 'Editar oficina',
        mini: 'EO',
        component: NotAccess,
        layout: '/admin',
        visibility: false
      },
      {
        path: '/services-equipment',
        name: 'Servicios y equipamiento',
        mini: 'SE',
        component: NotAccess,
        layout: '/admin',
        visibility: false
      },
      {
        path: '/office-detail',
        // name: 'Detalle',
        // mini: 'SE',
        component: OfficeDetailContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/officebranch/:officeBranchId/office/:officeId/new-review',
        component: NewReviewContainer,
        layout: '/admin',
        visibility: false,
      },
    ]
  },
  {
    collapse: true,
    name: 'Colaboradores',
    icon: 'fa fa-users',
    state: 'collaboratorsCollapse',
    visibility: false,
    views: [
      {
        path: '/collaborators',
        name: 'Colaboradores',
        mini: 'C',
        component: NotAccess,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/new-collaborator',
        name: 'Nuevo colaborador',
        mini: 'NC',
        component: NotAccess,
        layout: '/admin',
        visibility: true
      }
    ]
  },
  {
    collapse: true,
    name: 'Buscar',
    icon: 'fa fa-search',
    state: 'officesSearchCollapse',
    visibility: true,
    views: [
      {
        path: '/search',
        name: 'Sucursales',
        mini: 'O',
        component: OfficesSearchContainer,
        layout: '/admin',
        visibility: true
      }
    ]
  },

  {
    collapse: true,
    name: 'Configuraciones',
    icon: 'fa fa-cog',
    state: 'configurationCollapse',
    visibility: false,
    views: [
      {
        path: '/roles',
        name: 'Gestionar Roles',
        mini: 'GR',
        component: NotAccess,
        layout: '/admin',
        visibility: false,
      },
      {
        path: '/new-rol',
        name: 'Nuevo Rol',
        mini: 'NR',
        component: NotAccess,
        layout: '/admin',
      },
      {
        path: '/membership',
        name: 'Gestionar membresías',
        mini: 'GM',
        component: NotAccess,
        layout: '/admin',
        visibility: false
      },
      {
        path: '/new-membership',
        name: 'Nueva membresía',
        mini: 'NM',
        component: NotAccess,
        layout: '/admin',
      },
      {
        path: '/notice',
        name: 'Gestionar noticias',
        mini: 'GN',
        component: NoticeListComponent,
        layout: '/admin',
        visibility: false
      },
      {
        path: '/new-notice',
        name: 'Nueva noticia',
        mini: 'NN',
        component: NotAccess,
        layout: '/admin',
      },
    ]
  },
  {
    collapse: true,
    name: 'Reserva',
    icon: 'fas fa-clipboard-list',
    state: 'bookingCollapse',
    visibility: true,
    views: [
      {
        path: '/booking',
        name: 'Detalle de reserva',
        mini: 'DR',
        component: BookingDetailContainer,
        layout: '/admin',
        visibility: false,
      },
      {
        path: '/office_bookings',
        name: 'Reservas de oficina',
        mini: 'RO',
        component: OfficeBookingListContainer,
        layout: '/admin',
        visibility: false,
      },
      {
        path: '/bookings/list',
        name: 'Mis reservas', // Workffice22!
        mini: 'LR',
        component: UserBookingListContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/bookings/history',
        name: 'Reservas anteriores',
        mini: 'RA',
        component: UserPastBookingListContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/memberships/acquisitions',
        name: 'Membresias adquiridas',
        mini: 'MA',
        component: MembershipAcquisitionListContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/create-booking',
        name: 'Reservar oficina',
        mini: 'RO',
        component: OfficeBookingContainer,
        layout: '/admin',
        visibility: false,
      },
    ]
  },
  {
    name: 'Preguntas frecuentes',
    icon: 'far fa-question-circle',
    path: '/frequent-questions',
    component: FrequentQuestions,
    layout: '/admin',
    visibility: true,
  },
];
