const sql = {
    create: 'INSERT INTO url (realURL,shortURL) VALUES(?,?)',
    delete: 'DELETE FROM url WHERE id = ?'
}

module.exports = sql;