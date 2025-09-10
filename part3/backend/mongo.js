const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://franhm93_db_user:${password}@cluster0.arkutbu.mongodb.net/noteApp?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true`
mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas')
    return mongoose.connection.close()
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})