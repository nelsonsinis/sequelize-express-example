const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { personRepository } = require('../../repositories');
const { ERRORS } = require('../../utils');

module.exports = async (body) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().equals(['male', 'female']).required(),
    password: yup.string().required(),
    age: yup.number().integer().required(),
  });

  const validated = await schema.validate(body, {
    stripUnknown: true,
  });

  const person = await personRepository.findOne({
    where: {
      email: validated.email,
    },
  });

  if (person) {
    throw {
      status: StatusCodes.CONFLICT,
      msg: ERRORS.emailUnavailable,
    };
  }

  return personRepository.create({
    ...validated,
    password: bcrypt.hashSync(validated.password, 8),
  });
};
