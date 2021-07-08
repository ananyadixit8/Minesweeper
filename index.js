const { response } = require('express');
const express = require('express');
const app = express();

app.listen(3000, () => console.log("listening"));
app.use(express.static('public'));
app.use(express.json());

app.post('/api' , (request, response) => {

    console.log(request.body);
    response.json({
        status : 'success',
        time : request.body.time
    });
});