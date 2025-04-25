class SequelizeInitializationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'SequelizeInitializationError';
    }
  }
  
  class ServiceInitializationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ServiceInitializationError';
    }
  }

  class DatabaseQueryError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DatabaseQueryError';
    }
  }
  
  module.exports = {
    SequelizeInitializationError,
    ServiceInitializationError,
    DatabaseQueryError,
  };