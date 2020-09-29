const config = {
//hosts
rabbitmq_host:'rabbitmq',
db_host:'db',

//db settings
db_user : 'root',
db_password : 'password',
db_name : 'url-db',

//ports
app_port: 8000,
rabbitmq_port: 5672,

//rabitmq channel
rabbitmq_channel : 'url-channel',
}

module.exports =config