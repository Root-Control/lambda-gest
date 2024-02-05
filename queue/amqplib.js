const amqplib = require('amqplib');


const queue = "gesttiona";
let channel;

const text = {
  item_id: "macbook",
  text: "This is a sample message to send receiver to check the ordered Item Availablility",
};

async function createConnection() {
  try {
    const options = {
      protocol: 'amqp',
      hostname: '0.tcp.ngrok.io',
      port: 17097,
      heartbeat: 0,
    };
    const connection = await amqplib.connect(options);
    channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    return channel;
  } catch (err) {
    console.log(err);
    console.warn('CONNECTION ERROR?');
  }
}

async function getRabbitChannel() {
  if (!channel) {
    const channel = await createConnection();
    return channel;
  } else {
    return channel;
  }
}


module.exports = {
  createConnection,
  getRabbitChannel,
}