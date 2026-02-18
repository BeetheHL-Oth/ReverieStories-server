function errorHandler (error, req, res, next) {
  let code;
  let message;
  switch(error.name) {
    case 'SequelizeDatabaseError':
      code = 400
      message = 'Invalid input'
      break;
    case 'SequelizeUniqueConstraintError':
      code = 400
      message = error.errors[0].message
      break;
    case 'SequelizeValidationError':
      code = 400
      message = error.errors[0].message
      break;
    case 'LoginError':
      code = 401
      message = error.message
      break;
    case 'notFound':
      code = 400
      message = error.message
      break;
    case 'unauthorized':
      code = 401
      message = error.message
      break;
    case 'forbidden':
      code = 403
      message = error.message
      break;
    case 'invalidPrompt':
      code = 400
      message = error.message
      break;
    default:
      code = 500
      message = 'Internal Server Error'
  }
  res.status(code).json({
    message
  })
}

module.exports = errorHandler