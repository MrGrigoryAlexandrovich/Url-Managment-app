//              loading amqblib and config
const amqp = require('amqplib')
const config = require('../../config')

async function connect(message) {       

    try {          
        
//              create server, conneciton and channel
        const amqpServer = `amqp://${config.rabbitmq_host}:${config.rabbitmq_port}`      
        const connection = await amqp.connect(amqpServer)     
        const channel = await connection.createChannel()    
        await channel.assertQueue(config.rabbitmq_channel)      

//              send message, close channel, close connection
        await channel.sendToQueue(config.rabbitmq_channel, Buffer.from(JSON.stringify(message))) 
        console.log(`Producer: message sent successfully`)
        await channel.close()         
        await connection.close() 
    }
    catch (ex) { 
        console.error(ex)
    }

}

module.exports = connect
