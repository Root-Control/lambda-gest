'use strict';
require('dotenv').config();
const { parseUserFromToken } = require('./authorization/jwt');
const { getRedisClient } = require('./cache/redis2');
const { v4 } = require('uuid');
const { MarkValidator } = require('./validators/mark.validator');
const moment = require('moment');
const { getAbstractTime } = require('./http-calls/abstract');
const { diffInMinutes } = require('./helpers/utils');

exports.ping = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Valor obtenido con éxito'
    }),
  };
}

exports.handler = async (event) => {
  const client = await getRedisClient();

  // Utilizar client para interactuar con Redis
  const valor = await client.get('user_2016');
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Valor obtenido con éxito',
      valor: valor,
    }),
  };
};

exports.test = async (event) => {
  const tmpKey = v4();
  let realDate;



  const user = {
    "id": 1,
    "name": "Luis Alberto",
    "id_number": "DNI/76001085",
    "lastname": "Gangas Vasquez",
    "background": {
        "id": 2,
        "name": null,
        "team_id": 2,
        "end_contract": null,
        "indefinite_contract": true,
        "init_contract": null,
        "id_number_code": "DNI",
        "id_number_format": "76001085"
    },
    "subcompany": {
        "id": 1,
        "name": "Empresa principal",
        "team_id": 2,
        "business_name": "Empresa principal",
        "address": null
    },
    "currentTeam": {
        "id": 2,
        "name": "Luis Sac",
        "marksettings_contract_not_restrict_mark": false,
        "country": {
            "id": 3,
            "name": "México",
            "location_name": "México city"
        }
    },
    "shift": {
        "config_in_use": {
            "ordinary_hours_maximum_amount_daily": {
                "time": "10:00",
                "seconds": 36000,
                "minutes": 600
            },
            "ordinary_hours_maximum_amount_weekly": {
                "time": "45:00",
                "seconds": 162000,
                "minutes": 2700
            },
            "extraordinary_hours_maximum_amount_daily": {
                "time": "02:00",
                "seconds": 7200,
                "minutes": 120
            },
            "extraordinary_hours_maximum_amount_weekly": {
                "time": "12:00",
                "seconds": 43200,
                "minutes": 720
            },
            "extraordinary_hours_maximum_amount_6th_day": {
                "time": "07:30",
                "seconds": 27000,
                "minutes": 450
            },
            "minimum_amount_rest_between_days": {
                "time": "10:00",
                "seconds": 36000,
                "minutes": 600
            },
            "tolerance_start_day": {
                "time": "00:15",
                "seconds": 900,
                "minutes": 15
            },
            "tolerance_end_day": {
                "time": "00:15",
                "seconds": 900,
                "minutes": 15
            },
            "start_night_time": {
                "time": "19:00",
                "seconds": 68400,
                "minutes": 1140
            },
            "end_night_time": {
                "time": "06:00",
                "seconds": 21600,
                "minutes": 360
            }
        },
        "extra_config": {
            "minimum_hours_considerer_lunch": {
                "time": "06:00",
                "seconds": 21600,
                "minutes": 360
            },
            "default_lunch": {
                "time": "01:00",
                "seconds": 3600,
                "minutes": 60
            },
            "consideration_early_start_shift": {
                "value": false
            },
            "consideration_after_end_shift": {
                "value": false
            },
            "tolerance_start_normalized": {
                "value": true
            },
            "tolerance_end_normalized": {
                "value": true
            },
            "considered_shift_lunch": {
                "value": true
            }
        }
    }
  }
  const { location_name } = user.currentTeam.country;
  console.log(1);
  const result = await getAbstractTime(location_name)
  console.log('?????????????????');
  const body = {
    "timeOffline": "1000",
    "date": "2024-01-01",
    "time": "10:00:00",
    "mark_type": "start",
    "img": "dsdas",
    "location": "1",
    "realDate": "2024-01-01",
    "status_location": "no-gps"
  };

  let redis = await getRedisClient();

  const { date } = body;
    
  const locationKey = `location_${body.location}`;
  const markTypeKey = `mark_type_${body.mark_type}`;
  const workerDayPattern = `${date}_${user.id}_${user.currentTeam.id}`;
  const workerDayJustification = `${workerDayPattern}_justification`;
  const shiftPattern = `shift`;
  const shiftUserKey = `${shiftPattern}_${user.currentTeam.id}_${user.id}`;

  const markValidator = new MarkValidator(user, date);
  
  let workerDay = await redis.get(workerDayPattern);
  const workerDayJustificationExists = await redis.get(workerDayJustification);

  let shiftId = null;
  const markType = await redis.get(markTypeKey);

  if (body.shift) {
    const shiftKey = `${shiftPattern}_${body.shift}`;
    shiftId = await redis.get(shiftKey);
  } else {
    shiftId = await redis.get(shiftUserKey);
  }

  let locationStatus = null;

  switch (body.status_location) {
    case 'no-gps':
      locationStatus = await redis.get(`mark_location_status_gps_disabled`);
      break;
    case 'not-found':
      locationStatus = await redis.get(`mark_location_status_outside_allowed_area`);
      break;
    case 'found':
    case 'found+':
      locationStatus = await redis.get(`mark_location_status_ok`);
      break;
  }

  const location = await redis.get(locationKey);

  if (
    body.realDate &&
    moment(body.realDate, 'YYYY-MM-DD', true).isValid()
  ) {
    realDate = body.realDate;
  }

  markValidator
    .isValidUser()
    .isValidContract()
    .workerDayexists(workerDay, body.mark_type)
    .verifyUserShift(shiftId)
    .haveJustifiedAssistance(workerDayJustificationExists);

  const { errors, outOfContract } = markValidator;

  if (!workerDay) {
    workerDay = {
      date,
      shift_id: shiftId,
      user_id: user.id,
      team_id: user.currentTeam.id,
      tmpKey,
      type: body.mark_type, //Es para cachear
    };
  }

  const payload = {
    data: {
      name: `${user.name} ${user.lastname}`,
      second_id_number: user.background ? user.background.id_number_code + ' ' + user.background.id_number_format : '',
      id_number: user.id_number,
      org_name: user.currentTeam.name,
      markType: body.mark_type,
      time: body.time,
      location_name: location.name,
      location_address: location.location_address,
      schedule_start: 'ToFill',
      schedule_lunch: 'ToFill',
      schedule_end: 'ToFill',
      subcompany_id_number: user.subcompany.id,
      subcompany_business_name: user.subcompany.business_name,
      subcompany_address: user.subcompany.address,
      date: moment(date),
    },
    mark: {
      tmpKey,
      time: body.time,
      photo: 'ToFill',
      latitude: body.latitude,
      longitude: body.longitude,
      mark_type_id: markType.id,
      location_id: location.id,
      worker_day_id: null,
      shift_id: shiftId,
      date: realDate,
      data: 'ToFillFromDataObject',
      crypt_data: 'ToFillEncryptedDataObject',
      time_parameters: { ...user.shift.config_in_use, ...user.shift.extra_config },
      location_status_id: locationStatus.id,
      source: body.source || null,
      management_center_id: body.management_center_id || null,
      errors,
      valid: errors.length ? false : true,
      device_time: body.time,
      use_service: false,
      service_time: null,
      time_service_alert: false,
    },
    workerDay,
    metadata: {
      outOfContract,
    },
  };
    if (result) {
     const [, time] = result.datetime.split(' ');
     const deviceTime = payload.data.time;
 
     payload.mark.use_service = true;
     payload.mark.service_time = time;
     payload.mark.time_service_alert = diffInMinutes(deviceTime, time) > 15;
   }
 
   console.log('SAVING TO REDIS');
   await redis.rPush('gesttiona_mark' ,JSON.stringify(payload))
  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  }
};



