import getPersistentState from './getPersistentState';
import setPersistentState from './setPersistentState';

export default (key, value, threshold) => {
  const data = (getPersistentState(key) ?? []).filter(entry => entry.time > threshold);

  data.push({ value, time: new Date().getTime() });

  setPersistentState(key, data);

  return data;
};
