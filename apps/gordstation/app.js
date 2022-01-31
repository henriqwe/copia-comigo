const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 5000

app.use(bodyParser.json())

// const Minio = require('minio')
//
// const minioClient = new Minio.Client({
//   endPoint: 'localhost',
//   port: 9000,
//   useSSL: false,
//   accessKey: 'minio',
//   secretKey: 'minio123'
// })

// app.get('/', async (req, res) => {
//   const buckets = await minioClient.listBuckets().then((response) => response)
//   const existeBuckect = await minioClient.bucketExists('geral')
//   res.send({ teste: 'Hello World!', buckets, existeBuckect })
// })

// e4d103b035d7248ed2bc65fd451f1cba

app.get('/login', async (req, res) => {
  console.log('teste')
  res.send(req.body)
})

app.post('/', async (req, res) => {
  console.log('teste')
  console.log(req.body)
  res.send({ teste: 'Hello World!' })
})

// {
//   leads: [
//     {
//       id: '1826386099',
//       email: 'gfmontagem.manutencao@gmail.com',
//       name: 'gilleno firmino',
//       company: null,
//       job_title: null,
//       bio: null,
//       public_url: 'http://app.rdstation.com.br/leads/public/1b858973-e035-4fc6-a98c-8ab773ca450f',
//       created_at: '2021-11-01T12:12:45.107-03:00',
//       opportunity: 'false',
//       number_conversions: '1',
//       user: null,
//       first_conversion: [Object],
//       last_conversion: [Object],
//       custom_fields: {},
//       website: null,
//       personal_phone: null,
//       mobile_phone: '+55 84 99704-2711',
//       city: null,
//       state: null,
//       tags: null,
//       lead_stage: 'Cliente',
//       last_marked_opportunity_date: '2021-11-09T13:51:48.920-03:00',
//       uuid: '1b858973-e035-4fc6-a98c-8ab773ca450f',
//       fit_score: 'd',
//       interest: 0
//     }
//   ]
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
