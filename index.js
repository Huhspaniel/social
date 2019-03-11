const env = require('./.env.json');
for (const prop in env) {
    if (!process.env.hasOwnProperty(prop)) {
        process.env[prop] = env[prop];
    }
}

if (process.env.NODE_ENV === 'production') {
    const util = require('util');

    const formatTime = date => {
        date = date.toISOString().replace(/-/g, '/').replace('T', '|');
        return date.slice(0, date.length - 5);
    }

    function timestampLog(stream, ...args) {
        const time = formatTime(new Date());
        stream.write(`[${time}] ${util.format(...args)}\n`);
    }
    console.log = timestampLog.bind(console, process.stdout);
    console.error = timestampLog.bind(console, process.stderr);

    require('./app/cluster');
} else {
    require('./app/server');
}