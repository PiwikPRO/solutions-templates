export default (subscribe, { threshold }) => {
  let lastKnownScrollPosition = 0;
  let lastKnownDirection = 0;
  let directionChangeCount = 0;
  let ticking = false;

  const listener = () => {
    const prevScrollPosition = lastKnownScrollPosition;
    const prevScrollDirection = lastKnownDirection;

    lastKnownScrollPosition = window.scrollY;
    lastKnownDirection = Math.sign(lastKnownScrollPosition - prevScrollPosition);

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastKnownDirection != prevScrollDirection) {
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
