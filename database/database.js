var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'olabas',
  password: 'jesuslove',
  database: 'smartcard'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')

//   connection.query('CREATE TABLE user(id int primary key, firstname varchar(255), surname varchar(40), last6nin char(6), oldnumber char(11), currentnumber char(11))', function(err, result) {
//     if (err) throw err
//     connection.query('INSERT INTO user (firstname, surname, last6nin, oldnumber, currentnumber) VALUES (?, ?, ?, ?, ?)', ['che', 'dilas', '123456', '07089068401', '07089068401', ], function(err, result) {
//       if (err) throw err
//       connection.query('SELECT * FROM user', function(err, results) {
//         if (err) throw err
//         console.log(results[0].id)
//         console.log(results[0].firstname)
//         console.log(results[0].surname)
//         console.log(results[0].last6nin)
//         console.log(result[0].oldenumber)
//         console.log(result[0].currentnumber)
//       })
//     })
//   }) 
})