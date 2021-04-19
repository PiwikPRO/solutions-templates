export default (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
