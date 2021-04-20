/**
 * Form timing tracking
 * 
 * This script analyses the interactions with <form> fields.
 */

 export default (subscribe, {formNameAttribute, fieldNameAttribute}) => {
    console.log("inside function formNameAttribute",formNameAttribute);
    console.log("inside function fieldNameAttribute",fieldNameAttribute);
    let field_timings = {};
    
    const ppas_track_form_field_entry = function (e){
        let fieldName = get_field_label(e.target);
        field_timings[fieldName] = new Date().getTime();
    };
    
    const ppas_track_form_field_leave = function(e){
        let leaveType = e.type;
        let formName = get_form_name(e.target);
        let fieldName = get_field_label(e.target);
        // eslint-disable-next-line no-prototype-builtins
        if (field_timings.hasOwnProperty(fieldName)) {
            let timeSpent = new Date().getTime() - field_timings[fieldName];
          if (timeSpent > 0 && timeSpent < 1800000) {
            subscribe({formName, fieldName, leaveType, timeSpent});
          }
          delete field_timings[fieldName];
        }
    };
    
    const get_field_label = function(field) {
        return field.getAttribute(fieldNameAttribute);
    };

    const get_form_name = (field) => field.closest("form").getAttribute(formNameAttribute);

    document.querySelectorAll('input,select,textarea').forEach(function(elem){
        elem.addEventListener('focus', function(e){
        ppas_track_form_field_entry(e);
        });
        elem.addEventListener('change', function(e){
        ppas_track_form_field_leave(e);
        });
        elem.addEventListener('blur', function(e){
        ppas_track_form_field_leave(e);
        });
    });

};