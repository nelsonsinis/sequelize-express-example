const { personRepository } = require('../../repositories');

module.exports = async (id) => {
  const person = await personRepository.findById(id);

  person.setDataValue('token', null);

  return personRepository.update(person);
};
