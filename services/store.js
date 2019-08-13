const csv = require('csvtojson');

const inputCSVData = './data/data.csv';
const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);
const changeCase = require('change-case');
const _ = require('lodash');

const Store = async () => {
  const validateData = async (dataToValidate) => {
    const dataSchema = Joi.object().keys({
      PROJECT: Joi.string()
        .max(64)
        .required(),
      SHOT: Joi.string()
        .max(64)
        .required(),
      VERSION: Joi.number()
        .integer()
        .min(0)
        .max(65535)
        .required(),
      STATUS: Joi.string()
        .max(32)
        .required(),
      FINISH_DATE: Joi.date()
        .format('YYYY-MM-DD')
        .required(),
      INTERNAL_BID: Joi.number()
        .max(65535)
        .required(),
      CREATED_DATE: Joi.date()
        .format('YYYY-MM-DD HH:mm')
        .required()
    });
    Joi.validate(dataToValidate, dataSchema, (err) => {
      if (err) Promise.reject(err);
    });
  };

  try {
    const jsonFromCSV = await csv({ delimiter: '|' }).fromFile(inputCSVData);
    const promises = _.map(jsonFromCSV, async (obj, index) => {
      await validateData(obj);
      // set all keys from constantCase to snakeCase
      _.each(obj, (value, key) => {
        const casedKey = changeCase.snakeCase(key);
        obj[casedKey] = value.toString();
        delete obj[key];
      });
      // set an id on the object
      obj.id = index;
      return obj;
    });
    return Promise.all(promises);
  }
  catch (error) {
    throw new Error(error);
  }
};

module.exports = Store;
