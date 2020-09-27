const config = {}
//              hosts
config.rabbitmq_host='rabbitmq'
config.db_host = 'db'

//              db settings
config.db_user = 'root'
config.db_password = 'password'
config.db_name = 'url-db'

//              ports
config.app_port=8000
config.rabbitmq_port = 5672

//              rabitmq channel
config.rabbitmq_channel = 'url-channel'

module.exports =config