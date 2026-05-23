import { LoginContainer } from "../containers/LoginContainer";
import { RegisterContainer } from "../containers/RegisterContainer";
import { ConfirmationAccount } from "../views/pages/ConfirmationAccount";
import { RecoveryPasswordContainer } from "../containers/RecoveryPasswordContainer";
import { ConfirmationRecovery } from "../views/pages/authentication/ConfirmationRecovery";
import { ResetPasswordContainer } from "../containers/ResetPasswordContainer";
import { ConfirmationPassword } from "../views/pages/authentication/ConfirmationPassword";
import { ConfirmationPage } from "../views/pages/authentication/ConfirmationPage";
import { ConfirmationCollaboratorPage } from "../views/pages/authentication/ConfirmationCollaboratorPage";


export const routes = [
  {
    path: '/login',
    name: 'Login',
    mini: 'L',
    component: LoginContainer,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    mini: 'R',
    component: RegisterContainer,
    layout: '/auth',
  },
  {
    path: '/recovery-password',
    name: 'RecoveryPassword',
    mini: 'LS',
    component: RecoveryPasswordContainer,
    layout: '/auth',
  },
  {
    path: '/confirmation-account',
    name: 'ConfirmationAccount',
    mini: 'LS',
    component: ConfirmationAccount,
    layout: '/auth',
  },
  {
    path: '/confirmation-recovery',
    name: 'ConfirmationRecoveryPassword',
    mini: 'LS',
    component: ConfirmationRecovery,
    layout: '/auth',
  },
  {
    path: '/reset-password',
    name: 'ResetPasswordContainer',
    mini: 'LS',
    component: ResetPasswordContainer,
    layout: '/auth',
  },
  {
    path: '/confirmation-password',
    name: 'ConfirmationPasswordContainer',
    mini: 'LS',
    component: ConfirmationPassword,
    layout: '/auth',
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    mini: 'LS',
    component: ConfirmationPage,
    layout: '/auth',
  },
  {
    path: '/collaborator/activate',
    name: 'ConfirmCollab',
    mini: 'LS',
    component: ConfirmationCollaboratorPage,
    layout: '/auth',
  },


  // {
  //   collapse: true,
  //   name: 'Pages',
  //   icon: 'nc-icon nc-book-bookmark',
  //   state: 'pagesCollapse',
  //   views: [
  //     {
  //       path: '/timeline',
  //       name: 'Timeline',
  //       mini: 'T',
  //       component: Timeline,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/login',
  //       name: 'Login',
  //       mini: 'L',
  //       component: Login,
  //       layout: '/auth',
  //     },
  //     {
  //       path: '/register',
  //       name: 'Register',
  //       mini: 'R',
  //       component: Register,
  //       layout: '/auth',
  //     },
  //     {
  //       path: '/lock-screen',
  //       name: 'LockScreen',
  //       mini: 'LS',
  //       component: LockScreen,
  //       layout: '/auth',
  //     },
  //     {
  //       path: '/user-profile',
  //       name: 'UserProfile',
  //       mini: 'UP',
  //       component: UserProfile,
  //       layout: '/admin',
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: 'Components',
  //   icon: 'nc-icon nc-layout-11',
  //   state: 'componentsCollapse',
  //   views: [
  //     {
  //       path: '/buttons',
  //       name: 'Buttons',
  //       mini: 'B',
  //       component: Buttons,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/grid-system',
  //       name: 'Grid System',
  //       mini: 'GS',
  //       component: GridSystem,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/panels',
  //       name: 'Panels',
  //       mini: 'P',
  //       component: Panels,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/sweet-alert',
  //       name: 'Sweet Alert',
  //       mini: 'SA',
  //       component: SweetAlert,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/notifications',
  //       name: 'Notifications',
  //       mini: 'N',
  //       component: Notifications,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/icons',
  //       name: 'Icons',
  //       mini: 'I',
  //       component: Icons,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/typography',
  //       name: 'Typography',
  //       mini: 'T',
  //       component: Typography,
  //       layout: '/admin',
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: 'Forms',
  //   icon: 'nc-icon nc-ruler-pencil',
  //   state: 'formsCollapse',
  //   views: [
  //     {
  //       path: '/regular-forms',
  //       name: 'Regular Forms',
  //       mini: 'RF',
  //       component: RegularForms,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/extended-forms',
  //       name: 'Extended Forms',
  //       mini: 'EF',
  //       component: ExtendedForms,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/validation-forms',
  //       name: 'Validation Forms',
  //       mini: 'VF',
  //       component: ValidationForms,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/wizard',
  //       name: 'Wizard',
  //       mini: 'W',
  //       component: Wizard,
  //       layout: '/admin',
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: 'Tables',
  //   icon: 'nc-icon nc-single-copy-04',
  //   state: 'tablesCollapse',
  //   views: [
  //     {
  //       path: '/regular-tables',
  //       name: 'Regular Tables',
  //       mini: 'RT',
  //       component: RegularTables,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/extended-tables',
  //       name: 'Extended Tables',
  //       mini: 'ET',
  //       component: ExtendedTables,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/react-tables',
  //       name: 'React Tables',
  //       mini: 'RT',
  //       component: ReactTables,
  //       layout: '/admin',
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: 'Maps',
  //   icon: 'nc-icon nc-pin-3',
  //   state: 'mapsCollapse',
  //   views: [
  //     {
  //       path: '/google-maps',
  //       name: 'Google Maps',
  //       mini: 'GM',
  //       component: GoogleMaps,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/full-screen-map',
  //       name: 'Full Screen Map',
  //       mini: 'FSM',
  //       component: FullScreenMap,
  //       layout: '/admin',
  //     },
  //     {
  //       path: '/vector-map',
  //       name: 'Vector Map',
  //       mini: 'VM',
  //       component: VectorMap,
  //       layout: '/admin',
  //     },
  //   ],
  // },
  // {
  //   path: '/widgets',
  //   name: 'Widgets',
  //   icon: 'nc-icon nc-box',
  //   component: Widgets,
  //   layout: '/admin',
  // },
  // {
  //   path: '/charts',
  //   name: 'Charts',
  //   icon: 'nc-icon nc-chart-bar-32',
  //   component: Charts,
  //   layout: '/admin',
  // },
  // {
  //   path: '/calendar',
  //   name: 'Calendar',
  //   icon: 'nc-icon nc-calendar-60',
  //   component: Calendar,
  //   layout: '/admin',
  // },
];