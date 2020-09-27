//                  sql  for db queries
const sql = {
    create: 'INSERT INTO url (realURL,shortURL) VALUES(?,?)',
    delete: 'DELETE FROM url WHERE id = ?',
    select:'SELECT * FROM url WHERE id = ?',
    selecturl: 'SELECT * FROM url WHERE shortURL = ?'
}

module.exports = sql