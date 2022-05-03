// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require('express')
// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express()
const port=4000

app.get('/',(req,res) => res.send('Hello World!'))
app.listen(port, () => console.log('Example app listening on port ${port}!'))