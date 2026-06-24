import courses from './courses'
import criteria from './criteria'
import users from './users'
import periods from './periods'
import consolidated from './consolidated'
const superadmin = {
    courses: Object.assign(courses, courses),
criteria: Object.assign(criteria, criteria),
users: Object.assign(users, users),
periods: Object.assign(periods, periods),
consolidated: Object.assign(consolidated, consolidated),
}

export default superadmin