
import { withAccelerate } from "@prisma/extension-accelerate"
const { PrismaClient } = pkg;

const prisma = new PrismaClient().$extends(withAccelerate())


// const postgres = require('postgres')

// const dotenv = require('dotenv')
// dotenv.config()

// const connectionString = process.env.DATABASE_URL
// const sql = postgres(connectionString)

// const sql = postgres({
//     host:     'db.ovkzshmjuhxuesrlgzyn.supabase.co',
//     port:     5432,
//     database: 'postgres',
//     username: 'postgres',
//     password: '%40GovindA0325%23',
//     ssl:      { rejectUnauthorized: false }
// });  

export default prisma;