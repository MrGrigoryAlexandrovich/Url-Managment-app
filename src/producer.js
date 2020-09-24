/* RabbitMQ */
const amqp = require("amqplib");

async function connect(message) {       //   function for sending messages to rabbitmq

    try {           
        const amqpServer = "amqp://rabbitmq:5672"       //  server
        const connection = await amqp.connect(amqpServer)     //  connection
        const channel = await connection.createChannel();    // create channel
        await channel.assertQueue("url-channel3");          // assertQueue
        await channel.sendToQueue("url-channel3", Buffer.from(JSON.stringify(message))) //  send message to Queue
        console.log(`Sent succesfuly ${message}`);
        await channel.close();          //  close channel
        await connection.close();       //  close connection
    }
    catch (ex){ //  catch errors
        console.error(ex)
    }

}

module.exports = connect;
