export default {
  urlServer: window.location.href.match('localhost')
    ? 'http://localhost:8000'
    : 'http://18.231.168.146',
};
