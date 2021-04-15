/**
 * Tracking text copied by the user.
 * 
 * Adds event listener
 */

 export default (subscribe) => {
    window.addEventListener("copy",function(e){
        ppas_processCopyEvent(e);
    });
    
    const ppas_processCopyEvent = function(e){
        let copiedItemText = getSelectedText();
        subscribe(copiedItemText);
    };
    
    const getSelectedText = () => window.getSelection()?.toString() ?? '';

};