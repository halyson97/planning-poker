export default {
  urlServer: window.location.href.match('localhost')
    ? 'http://localhost:8000'
    : 'http://localhost:8000',
};
