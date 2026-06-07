export interface CriterionConfig {
  id: string;
  weight: number;
  type: 'benefit' | 'cost';
}

export interface TopsisInput {
  candidateId: string;
  scores: Record<string, number>;
}

export interface TopsisResult {
  candidateId: string;
  dPlus: number;
  dMinus: number;
  preferenceScore: number;
  ranking: number;
  isAccepted: boolean;
  normalizedRow: Record<string, number>;
  weightedRow: Record<string, number>;
}

export interface TopsisSnapshot {
  decisionMatrix: Record<string, Record<string, number>>;
  normalizedMatrix: Record<string, Record<string, number>>;
  weightedMatrix: Record<string, Record<string, number>>;
  idealPositive: Record<string, number>;
  idealNegative: Record<string, number>;
  results: TopsisResult[];
}

const emptySnapshot = (): TopsisSnapshot => ({
  decisionMatrix: {},
  normalizedMatrix: {},
  weightedMatrix: {},
  idealPositive: {},
  idealNegative: {},
  results: [],
});

export function runTopsis(
  inputs: TopsisInput[],
  criteria: CriterionConfig[],
  quota = 3
): TopsisSnapshot {
  if (!inputs.length || !criteria.length) return emptySnapshot();

  const activeCriteria = criteria.filter(c => c.weight > 0);
  const cIds = activeCriteria.map(c => c.id);

  // Step 1: Decision matrix
  const dm: Record<string, Record<string, number>> = {};
  inputs.forEach(inp => {
    dm[inp.candidateId] = {};
    cIds.forEach(cId => { dm[inp.candidateId][cId] = inp.scores[cId] ?? 0; });
  });

  // Step 2: Normalize (Euclidean)
  const nm: Record<string, Record<string, number>> = {};
  inputs.forEach(inp => { nm[inp.candidateId] = {}; });
  cIds.forEach(cId => {
    const sqrtSum = Math.sqrt(inputs.reduce((s, inp) => s + dm[inp.candidateId][cId] ** 2, 0)) || 1;
    inputs.forEach(inp => { nm[inp.candidateId][cId] = dm[inp.candidateId][cId] / sqrtSum; });
  });

  // Step 3: Weight
  const wm: Record<string, Record<string, number>> = {};
  inputs.forEach(inp => {
    wm[inp.candidateId] = {};
    cIds.forEach(cId => {
      const cr = activeCriteria.find(c => c.id === cId)!;
      wm[inp.candidateId][cId] = cr.weight * nm[inp.candidateId][cId];
    });
  });

  // Steps 4 & 5: Ideal solutions
  const aPlus: Record<string, number> = {};
  const aMinus: Record<string, number> = {};
  cIds.forEach(cId => {
    const cr = activeCriteria.find(c => c.id === cId)!;
    const vals = inputs.map(inp => wm[inp.candidateId][cId]);
    if (cr.type === 'benefit') {
      aPlus[cId] = Math.max(...vals);
      aMinus[cId] = Math.min(...vals);
    } else {
      aPlus[cId] = Math.min(...vals);
      aMinus[cId] = Math.max(...vals);
    }
  });

  // Steps 6–8: Distance and preference
  const rawResults = inputs.map(inp => {
    const dPlus = Math.sqrt(cIds.reduce((s, cId) => s + (wm[inp.candidateId][cId] - aPlus[cId]) ** 2, 0));
    const dMinus = Math.sqrt(cIds.reduce((s, cId) => s + (wm[inp.candidateId][cId] - aMinus[cId]) ** 2, 0));
    const preferenceScore = dPlus + dMinus === 0 ? 1 : dMinus / (dPlus + dMinus);
    return { candidateId: inp.candidateId, dPlus, dMinus, preferenceScore, normalizedRow: nm[inp.candidateId], weightedRow: wm[inp.candidateId] };
  });

  // Step 9: Rank
  rawResults.sort((a, b) => b.preferenceScore - a.preferenceScore);
  const results: TopsisResult[] = rawResults.map((r, i) => ({
    ...r, ranking: i + 1, isAccepted: i < quota,
  }));

  return { decisionMatrix: dm, normalizedMatrix: nm, weightedMatrix: wm, idealPositive: aPlus, idealNegative: aMinus, results };
}
