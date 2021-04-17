const yup = require('yup');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const jsonwebtoken = require('jsonwebtoken');
const { personRepository } = require('../../repositories');
const { ERRORS } = require('../../utils');

module.exports = async (body) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const validated = await schema.validate(body, {
    stripUnknown: true,
  });

  const person = await personRepository.findOne({
    where: { email: validated.email },
  });

  if (!person) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      msg: ERRORS.accessUnauthorized,
    };
  }

  if (
    !bcrypt.compareSync(validated.password, person.getDataValue('password'))
  ) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      msg: ERRORS.accessUnauthorized,
    };
  }

  const token = jsonwebtoken.sign(
    { id: person.getDataValue('id') },
    process.env.JWT_SECRET,
  );

  person.setDataValue('token', token);

  await personRepository.update(person);

  return {
    person,
    token,
  };
};
