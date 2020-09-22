/* RabbitMQ */
const amqp = require("amqplib");

module.exports = async function connect(message) {

    try {
        const amqpServer = "amqp://rabbitmq:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("url-channel3");
        await channel.sendToQueue("url-channel3", Buffer.from(JSON.stringify(message)))
        console.log(`Sent succesfuly ${message}`);
        await channel.close();
        await connection.close();
    }
    catch (ex){
        console.error(ex)
    }

}

