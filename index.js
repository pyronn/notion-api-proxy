const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})
app.use('/notion-api/', (req, res) => {
    // 在这里处理请求
    const url = req.url
    const reqUrl = url.substring(1)
    const auth = req.headers['authorization']
    const notionVersion = req.headers['notion-version']

    axios({
        method: req.method,
        url: reqUrl,
        headers: {
            "Authorization": auth,
            "Notion-Version": notionVersion,
            "Content-Type": "application/json"
        },
        data: req.body
    })
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            res.status(res.status).send(res.error)
            console.error(error);
        });

});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + process.env.PORT || "3000")
})
