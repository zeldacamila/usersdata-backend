const Admin = require('./admin.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    const { email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const admin = await Admin.create({ email, password: passwordHash })
    const token = jwt.sign(
      { id: admin._id },
      "secretKey",
      { expiresIn: 60 * 60 * 24}
    )
    res.status(201).json({message: 'Usuario administrador creado', data: { token, email }})
  } catch (error) {
    res.status(400).json({message: 'Usuario administrado no pudo ser creado', data: error})
  }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) {
      throw new Error('Credenciales inválidas')
    }
    const validatePassword = await bcrypt.compare(password, admin.password)
    if(!validatePassword) {
      throw new Error('Credenciales inválidas')
    }
    const token = jwt.sign(
      { id: admin._id },
      "secretKey",
      { expiresIn: 60 * 60 * 24}
    )
    res.status(200).json({message: 'Sesión iniciada', data: { email, token }})
  } catch (error) {
    res.status(400).json({message: 'No se pudo iniciar sesión', data: error})
  }
}

const listAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
    res.status(200).json({message: 'Usuarios administradores encontrados', data: admins})
  } catch (error) {
    res.status(400).json({message: 'Usuarios administradores no encontrados', data: error})
  }
}

module.exports = { signup, signin, listAdmins}