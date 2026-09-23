// A separate run label keeps follow-up QA from overwriting phase evidence.
export function qaLabel(phase) {
  const run = process.env.QA_RUN_ID;
  if (run && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(run)) {
    throw new Error('QA_RUN_ID must contain lowercase letters, numbers and single hyphens.');
  }
  return `phase-${phase}${run ? `-${run}` : ''}`;
}
