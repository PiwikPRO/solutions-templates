// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Tracking text copied by the user.
 * 
 * Adds event listener that monitors all copy events and sends text copied at the time as custom event.
 */

export default (subscribe, {filteredElements}) => {
    
    const processCopyEvent = () => {
        let copiedItemText = getSelectedText();
        if(copiedItemText){
            var eventData = ["trackEvent","User interaction","Copying text",copiedItemText];
            subscribe(eventData);  
        } 
    };
    
    const getSelectedText = () => {
        let filter = false;
       //check text node parent elements
       if(window.getSelection()?.baseNode instanceof Text) {
        filteredElements.forEach((filteredElement) => {
            let selectedElementNodeName = window.getSelection()?.baseNode?.nodeName;
            let selectedElementParentElement = window.getSelection()?.baseNode?.parentElement;
            if(selectedElementNodeName === "#text") {
                if(selectedElementParentElement.nodeName.toUpperCase() === filteredElement.toUpperCase()) {
                    filter = true;
                }
            }
        });   
       }
       //check input/textarea elements
       if(window.getSelection()?.baseNode instanceof HTMLElement) 
       {
        filteredElements.forEach((filteredElement) => {
            let filteredElementArray = window.getSelection()?.baseNode?.querySelectorAll(filteredElement);
            if(filteredElementArray?.length) {
                filteredElementArray.forEach((item) => {
                    if(item?.value.includes(window.getSelection()?.toString())) {
                        filter = true;
                    }
                });
            }
        });
       }
       if(filter) {
        return '';
       }
       return window.getSelection()?.toString() ?? '';
    };
    
    window.addEventListener("copy", processCopyEvent);
};