require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

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

app.delete('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    // persons = persons.filter( person => person.id !== id)
    // response.status(204).end()
})

// Nueva persona
// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
      return response.status(400).json({ 
          error: 'name missing' 
      })
  }
  if (!body.number) {
      return response.status(400).json({ 
          error: 'number missing' 
      })
  }

  const person = new Person ({
    name : body.name,
    number : body.number
  })

 person.save().then(savedPerson => {
  response.json(savedPerson)
 })
    
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)