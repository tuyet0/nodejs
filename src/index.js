const path = require('path');
const express = require('express')
const morgan = require('morgan')
const app = express()
const { engine } = require('express-handlebars');
const port = 3000

const route = require('./routes');
const db = require('./config/db');

db.connect()

route(app)

app.use(express.static(path.join(__dirname, 'public')))

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json())

app.use(morgan('combined'))

app.engine('hbs', engine({
  extname: '.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})