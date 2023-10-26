const amqp = require("amqplib");
// const queue = "a";
// const text = {
//   address: "0xFdf55Fda240b7ea31dD399c36c39Bba2Bd5147F1",
//   value: 1
// };
(async (queue,text) => {
  let connection;
  try {
    connection = await amqp.connect("amqps://haupwjda:IrjIPpqYqTm1UsWy3ANv7cvsf1or5Dqc@puffin.rmq2.cloudamqp.com/haupwjda");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log("[x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();




