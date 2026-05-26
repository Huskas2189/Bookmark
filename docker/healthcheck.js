import http from 'node:http';

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/healthcheck',
    method: 'GET'
};

http.request(options, (res) => {
    if (res.statusCode !== 200) {
        console.log(
            `Error with healthcheck with status ${res.statusCode} and message: ${res.statusMessage}`
        );
        process.exit(1);
    }
    process.exit(0);
})
    .on('error', (err) => {
        console.log('Error: ', err);
        process.exit(1);
    })
    .end();
