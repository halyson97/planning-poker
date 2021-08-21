const cron = require('node-cron');
const axios = require('axios');

const schedules = () => {

    const everyFifteenMinutes = '*/15 * * * * ';

    cron.schedule(everyFifteenMinutes, async () => {
        try{
            await axios.get('http://localhost:8000/validate');
            console.log('sucesso')
        }catch(e){
            console.log('erro');
        }
    });
}

module.exports = schedules;
