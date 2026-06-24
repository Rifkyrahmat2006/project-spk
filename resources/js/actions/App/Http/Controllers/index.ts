import Auth from './Auth'
import DashboardController from './DashboardController'
import Superadmin from './Superadmin'
import Admin from './Admin'
import Candidate from './Candidate'
import ProfileController from './ProfileController'
import NotificationController from './NotificationController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
DashboardController: Object.assign(DashboardController, DashboardController),
Superadmin: Object.assign(Superadmin, Superadmin),
Admin: Object.assign(Admin, Admin),
Candidate: Object.assign(Candidate, Candidate),
ProfileController: Object.assign(ProfileController, ProfileController),
NotificationController: Object.assign(NotificationController, NotificationController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers