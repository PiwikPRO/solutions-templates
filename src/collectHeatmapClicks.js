export default (subscribe) => {
  const injectSevenTagConfiguration = function() {
    if (window.sevenTag) {
      const config = window.sevenTag.configuration;
      const element = document.createElement('script');

      element.id = 'ppas-container-configuration';
      element.setAttribute('data-appId', config.id);
      element.setAttribute('data-host', config.host);

      document.head.appendChild(element);
    }
  };

  const getPath = function(steps) {
    let tag, stringSteps = [];
    for (let i = 0, element = steps[i]; element; element = element.parentNode, i++) {
      if (element === document || element === window) break;

      tag = element.tagName.toLowerCase();

      if (tag === 'html') break;

      // cut path when id exists
      if (element.id) {
        tag = `#${element.id}`;
        stringSteps.push(tag);
        break;
      }

      // if parent has multiple same tags so we should defined which child it is 
      if (Array.prototype.slice.call(element.parentNode.children).filter(child => child.tagName.toLowerCase() === tag).length > 1) {
        const allSiblings = Array.prototype.slice.call(element.parentNode.children);
        const index = allSiblings.indexOf(element) + 1;
        if (index > 0) {
            tag += `:nth-child(${index})`;
        }
      }

      // exclude SVGAnimatedString className objects
      if (typeof element.className === 'string' && element.className) {
        const classes = element.className.replaceAll(' ', '.');
        tag += `.${classes}`;
      }

      stringSteps.push(tag);
    }

    return stringSteps.reverse().join('>');
  };

  const listener = function(e) {
    let targets = [];
    let finalPath = '';

    // handling missing method in IE11 / Edge
    if (!e.composedPath) {
      let target = e.target;

      while (target.parentNode !== null) {
        targets.push(target);
        target = target.parentNode;
      }
      targets.push(window.document);

      finalPath = getPath(targets);
    } else {
      finalPath = getPath(e.composedPath());
    }

    subscribe(finalPath);
  };

  // Listen on all clicks
  injectSevenTagConfiguration();
  document.addEventListener('click', listener);
};
