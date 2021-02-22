export default (url) => {
  return url.indexOf(location.protocol + "//" + location.host) === -1;
};
