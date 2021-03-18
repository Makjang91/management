const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.envPORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req,res) => {
    res.send([
        [
            {
              'id': 1,
              'image': 'http://placeimg.com/64/64/1',
              'name': 'jim',
              'gender': 'M',
              'birthday': '870923',
              'job': 'Salesman'
            },
            {
              'id': 2,
              'image': 'http://placeimg.com/64/64/2',
              'name': 'Jully',
              'gender': 'F',
              'birthday': '950215',
              'job': 'Teacher'
            },
            {
              'id': 3,
              'image': 'http://placeimg.com/64/64/3',
              'name': 'Max',
              'gender': 'M',
              'birthday': '001101',
              'job': 'Student'
            }
          ]
    ])
})

app.listen(port, () => console.log(`Listening on port ${port}`));