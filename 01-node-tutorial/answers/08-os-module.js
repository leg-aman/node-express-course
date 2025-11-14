const os = require("os")

console.log(
    `Computer Info: ${os.cpus()},
     System Uptime: ${os.uptime()},
    OS Info: ${os.platform()},
    `
)