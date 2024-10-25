const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'system',
};

const connection = mysql.createConnection(dbConfig);


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID', connection.threadId);
});

const db = {
  query: (sql, params, callback) => {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    connection.query(sql, params, callback);
  }
};


module.exports = db;

process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Erro ao encerrar a conexão:', err.stack);
      process.exit(1);
    }
    console.log('Conexão encerrada.');
    process.exit(0);
  });
});
