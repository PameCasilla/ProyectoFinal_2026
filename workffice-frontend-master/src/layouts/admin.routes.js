import { DashboardContainer } from '../containers/backoffice/DashboardContainer';
import { MembershipsContainer } from '../containers/backoffice/mebmership/MembershipContainer';
import { MembershipCreateContainer, MembershipEditContainer } from '../containers/backoffice/mebmership/MembershipCreateContainer';
import { newsContainer } from '../containers/backoffice/news/newsContainer';
import { NewsEditContainer } from '../containers/backoffice/news/NewsEditContainer';
import { NewsListContainer } from '../containers/backoffice/news/NewsListContainer';
import { OfficeBookingContainer } from '../containers/backoffice/OfficeBookingContainer';
import { OfficeBranchDetailContainer } from '../containers/backoffice/OfficeBranchDetailContainer';
import { OfficeBranchEditContainer } from '../containers/backoffice/OfficeBranchEditContainer';
import { OfficeCreateContainer } from '../containers/backoffice/OfficeCreateContainer';
import { OfficeDetailContainer } from '../containers/backoffice/OfficeDetailContainer';
import { OfficeEditContainer } from '../containers/backoffice/OfficeEditContainer';
import { OfficesContainer } from '../containers/backoffice/OfficesContainer';
import { OfficesSearchContainer } from '../containers/backoffice/OfficesSearchContainer';
import { NewRoleContainer, RolesListContainer } from '../containers/backoffice/RoleContainer';
import { ServicesEquipmentsContainer } from '../containers/backoffice/ServicesEquipmentsContainer';
import { BookingDetailContainer } from '../containers/booking/BookingDetailContainer';
import { OfficeBookingListContainer, UserBookingListContainer, UserPastBookingListContainer } from '../containers/booking/BookingListContainer';
import { MembershipAcquisitionListContainer } from '../containers/booking/MembershipAcquisitionListContainer';
import { CollaboratorContainer, CollaboratorListContainer } from '../containers/CollaboratorContainer';
import FrequentQuestions from '../containers/FrecuentQuestions';
import { NewReviewContainer } from '../containers/reviews/NewReviewContainer';
import { UserProfileContainer } from '../containers/UserProfileContainer';



export const adminRoutes = [
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
    visibility: true,
    views: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        mini: 'D',
        component: DashboardContainer,
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
    visibility: true,
    views: [
      {
        path: '/office-branch',
        name: 'Mi sucursal',
        mini: 'MS',
        component: OfficeBranchDetailContainer,
        layout: '/admin',
        visibility: true,
      },
      {
        path: '/edit-officebranch',
        name: 'Editar Sucursal',
        mini: 'ES',
        layout: '/admin',
        visibility: true,
        component: OfficeBranchEditContainer,
      },
      {
        path: '/select',
        name: 'Cambiar Sucursal',
        mini: 'NS',
        layout: '/office-branch',
        visibility: true,
      },
    ]
  },
  {
    collapse: true,
    name: 'Oficinas',
    icon: 'fa fa-laptop',
    state: 'officesCollapse',
    visibility: true,
    views: [
      {
        path: '/offices',
        name: 'Mis Oficinas',
        mini: 'MO',
        component: OfficesContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/new-office',
        name: 'Nueva oficina',
        mini: 'NO',
        component: OfficeCreateContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/offices/edit',
        name: 'Editar oficina',
        mini: 'EO',
        component: OfficeEditContainer,
        layout: '/admin',
        visibility: false
      },
      {
        path: '/services-equipment',
        name: 'Servicios y equipamiento',
        mini: 'SE',
        component: ServicesEquipmentsContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/office-detail',
        component: OfficeDetailContainer,
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
    visibility: true,
    views: [
      {
        path: '/collaborators',
        name: 'Colaboradores',
        mini: 'C',
        component: CollaboratorListContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/new-collaborator',
        name: 'Nuevo colaborador',
        mini: 'NC',
        component: CollaboratorContainer,
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
        name: 'Mis reservas',
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
      {
        path: '/office/:id/new-review',
        component: NewReviewContainer,
        layout: '/admin',
        visibility: false,
      },
    ]
  },
  {
    collapse: true,
    name: 'Configuraciones',
    icon: 'fa fa-cog',
    state: 'configurationCollapse',
    visibility: true,
    views: [
      {
        path: '/roles',
        name: 'Gestionar Roles',
        mini: 'GR',
        component: RolesListContainer,
        layout: '/admin',
        visibility: true,
      },
      {
        path: '/new-rol',
        name: 'Nuevo Rol',
        mini: 'NR',
        component: NewRoleContainer,
        layout: '/admin',
      },
      {
        path: '/my-memberships',
        name: 'Gestionar membresías',
        mini: 'GM',
        component: MembershipsContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/new-membership',
        name: 'Nueva membresía',
        mini: 'NM',
        component: MembershipCreateContainer,
        layout: '/admin',
      },
      {
        path: '/membership/edit/:id',
        name: 'Editar Membresía',
        mini: 'NN',
        component: MembershipEditContainer,
        layout: '/admin',
        visibility: false
      },
      {
        path: '/notice',
        name: 'Gestionar noticias',
        mini: 'GN',
        component: NewsListContainer,
        layout: '/admin',
        visibility: true
      },
      {
        path: '/new-notice',
        name: 'Nueva noticia',
        mini: 'NN',
        component: newsContainer,
        layout: '/admin',
      },
      {
        path: '/notice/edit/:id',
        name: 'Editarnoticia',
        mini: 'NN',
        component: NewsEditContainer,
        layout: '/admin',
        visibility: false
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
