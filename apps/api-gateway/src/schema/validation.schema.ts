import Joi from 'joi';

export const environmentVariablesSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
}).unknown(true);
