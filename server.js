const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.envPORT || 5000;

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  database: conf.database
});

const multer = require('multer');
const upload = multer({dest: './upload'});
const path = require("path");

app.use(express.static(path.join(__dirname, "Client","build")));

app.get('/api/customers', async (req,res) => {
    let conn;
    try {
      conn = await pool.getConnection();

      let rows = await conn.query("SELECT * FROM customer WHERE isDeleted = 0");

      res.send(rows);
    } catch (err) {
      throw err;
    }
})

app.use('/image',express.static('./upload'));

app.post('/api/customers', upload.single('image'), async (req,res) => {
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let brithday = req.body.brithday;
  let gender = req.body.gender;
  let job = req.body.job;
  
  let query = 'INSERT INTO customer values (null, \''+image+'\', \''+name+'\', \''+brithday+'\', \''+gender+'\', \''+job+'\', now(), 0)';
  
  let params = [image, name, brithday, gender, job];
  
  try{
    conn = await pool.getConnection();
    console.log(query);
    let rows = await conn.query(query);

    res.send(rows);
  } catch (err) {
    throw err;
  }
})

app.delete('/api/customers/:id', async (req, res) => {
  let query = 'UPDATE customer SET isDeleted = 1 WHERE id = '+req.params.id;
  
  try{
    conn = await pool.getConnection();
    let rows = await conn.query(query);

    res.send(rows);
  } catch (err){
    throw err;
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
