import * as mysql from 'mysql';

// Buat koneksi ke MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'nama_database',
});

// Mulai transaksi
connection.beginTransaction((err) => {
  if (err) throw err;

  // Query pertama dalam transaksi
  connection.query('INSERT INTO tabel_satu SET ?', { kolom_satu: 'Nilai1' }, (err, result) => {
    if (err) {
      return connection.rollback(() => {
        throw err;
      });
    }

    const insertId = result.insertId;

    // Query kedua dalam transaksi
    connection.query('INSERT INTO tabel_dua SET ?', { kolom_dua: insertId }, (err, result) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }

      // Commit transaksi jika sukses
      connection.commit((err) => {
        if (err) {
          return connection.rollback(() => {
            throw err;
          });
        }
        console.log('Transaksi berhasil dilakukan.');
      });
    });
  });
});

// Tutup koneksi setelah selesai
connection.end();
