/**
 * Form timing tracking
 * 
 * This script analyses the interactions with <form> fields.
 */

 export default (subscribe, {formNameAttribute, fieldNameAttribute}) => {
    let fieldsTimings = {};

    const getFieldName = (field) => field.getAttribute(fieldNameAttribute);

    const getFormName = (field) => field.closest("form").getAttribute(formNameAttribute);

    const trackFormFieldEntry = (e) => {
        let fieldName = getFieldName(e.target);
        fieldsTimings[fieldName] = new Date().getTime();
    };
    
    const trackFormFieldLeave = (e) => {
        let leaveType = e.type;
        let formName = getFormName(e.target);
        let fieldName = getFieldName(e.target);
        // eslint-disable-next-line no-prototype-builtins
        if (fieldsTimings.hasOwnProperty(fieldName)) {
            let timeSpent = new Date().getTime() - fieldsTimings[fieldName];
            if (timeSpent > 0 && timeSpent < 1800000) {
                subscribe({ formName, fieldName, leaveType, timeSpent });
            }
            delete fieldsTimings[fieldName];
        }
    };

    document.querySelectorAll('input,select,textarea,datalist').forEach((elem) => {
            elem.addEventListener('focus', trackFormFieldEntry);
            elem.addEventListener('change', trackFormFieldLeave);
            elem.addEventListener('blur', trackFormFieldLeave);
        });

};