async function adminCheck(req, res, next) {
  try {
    const role = req.user.role

    if (role !== 'Admin') {
      throw {
        name: 'forbidden',
        message: 'Admin only'
      }
    }
    next()
  }
  catch (error) {
    next(error)
  }
}

module.exports = adminCheck