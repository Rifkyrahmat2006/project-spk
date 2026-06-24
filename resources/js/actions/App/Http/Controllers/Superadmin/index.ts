import CourseController from './CourseController'
import CriteriaController from './CriteriaController'
import UserManagementController from './UserManagementController'
import PeriodController from './PeriodController'
import ConsolidatedResultController from './ConsolidatedResultController'
const Superadmin = {
    CourseController: Object.assign(CourseController, CourseController),
CriteriaController: Object.assign(CriteriaController, CriteriaController),
UserManagementController: Object.assign(UserManagementController, UserManagementController),
PeriodController: Object.assign(PeriodController, PeriodController),
ConsolidatedResultController: Object.assign(ConsolidatedResultController, ConsolidatedResultController),
}

export default Superadmin