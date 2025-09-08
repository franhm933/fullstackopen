const express = require('express')
const app = express()
const morgan = require('morgan')

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

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
    morgan.token('info')
})

app.get('/api/info', (request, response) => {
    const now = new Date()
    response.send('<p>Phonebook has info for ' + persons.length + ' people</p><p>'+now.toString()+'</p>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find( person => {
        return person.id === id
    })

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter( person => person.id !== id)
    response.status(204).end()
})

// Nueva persona
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

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

    // Verificar si el nombre ya existe
    const nameExists = persons.find(p => p.name === body.name)
    if (nameExists) {
        return response.status(400).json({
        error: 'name must be unique'
        })
    }

  const person = {
    id : generateId(),
    name : body.name,
    number : body.number
 }

 persons = persons.concat(person)
 response.json(person)
    
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)