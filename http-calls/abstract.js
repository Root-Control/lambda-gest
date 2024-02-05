'use strict';
const axios = require('axios');


function getAbstractTime(timezone) {
  return new Promise(async resolve => {
    const url = `${process.env.ABSTRACT_API}/current_time?api_key=${process.env.ABSTRACT_TOKEN}&location=${timezone}`;
    try {
        const response = await axios.get(url);
        console.log('response.data')
        resolve(response.data);
    } catch (ex) {
      console.log(ex.response.data);
      resolve(null)
    }
  })
}

module.exports = {
  getAbstractTime
};