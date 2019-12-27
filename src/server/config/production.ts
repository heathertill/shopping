export default {
    knex: {
        client: 'mysql',
        connection: {
            connectionLimit: 10,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            database: process.env.DB_SCHEMA
        }
    },
    auth: {
        secret: process.env.SECRET
    },
    twilio: {
        authToken: process.env.DB_TOKEN,
        accountSID: process.env.DB_SID,
        twilioNumber: process.env.DB_TWILIONUMBER
    },
    multer: {
        secretAccessKey: process.env.DB_ACCESSKEY,
        accessKeyId: process.env.DB_KEYID
    }
}

