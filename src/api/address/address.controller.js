const Address = require('./address.model')

const create = async (req, res) => {
  try {
    const { name, id, neighborhood, address } = req.body
    const idExistente = await Address.findOne({ id })
    if (idExistente) {
      return res.status(400).json({ mensaje: 'El id ya está registrado' })
    }
    const lat = 123
    const lng = 321
    const marker = await Address.create({ name, id, neighborhood, address, lat, lng })
    res.status(201).json({message: 'Id registrado', data: marker })
  } catch (error) {
    res.status(400).json({message: 'Id no pudo ser registrado', data: error.message})
  }
}

const listMarkers = async (req, res) => {
  try {
    const markers = await Address.find()
    res.status(200).json({message: 'Marcadores encontrados', data: markers})
  } catch (error) {
    res.status(400).json({message: 'Marcadores no encontrados', data: error})
  }
}

module.exports = { create, listMarkers}