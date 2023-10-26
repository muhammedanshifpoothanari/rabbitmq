const amqp = require("amqplib");

const queue = "a";

(async () => {
  try {
    const connection = await amqp.connect("amqps://haupwjda:IrjIPpqYqTm1UsWy3ANv7cvsf1or5Dqc@puffin.rmq2.cloudamqp.com/haupwjda");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();c
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      (message) => {
        if (message) {
          console.log(
            " [x] Received '%s'",
            JSON.parse(message.content.toString())
          );
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
})();