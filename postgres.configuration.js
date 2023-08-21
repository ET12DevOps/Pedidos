import { Pool } from 'pg'
require('dotenv').config()

const pool = new Pool({
  user: process.env.USER_POSTGRES,
  host: process.env.HOST_POSTGRES,
  database: process.env.DATABASE_POSTGRES,
  password: process.env.PASSWORD_POSTGRES,
  port: process.env.PORT_POSTGRES,
})

export default pool