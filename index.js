const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use('/static', express.static('static'))
app.use('/static',express.static(path.resolve(__dirname , 'frontend','static')))

app.get('/*', ( _ , res) => {
  res.sendFile(path.resolve(__dirname , 'dist','index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})