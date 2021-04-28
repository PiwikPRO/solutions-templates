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
      element.setAttribute('data-host', config.main_domain);

      document.head.appendChild(element);
    }
  };

  const performOnScriptEnd = function(fnc) {
    setTimeout(fnc, 0);
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

   // throttle to prevent click events spam
  const throttle = function(callback) {
    let timer = null;

    return function(event) {
      event.preventDefault();

      const finalPath = getFinalPath(event);
      if (timer === null) {
        timer = setTimeout(() => {
          callback(finalPath);

          // resume default behaviour (after perform tracking request)
          performOnScriptEnd(() => {
            event.target.click();
          });
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

  const isEventReal = (event, callback) => {
    if(event.screenX && event.screenX !== 0 && event.screenY && event.screenY !== 0) {
      callback(event);
    }
  };

  const eventListener = event => isEventReal(event, throttle(listener));
  document.addEventListener('click', eventListener);
};
