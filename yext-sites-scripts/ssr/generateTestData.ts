import { spawn } from 'child_process';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateTestData = async (featureConfig: any, siteId: string) => {
  const generateTestDataExec = spawn('yext', ['sites', 'generate-test-data']);

  generateTestDataExec.stdout.on('data', (data: any) => {
    process.stdout.write(`stdout: ${data}`);
  });

  generateTestDataExec.stderr.on('data', (data: any) => {
    process.stderr.write(`stderr: ${data}`);
  });
};
