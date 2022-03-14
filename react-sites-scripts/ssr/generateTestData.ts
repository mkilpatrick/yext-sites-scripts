export const generateTestData = async (featureConfig: any, siteId: string) => {
    const { spawn } = require('child_process');
    const generateTestData = spawn('yext', ['sites', 'generate-test-data']);

    generateTestData.stdout.on( 'data', ( data: any ) => {
        console.log( `stdout: ${ data }` );
    } );
    
    generateTestData.stderr.on( 'data', ( data: any ) => {
        console.log( `stderr: ${ data }` );
    } );
};