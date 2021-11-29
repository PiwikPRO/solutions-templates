((document, window) => {
  const PPASHeatmapClickEvent = 'PPASHeatmapClickProxyEvent';

  const getElementPath = (event, { CSSClassesSeparators }) => {
    const replaceClassnameParts = (classes) => {
      let newClasses = classes;
      CSSClassesSeparators.forEach(rule => {
        newClasses = newClasses.replace(new RegExp(rule, 'g'), ' ').trim();
      });

      return newClasses;
    };

    const getRawStringPath = (steps) => {
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
          let classes = element.className.trim();
          if (CSSClassesSeparators.length) {
            classes = replaceClassnameParts(classes);
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

  const exposeHeatmapProxyEvent = () => {
    const heatmapClickEvent = document.createEvent('HTMLEvents');
    heatmapClickEvent.initEvent(PPASHeatmapClickEvent, true, true);

    window.PPASHeatmapClickEvent = heatmapClickEvent;
  };

  const registerHeatmapEventListener = () => {
    document.addEventListener(PPASHeatmapClickEvent, function(e) {
      window._paq.push([
        'trackEvent',
        'Heatmap events',
        'Click',
        getElementPath(
          e,
          // in v1 this interface will stay hardcoded
          // in v2 we may consider expose it as tag template UI config (if possible)
          // given value resolves single case known: Credit Agricole client (m.gonera reported)
          { CSSClassesSeparators: [/\|\|/] },
        ),
      ]);
    });
  };

  registerHeatmapEventListener();
  exposeHeatmapProxyEvent();
})(document, window);
