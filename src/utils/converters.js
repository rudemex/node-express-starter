const config = require('config');
const moment = require('moment-timezone');

const serverConfig = config['server'];

// Format date
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss', timeZone = `${serverConfig['tz']}`) =>
  moment(date).tz(timeZone).format(format);
// Format date UTC 2013-11-18T11:55Z
const formatDateUTC = (
  date,
  format = 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  timeZone = `${serverConfig['tz']}`,
) => moment(date).tz(timeZone).format(format);
// Format timestamp(unix) to date
const formatTimestampToDate = (
  date,
  format = 'YYYY-MM-DD HH:mm:ss',
  timeZone = `${serverConfig['tz']}`,
) => moment.unix(date).tz(timeZone).format(format);
// Format date to timestamp(unix)
const formatDateToTimestamp = (
  date,
  format = 'YYYY-MM-DD HH:mm:ss',
  timeZone = `${serverConfig['tz']}`,
) => moment(date, format).tz(timeZone).unix();
// Format json to string
const toStringify = (data, replace = null, space = 2) => {
  return JSON.stringify(data, replace, space);
};

module.exports = {
  formatDate,
  formatDateUTC,
  formatTimestampToDate,
  formatDateToTimestamp,
  toStringify,
};
