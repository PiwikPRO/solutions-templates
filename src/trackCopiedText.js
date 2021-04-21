/**
 * Tracking text copied by the user.
 * 
 * Adds event listener
 */

 export default (subscribe) => {
    
    const processCopyEvent = () => {
        let copiedItemText = getSelectedText();
        subscribe(copiedItemText);
    };
    
    const getSelectedText = () => window.getSelection()?.toString() ?? '';
    
    window.addEventListener("copy", processCopyEvent);
};