"use strict"

const SQLITE_CONFIG = {
    dbFile: process.env.DB_FILE || "mydb.db"
};

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(SQLITE_CONFIG.dbFile);

db.serialize(function() {
    // db.run("drop table log_info;");
    db.run("CREATE TABLE if not exists log_info (Service TEXT, Severity TEXT, Message TEXT, Timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);");
});
const ADD_LOG_MESSAGE_SQL = "INSERT INTO log_info(Service, Severity, Message) VALUES (?,?,?)";

function addLogMessage(data) {
    return new Promise((resolve, reject) => {
        db.serialize(function() {
            db.run(ADD_LOG_MESSAGE_SQL, [data.service, data.severity, data.message], (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    });
}

module.exports = {
    addLogMessage: addLogMessage
};