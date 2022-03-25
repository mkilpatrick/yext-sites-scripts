import { spawn } from 'child_process';

export const generateTestData = async (featureConfig: any, siteId: string) => {
  const generateTestDataExec = spawn('yext', ['sites', 'generate-test-data']);

  generateTestDataExec.stdout.on('data', (data: any) => {
    console.log(`stdout: ${data}`);
  });

  generateTestDataExec.stderr.on('data', (data: any) => {
    console.log(`stderr: ${data}`);
  });
};
