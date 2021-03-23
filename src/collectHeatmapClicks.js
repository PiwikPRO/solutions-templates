export default (subscribe, { interval = 100 }) => {
  const PPAS_SITE_INSPECTOR_IFRAME_ID = 'ppas_site_inspector';
  const PPAS_SITE_INSPECTOR_TAG_CONFIG_ID = 'ppas_container_configuration';

  // configuration gathered by extension on initialization
  const injectSevenTagConfiguration = function() {
    if (window.sevenTag) {
      const config = window.sevenTag.configuration;
      const element = document.createElement('script');

      element.id = PPAS_SITE_INSPECTOR_TAG_CONFIG_ID;
      element.setAttribute('data-appId', config.id);
      element.setAttribute('data-host', config.host);

      document.head.appendChild(element);
    }
  };

  const getRawStringPath = function(steps) {
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
        const classes = element.className.replace(/\s+/g, '.');
        tag += `.${classes}`;
      }

      stringSteps.push(tag);
    }

    return stringSteps.reverse().join('>');
  };

  const isSiteInspectorMounted = function() {
    return !!document.getElementById(PPAS_SITE_INSPECTOR_IFRAME_ID);
  };

  const getFinalPath = function(e) {
    let targets = [];
    let finalPath = '';

    // don't collect data when in inspect mode
    if (isSiteInspectorMounted()) {
      document.removeEventListener('click', eventListener);
      return;
    }

    // handling missing method in IE11 / Edge
    if (!e.composedPath) {
      let target = e.target;

      while (target.parentNode !== null) {
        targets.push(target);
        target = target.parentNode;
      }
      targets.push(window.document);

      finalPath = getRawStringPath(targets);
    } else {
      finalPath = getRawStringPath(e.composedPath());
    }

    return finalPath;
  };

  const throttle = function(callback) {
    let timer = null;

    return function(arg) {
      const finalPath = getFinalPath(arg);
      if (timer === null) {
        timer = setTimeout(() => {
          callback(finalPath);
          timer = null;
        }, interval); 
      }
    };
  };

  const listener = function(path) {
    if (path) {
      subscribe(path);
    }
  };

  injectSevenTagConfiguration();
  const eventListener = throttle(listener);
  // throttle to prevent click events spam
  document.addEventListener('click', eventListener);
};
