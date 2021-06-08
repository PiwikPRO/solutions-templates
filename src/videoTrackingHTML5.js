/**
 * Video tracking for HTML5 videos
 * 
 * This script analyses the interactions with <video> elements.
 */

 export default (subscribe, {trackingAccuracy, trackThresholds, thresholdsToTrack}) => {
    
    const printTrackingAccuracy = (trackingAccuracy) => console.log(trackingAccuracy);
    const printTrackThresholds = (trackThresholds) => console.log(trackThresholds);
    const printThresholds = (thresholdsToTrack) => console.log(thresholdsToTrack);
    printTrackingAccuracy(trackingAccuracy);
    printTrackThresholds(trackThresholds);
    printThresholds(thresholdsToTrack);
    subscribe({ thresholdsToTrack });
};