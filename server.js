const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const mysql = require('mysql');

//cria html em js
app.set('view engine', 'ejs');

//recebe dados do form.
app.use(bodyParse.urlencoded({ extended: true }));

//server porta 3000
app.listen(3000, function() {
    console.log('rodando na porta 3000');
});

// funcao de conexão
function connQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: '',
        port: ''
    });
    connection.query(sqlQry, function(error, results, fields) {
        if (error) {
            res.json(error);
        } else {
            res.json(results);
            connection.end();
            console.log('tudo certo!');
        }
    });
}


//criar usuario atraves do form html
app.get('/', (req, res) => {
    res.render('index.ejs');
});

//envia dados do form para fazer o post
app.post('/usuarios', (req, res) => {
    const nome = req.body.nome.substring(0, 20);
    const sobrenome = req.body.sobrenome.substring(0, 20);
    connQuery(`INSERT INTO usuario(nome, sobrenome) VALUES('${nome}','${sobrenome}')`, res);
    console.log('tudo certo')
});

//lista todos os usuarios
app.get('/usuarios', (req, res) => {
    connQuery('SELECT * FROM usuario', res);
});

//filtra usuarios
app.get('/usuarios/:id?', (req, res) => {
    let filtro = '';
    if (req.params.id) {
        filtro = ' WHERE id=' + parseInt(req.params.id);
        connQuery('SELECT * FROM usuario' + filtro, res);
    }
});

//edição de usuarios
app.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0, 20);
    const sobrenome = req.body.sobrenome.substring(0, 20);
    connQuery(`UPDATE usuario SET nome='${nome}', sobrenome='${sobrenome}' WHERE id=${id}`, res);
});


//excluir usuario
app.delete('/usuarios/:id', (req, res) => {
    connQuery('DELETE FROM usuario WHERE id=' + parseInt(req.params.id), res);
});