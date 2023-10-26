const express = require('express');
const cors = require('cors');
const amqp = require("amqplib");

const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create an endpoint to handle the message sending
app.post('/', async (req, res) => {
  const { queue, text } = req.body;

  try {
    const connection = await amqp.connect("amqps://haupwjda:IrjIPpqYqTm1UsWy3ANv7cvsf1or5Dqc@puffin.rmq2.cloudamqp.com/haupwjda");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    await channel.close();
    await connection.close();
    
    res.status(200).json({ message: "Message sent to RabbitMQ queue." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message to RabbitMQ queue." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
