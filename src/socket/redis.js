const redis = require('redis');

let client;
const createClient = () => {
    console.log('create cliente')
    return redis.createClient({
        password: process.env.REDIS_PASSWORD,
        url: 'redis://'+ process.env.REDIS_HOST + ':' + process.env.REDIS_PORT,
    });
}

module.exports = async function (callback) {
    if (!client) {
        client = createClient();
    }

    const subscriber = client.duplicate();
    await subscriber.connect();

    subscriber.on('error', (err) => console.log('Redis Client Error', err));

    if (callback) {
        await callback(subscriber);
    }

    subscriber.disconnect();
}

// Sample
// socket.on('create-room', async ({ typeGame }) => {
//     const roomId = uuid.v4();
//     console.log('create-room', roomId);

//     console.log('id', socket.id);


//     await createClient(async subscriber => {
//         console.log('connected to redis');
//         await subscriber.set(roomId, JSON.stringify({
//             id: roomId,
//             code: generateCode(6),
//             users: [],
//             messages: [],
//             typeGame: typeGame || TYPE_GAME.default,
//         }));
//         const value = await subscriber.get(roomId);

//         console.log('value', JSON.parse(value));
//     });

//     console.log('sucess');

//     socket.emit('room-created', roomId);
// });