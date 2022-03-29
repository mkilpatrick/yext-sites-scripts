import { spawn } from 'child_process';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateTestData = async (featureConfig: any, siteId: string) => {
  const generateTestDataExec = spawn('yext', ['sites', 'generate-test-data']);

  generateTestDataExec.stdout.pipe(process.stdout);
  generateTestDataExec.stderr.pipe(process.stderr);
  process.stdin.pipe(generateTestDataExec.stdin);

  generateTestDataExec.stderr.on('data', (data: any) => {
    process.stderr.write(`stderr: ${data}`);
  });
};
