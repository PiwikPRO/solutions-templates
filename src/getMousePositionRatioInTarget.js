export default (e) => {
  const width  = window.innerWidth || document.documentElement.clientWidth || 
    document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || 
    document.body.clientHeight;
  const rect = e.target.getBoundingClientRect();

  return {
    x: (e.clientX - rect.left) / width,
    y: (e.clientY - rect.top) / height,
  };
}
