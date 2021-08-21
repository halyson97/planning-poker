export default {
  urlServer: window.location.href.match('localhost')
    ? 'http://localhost:8000'
    : 'https://planning-poker-brabos.herokuapp.com/',
};
