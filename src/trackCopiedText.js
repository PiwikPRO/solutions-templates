/**
 * Tracking text copied by the user.
 * 
 * Adds event listener that monitors all copy events and sends text copied at the time as custom event.
 */

 export default (subscribe) => {
    
    const processCopyEvent = () => {
        let copiedItemText = getSelectedText();
        var eventData = ["trackEvent","User interaction","Copying text",copiedItemText];
        subscribe(eventData);   
    };
    
    const getSelectedText = () => window.getSelection()?.toString() ?? '';
    
    window.addEventListener("copy", processCopyEvent);
};