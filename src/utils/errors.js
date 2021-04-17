module.exports = {
  alreadtExists: (param) => `${param}-already-exists`,
  internalServerError: 'internal-server-error',
  notFound: (param) => `${param}-not-found`,
  emailUnavailable: 'email-unavailable',
  accessUnauthorized: 'access-unauthorized',
};
