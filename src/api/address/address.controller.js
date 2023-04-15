const Address = require('./address.model')
/* const googleMapsClient = require('@google/maps').createClient({
  key: 'TU_CLAVE_DE_API_DE_GOOGLE_MAPS_AQUI',
  // Otras opciones de configuración aquí, si es necesario
}); */
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD2NfTV2raETEWnapc6W96m5Ij_JynOTM8',
  // Otras opciones de configuración aquí, si es necesario
})


const create = async (req, res) => {
  try {

    const { name, id, neighborhood, address } = req.body
    const idExistente = await Address.findOne({ id })
    if (idExistente) {
      return res.status(400).json({ mensaje: 'El id ya está registrado' })
    }
    const address2 = address+", Barranquilla, Colombia"
/*     const lat =''
    const lng ='' */
    googleMapsClient.geocode({
      address: address2
    }, function(err, response) {
      if (!err) {
        // Extrae la latitud y longitud del resultado de la geocodificación
        const lat2 = response.json.results[0].geometry.location.lat;
        const lng2 = response.json.results[0].geometry.location.lng;
    
        // Haz algo con la latitud y longitud
        console.log("Latitud: " + lat2);
        console.log("Longitud: " + lng2);
      } else {
        // Maneja errores aquí
        console.error("La geocodificación falló debido a: " + err);
      }
    })
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