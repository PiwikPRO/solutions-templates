export default (subscribe, { threshold }) => {
  let lastKnownScrollPosition = 0;
  let directionChangeCount = 0;
  let ticking = false;

  const listener = () => {
    const prevScrollPosition = lastKnownScrollPosition;

    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastKnownScrollPosition - prevScrollPosition > 0) {
          directionChangeCount++;
        }

        if (directionChangeCount > threshold) {
          subscribe(lastKnownScrollPosition, () => {
            document.removeEventListener('scroll', listener);
          });
        }

        ticking = false;
      });
  
      ticking = true;
    }
  };
  
  document.addEventListener('scroll', listener);
};
