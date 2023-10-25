const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.sendFile('C:/Users/ibzi/OneDrive - University of Massachusetts/Computer Science/Portfolio/gameify/server/page.html');
});

app.listen(8084, () => console.log('Example app listening on port 8084!'));