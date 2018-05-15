// 익스프레스
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const app = express()

// 몽구스를 받아온다!
const mongoose = require('mongoose')
// DB 연결할 때 필요한 설정 파일
const config = require('./config.js')
// 포트 설정
const port = process.env.port || 3001
// 바디 파서 설정이요 JSON 코드 받을 때 필요합니당
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
// 개발 모드 설정이요
app.use(morgan('dev'))
// 예 이걸로 시크릿키 받아오구요
app.set('jwt-secret', config.secret)
// 모든 api의 요청과 반환을 돌렸습니다
app.use('/api', require('./routes/api'))
// 빌드 파일 입니당 이걸로 리액트 클라이언트 파일 끌어와요
app.use(express.static(path.join(__dirname, '../Client/build')))

/* =======================
  모오옹고디비 서버에 연! 결!
========================== */
mongoose.set('debug', true)
mongoose.connect(config.mongodbUri)
const db = mongoose.connection
// 에러나면
db.on('error', console.error.bind(console, 'connection error:'))
// 연결성공하면
db.once('open', () => {
  // we're connected!
  console.log("We're connnected")
})

// 서버 열어 버리기
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})
