const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newNoteName = process.argv[3]

const url = `mongodb+srv://franhm93_db_user:${password}@cluster0.arkutbu.mongodb.net/noteApp?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: newNoteName,
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})