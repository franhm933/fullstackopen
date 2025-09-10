const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://franhm93_db_user:${password}@cluster0.arkutbu.mongodb.net/phonebookApp?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name: String,
  number: String,
})

if(!empty(newName) && !empty(newNumber)) {
    person.save().then(result => {
        console.log('added ' + newName + ' number ' + newNumber + ' to phonebook' )
        mongoose.connection.close()
    })
} else {
    console.log('phonebook: ')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
