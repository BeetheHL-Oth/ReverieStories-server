const bcrypt = require('bcryptjs')

function hashPassword(pass) {
  try {
    return bcrypt.hashSync(pass)
  }
  catch (error) {
    console.log(error)
  }
}

async function comparePassword(pass, hash) {
  try {
    return await bcrypt.compare(pass, hash)
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = {hashPassword, comparePassword}