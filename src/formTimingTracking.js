/**
 * Form timing tracking
 * 
 * This script analyses the interactions with <form> fields.
 */

 export default (subscribe, {formNameAttribute, fieldNameAttribute}) => {
    let fieldTimings = {};

    const getFieldName = (field) => field.getAttribute(fieldNameAttribute);

    const getFormName = (field) => field.closest("form").getAttribute(formNameAttribute);

    const trackFormFieldEntry = (e) => {
        let fieldName = getFieldName(e.target);
        fieldTimings[fieldName] = new Date().getTime();
    };
    
    const trackFormFieldLeave = (e) => {
        let leaveType = e.type;
        let formName = getFormName(e.target);
        let fieldName = getFieldName(e.target);
        // eslint-disable-next-line no-prototype-builtins
        if (fieldTimings.hasOwnProperty(fieldName)) {
            let timeSpent = new Date().getTime() - fieldTimings[fieldName];
            if (timeSpent > 0 && timeSpent < 1800000) {
                subscribe({ formName, fieldName, leaveType, timeSpent });
            }
            delete fieldTimings[fieldName];
        }
    };

    document.querySelectorAll('input,select,textarea').forEach((elem) => {
            elem.addEventListener('focus', trackFormFieldEntry);
            elem.addEventListener('change', trackFormFieldLeave);
            elem.addEventListener('blur', trackFormFieldLeave);
        });

};