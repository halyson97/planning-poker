const cron = require('node-cron');
const axios = require('axios');

const schedules = () => {

    const everyFifteenMinutes = '*/15 * * * * ';

    cron.schedule(everyFifteenMinutes, async () => {
        try{
            await axios.get('https://planning-poker-brabos.herokuapp.com/validate');
            console.log('sucesso')
        }catch(e){
            console.log('erro');
        }
    });
}

module.exports = schedules;
