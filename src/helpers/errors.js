class Nodejs32Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class ValidationError extends Nodejs32Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class WrongParametersError extends Nodejs32Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class NotAuthorizedError extends Nodejs32Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  Nodejs32Error,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
};
