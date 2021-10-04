export default {
  urlServer: window.location.href.match('localhost')
    ? 'http://localhost:8000'
    : window.location.href,
};
