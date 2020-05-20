import express from 'express'
import logger from 'morgan'
import 'regenerator-runtime/runtime'
import cors from 'cors'
import authRoute from './router/api/authRoute'
import userRoute from './router/api/userRoute'
import marketRoute from './router/api/marketRoute'
import 'dotenv/config'
import db from './db'

db()
const app = express()
// middlewares
app.use(cors())
app.use(logger())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)


app.use('/api/v1', authRoute, userRoute, marketRoute)

const PORT = process.env.PORT || 5500

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`))