exports.mark = async (event, context, callback) => {
  const tmpKey = v4();
  let realDate;

  const { Authorization } = event.headers;

  if (!Authorization) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'La cabecera Authorization no está presente' })
    };
  }


  const [, token] = Authorization.split(' ');
  const user = await parseUserFromToken(token);
  const { location_name } = user.currentTeam.country;
  console.log(1);
  const result = await getAbstractTime(location_name)
  console.log('?????????????????');
  const body = JSON.parse(event.body);

  let redis = await getRedisClient();

  const { date } = body;
    
  const locationKey = `location_${body.location}`;
  const markTypeKey = `mark_type_${body.mark_type}`;
  const workerDayPattern = `${date}_${user.id}_${user.currentTeam.id}`;
  const workerDayJustification = `${workerDayPattern}_justification`;
  const shiftPattern = `shift`;
  const shiftUserKey = `${shiftPattern}_${user.currentTeam.id}_${user.id}`;

  const markValidator = new MarkValidator(user, date);
  
  let workerDay = await redis.get(workerDayPattern);
  const workerDayJustificationExists = await redis.get(workerDayJustification);

  let shiftId = null;
  const markType = await redis.get(markTypeKey);

  if (body.shift) {
    const shiftKey = `${shiftPattern}_${body.shift}`;
    shiftId = await redis.get(shiftKey);
  } else {
    shiftId = await redis.get(shiftUserKey);
  }

  let locationStatus = null;

  switch (body.status_location) {
    case 'no-gps':
      locationStatus = await redis.get(`mark_location_status_gps_disabled`);
      break;
    case 'not-found':
      locationStatus = await redis.get(`mark_location_status_outside_allowed_area`);
      break;
    case 'found':
    case 'found+':
      locationStatus = await redis.get(`mark_location_status_ok`);
      break;
  }

  const location = await redis.get(locationKey);

  if (
    body.realDate &&
    moment(body.realDate, 'YYYY-MM-DD', true).isValid()
  ) {
    realDate = body.realDate;
  }

  markValidator
    .isValidUser()
    .isValidContract()
    .workerDayexists(workerDay, body.mark_type)
    .verifyUserShift(shiftId)
    .haveJustifiedAssistance(workerDayJustificationExists);

  const { errors, outOfContract } = markValidator;

  if (!workerDay) {
    workerDay = {
      date,
      shift_id: shiftId,
      user_id: user.id,
      team_id: user.currentTeam.id,
      tmpKey,
      type: body.mark_type, //Es para cachear
    };
  }

  const payload = {
    data: {
      name: `${user.name} ${user.lastname}`,
      second_id_number: user.background ? user.background.id_number_code + ' ' + user.background.id_number_format : '',
      id_number: user.id_number,
      org_name: user.currentTeam.name,
      markType: body.mark_type,
      time: body.time,
      location_name: location.name,
      location_address: location.location_address,
      schedule_start: 'ToFill',
      schedule_lunch: 'ToFill',
      schedule_end: 'ToFill',
      subcompany_id_number: user.subcompany.id,
      subcompany_business_name: user.subcompany.business_name,
      subcompany_address: user.subcompany.address,
      date: moment(date),
    },
    mark: {
      tmpKey,
      time: body.time,
      photo: 'ToFill',
      latitude: body.latitude,
      longitude: body.longitude,
      mark_type_id: markType.id,
      location_id: location.id,
      worker_day_id: null,
      shift_id: shiftId,
      date: realDate,
      data: 'ToFillFromDataObject',
      crypt_data: 'ToFillEncryptedDataObject',
      time_parameters: { ...user.shift.config_in_use, ...user.shift.extra_config },
      location_status_id: locationStatus.id,
      source: body.source || null,
      management_center_id: body.management_center_id || null,
      errors,
      valid: errors.length ? false : true,
      device_time: body.time,
      use_service: false,
      service_time: null,
      time_service_alert: false,
    },
    workerDay,
    metadata: {
      outOfContract,
    },
  };
    if (result) {
     const [, time] = result.datetime.split(' ');
     const deviceTime = payload.data.time;
 
     payload.mark.use_service = true;
     payload.mark.service_time = time;
     payload.mark.time_service_alert = diffInMinutes(deviceTime, time) > 15;
   }
 
   console.log('SAVING TO REDIS');
   await redis.rPush('gesttiona_mark' ,JSON.stringify(payload))
  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  }
}

async function processBackground(locationName, payload, redis) {
  const result = await getAbstractTime(locationName)

/*   if (result) {
    const [, time] = result.datetime.split(' ');
    const deviceTime = payload.data.time;

    payload.mark.use_service = true;
    payload.mark.service_time = time;
    payload.mark.time_service_alert = diffInMinutes(deviceTime, time) > 15;
  }

  console.log('SAVING TO REDIS');
  await redis.rPush('gesttiona_mark' ,JSON.stringify(payload)); */
}