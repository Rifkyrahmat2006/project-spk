import candidates from './candidates'
import scores from './scores'
import results from './results'
import topsis from './topsis'
import courses from './courses'
const admin = {
    candidates: Object.assign(candidates, candidates),
scores: Object.assign(scores, scores),
results: Object.assign(results, results),
topsis: Object.assign(topsis, topsis),
courses: Object.assign(courses, courses),
}

export default admin