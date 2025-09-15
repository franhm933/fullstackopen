require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')
const logger = require('./utils/logger')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

// Token personalizado para el body
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Middleware con el formato exacto
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/info', async (request, response) => {
    const now = new Date()
    const countPersons = await Person.countDocuments({})
    response.send('<p>Phonebook has info for ' + countPersons + ' people</p><p>'+now.toString()+'</p>')
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Nueva persona
// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  Person.findOne ({ name })
  .then (person => {
    if(person){
      Person.findByIdAndUpdate (
        person._id,
        { number },
        { new: true, runValidators: true, context: 'query' }
      )
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
    } else {
      const newPerson = new Person ({
        name : name,
        number : number
      })
      newPerson
      .save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))
    }
  })
 
    
})

//Errores
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// controlador de solicitudes que resulten en errores
app.use(errorHandler)

// Puerto
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)