'use strict';
const moment = require('moment');
function diffInMinutes(time1, time2) {
    const formattedTime1 = moment(time1, 'HH:mm:ss');
    const formattedTime2 = moment(time2, 'HH:mm:ss');
    return Math.abs(formattedTime1.diff(formattedTime2, 'minutes'));
}

module.exports = {
    diffInMinutes
}