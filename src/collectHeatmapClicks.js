export default () => {
  const heatmapEventName = 'heatmapProxyEvent';
  const injectConfigForSiteInspector = () => {
    const PPAS_SITE_INSPECTOR_TAG_CONFIG_ID = 'ppas_container_configuration';
    // configuration gathered by extension on initialization
    if (window.sevenTag) {
      const config = window.sevenTag.configuration;
      const element = document.createElement('script');

      element.id = PPAS_SITE_INSPECTOR_TAG_CONFIG_ID;
      element.setAttribute('data-appId', config.id);
      element.setAttribute('data-host', config.main_domain);

      document.head.appendChild(element);
    }
  };
  const exposeHeatmapProxyEvent = () => {
    const heatmapEvent = document.createEvent('HTMLEvents');
    heatmapEvent.initEvent(heatmapEventName, true, true);

    window.heatmapEvent = heatmapEvent;
  };

  const getElementPath = (event, { blacklistedClasses = [] } = {}) => {
    const filterClasses = (classes) => {
      let filteredClasses = classes;
      blacklistedClasses.forEach(rule => {
        filteredClasses = filteredClasses.replace(new RegExp(rule, 'g'), ' ').trim();
      });

      return filteredClasses;
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
          let classes = element.className;
          if (blacklistedClasses.length) {
            classes = filterClasses(classes);
          }
          classes = classes.replace(/\s+/g, '.');
          tag += `.${classes}`;
        }

        stringSteps.push(tag);
      }

      return stringSteps.reverse().join('>');
    };
    let targets = [];
    let finalPath = '';

    // handling missing method in IE11 / Edge
    if (!event.composedPath) {
      let target = event.target;

      while (target.parentNode !== null) {
        targets.push(target);
        target = target.parentNode;
      }
      targets.push(window.document);

      finalPath = getRawStringPath(targets);
    } else {
      finalPath = getRawStringPath(event.composedPath());
    }

    return finalPath;
  };

  return {
    injectConfigForSiteInspector,
    exposeHeatmapProxyEvent,
    heatmapEventName,
    getElementPath,
  };
};
