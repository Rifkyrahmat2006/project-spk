import CandidateManagementController from './CandidateManagementController'
import ScoreController from './ScoreController'
import TopsisResultController from './TopsisResultController'
import TopsisController from './TopsisController'
const Admin = {
    CandidateManagementController: Object.assign(CandidateManagementController, CandidateManagementController),
ScoreController: Object.assign(ScoreController, ScoreController),
TopsisResultController: Object.assign(TopsisResultController, TopsisResultController),
TopsisController: Object.assign(TopsisController, TopsisController),
}

export default Admin