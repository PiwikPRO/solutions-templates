/**
 * Form timing tracking
 * 
 * This script analyses the interactions with <form> fields.
 */

 export default (subscribe, {formNameAttribute, fieldNameAttribute, eventCategoryPrefix, iframeTracking}) => {
    let fieldsTimings = {};

    const getFieldName = (field) => field.getAttribute(fieldNameAttribute);

    const getFormName = (field) => field.closest("form").getAttribute(formNameAttribute);
  
    const trackFormSubmit = (e) => {
        let formName = getFormName(e.target);
        let fieldName = "Click";
        let interactionType = "Submit";
        var eventData = ['trackEvent', eventCategoryPrefix+formName, fieldName, interactionType, 0];
        if(iframeTracking){
            window.parent.postMessage({type: "PiwikPRO", payload: eventData}, "*");
        }
        else{
            subscribe(eventData); 
        } 
    };

    const trackFormFieldEntry = (e) => {
        let fieldName = getFieldName(e.target);
        fieldsTimings[fieldName] = new Date().getTime();
    };
    
    const trackFormFieldLeave = (e) => {
        let interactionType = e.type;
        let formName = getFormName(e.target);
        let fieldName = getFieldName(e.target);
        // eslint-disable-next-line no-prototype-builtins
        if (fieldsTimings.hasOwnProperty(fieldName)) {
            let timeSpent = new Date().getTime() - fieldsTimings[fieldName];
            if (timeSpent > 0 && timeSpent < 1800000) {
                var eventData = ['trackEvent', eventCategoryPrefix+formName, fieldName, interactionType, timeSpent/1000 || 0 ];
                if(iframeTracking){
                    window.parent.postMessage({type: "PiwikPRO", payload: eventData}, "*");
                }
                else{
                    subscribe(eventData);
                }

            }
            delete fieldsTimings[fieldName];
        }
    };

    const waitForElement = function(selector){
            return new Promise(resolve => {
                if (document.querySelector(selector)) {
                    return resolve(document.querySelector(selector));
                }

                const observer = new MutationObserver(function(){
                    if (document.querySelector(selector)) {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        };   

    const addNewListeners = function() {
        document.querySelectorAll('form').forEach((el) => {
            el.addEventListener('submit', trackFormSubmit);
        });
        document.querySelectorAll('input,select,textarea,datalist').forEach((elem) => {
            elem.addEventListener('focus', trackFormFieldEntry);
            elem.addEventListener('change', trackFormFieldLeave);
            elem.addEventListener('blur', trackFormFieldLeave);
        });
    };        

    if(document.forms.length){ 
      addNewListeners();
    }
    else{
        waitForElement('form').then(function(){
				addNewListeners();
          }); 
    }

};