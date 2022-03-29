import { spawn } from 'child_process';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateTestData = async (featureConfig: any, entityId: string) => {
  const generateTestDataExec = spawn('yext', [
    'sites',
    'generate-test-data',
    '--featureName',
    featureConfig?.features[0]?.name,
    '--entityId',
    entityId,
    '--featuresConfig',
    JSON.stringify(featureConfig),
    '--locale',
    'en',
    // '--printDocuments',
  ]);

  generateTestDataExec.stdout.pipe(process.stdout);
  generateTestDataExec.stderr.pipe(process.stderr);
  process.stdin.pipe(generateTestDataExec.stdin);
};
