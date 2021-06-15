/**
 * Video tracking for HTML5 videos
 * 
 * This script analyses the interactions with <video> elements.
 */
 export default (subscribe,{eventCategoryLabel,
    videoTitleAttribute,
    trackingAccuracy,
    trackThresholds,
    thresholdsToTrack,
    trackTimestampAsDimension,
    dimensionIdForTimestamps,
    trackVolumeAsDimension,
    dimensionIdForVolume
}) => {
    
    const percentageThresholds = thresholdsToTrack.split(",").map(x=>+x);
    let trackedThresholds = {};
    let lastTrackedVolume = 100;

    const getVideoName = (video) => {
        let videoName = video.getAttribute(videoTitleAttribute);
        if (videoName == null) {
            if (video.hasAttribute("src")){
                videoName = video.getAttribute("src").split("/").slice(-1).pop();
            }
            else {
                videoName = video.querySelector("source").getAttribute("src").split("/").slice(-1).pop();
            }
        }
        return videoName;
    };

    const trackEvent = (eventData) => {
            if (trackingAccuracy < 0 || trackingAccuracy > 3){
                trackingAccuracy = 0;
            }
            eventData.eventTimestampFixed = eventData.eventTimestamp.toFixed(trackingAccuracy);
            eventData.eventCategoryLabel = eventCategoryLabel;
            let eventArray = [
                'trackEvent',
                eventData.eventCategoryLabel,
                eventData.eventType,
                eventData.videoTitle,
                eventData.eventTimestampFixed
            ];
            if (trackTimestampAsDimension || trackVolumeAsDimension){
                let dimensionsObject = {};
                if (trackTimestampAsDimension){
                    dimensionsObject["dimension"+dimensionIdForTimestamps] = eventData.eventTimestamp;
                }
                if (trackVolumeAsDimension){
                    dimensionsObject["dimension"+dimensionIdForVolume] = encodeURIComponent((eventData.currentVolume*100).toFixed(0)+"%");
                }
                eventArray.push(dimensionsObject);
            }
            window._paq.push(eventArray);
    };

    const processPlayMediaEvent = (e) => {
        let videoTitle = getVideoName(e.target);
        const {currentTime, volume, seeking, hasPaused, hasPlayed} = e.target;
        let eventData = {
            videoTitle: videoTitle,
            eventTimestamp: currentTime,
            currentVolume: volume
        };
        if (seeking === false && hasPlayed === true && hasPaused === true) {
            eventData.eventType = "Resume";
            trackEvent(eventData);
            e.target.hasReplayed = true;
            e.target.hasEnded = false;
        }
        else if (e.target.hasEnded === true) {
            eventData.eventType = "Replay after watching";
            trackEvent(eventData);
        }
        else if (e.target.hasPaused === false && e.target.hasPlayed === false){
            eventData.eventType = "Play";
            trackEvent(eventData);
            e.target.hasPlayed = true;
        }
    };

    const processTimeUpdateMediaEvent = (e) => {
        const {currentTime, duration} = e.target;

        let videoTitle = getVideoName(e.target);
        //percentage method
        if (trackThresholds && e.target.hasPlayed){
            if (typeof trackedThresholds[videoTitle] === "undefined") {
                trackedThresholds[videoTitle] = [];
            }

            let currentVideoPlayPercent = (currentTime / duration) * 100;
            
            for (let i=0; i <= percentageThresholds.length; i++){
                let testedThreshold = percentageThresholds[i];
                if (currentVideoPlayPercent > testedThreshold && !trackedThresholds[videoTitle].includes(testedThreshold)){
                    let eventData = {
                        eventType: "Progress - " + testedThreshold + "%",
                        videoTitle: videoTitle,
                        eventTimestamp: currentTime,
                        currentVolume: e.target.volume
                    };
                    trackEvent(eventData);
                    trackedThresholds[videoTitle].push(testedThreshold);
                }
            }
        }
    };

    const processPauseMediaEvent = (e) => {
        e.target.hasPaused = true;
        const {currentTime, duration, volume, seeking} = e.target;
        let videoTitle = getVideoName(e.target);
        if (currentTime < duration && seeking === false) {
            let eventData = {
                eventType: "Pause",
                videoTitle: videoTitle,
                eventTimestamp: currentTime,
                currentVolume: volume
            };
            trackEvent(eventData);
            e.target.hasPaused = true;
        } else {
           e.target.hasPaused = false;
        }
    };

    const processSeekedMediaEvent = (e) => {
        const {currentTime, duration, volume, seeking, hasPaused, hasPlayed, hasReplayed, hasEnded} = e.target;
        let eventData = {
            videoTitle: getVideoName(e.target),
            eventTimestamp: currentTime,
            currentVolume: volume
        };
        if (currentTime < duration && seeking === false) {
            if (hasPaused === true){
                eventData.eventType = "Seeked when paused";
                trackEvent(eventData);
            } else if (hasPlayed === false && hasPaused === false) {
                eventData.eventType = "Seeked before playback";
                trackEvent(eventData);
            } else if (hasPlayed === true && hasPaused === false && hasReplayed === false && hasEnded === true) {
                eventData.eventType = "Seeked after finished watching";
                trackEvent(eventData);
                //workaround for the fact that after resume type of "Play", "seeking during playback" is automatically triggered
            } else if (hasPlayed === true && hasPaused === false && hasReplayed === false) {
                eventData.eventType = "Seeked during playback";
                trackEvent(eventData);
            } 
             else if (hasReplayed === true){
                e.target.hasReplayed = false;
            }
        }
    };

    const processEndedMediaEvent = (e) => {
        const {currentTime, volume} = e.target;
        e.target.hasPaused = false;
        e.target.hasEnded = true;
        let eventData = {
            eventType: "Watched",
            videoTitle: getVideoName(e.target),
            eventTimestamp: currentTime,
            currentVolume: volume
        };
        trackEvent(eventData);
    };

    const handleTabUnloadDuringVideoPlay = (e) => {
        mediaElements = document.querySelectorAll("video");
        mediaElements.forEach((mediaElement) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const {ended, paused, hasPlayed, currentTime} = mediaElement;
            if (ended === false && paused === false && hasPlayed === true){
                let videoTitle = getVideoName(mediaElement);
                let eventData = {
                    eventType: "Tab unloaded during video play",
                    videoTitle: videoTitle,
                    eventTimestamp: currentTime
                };
                trackEvent(eventData);
            }
    
        });
    };

    const processVolumeChangeMediaEvent = (e) => {
        let eventTypeToTrack;
        let currentVolume = parseInt((e.target.volume*100).toFixed(0));
        if (e.target.muted === true){
            eventTypeToTrack = "Muted";
            e.target.hasMuted = true;
            lastTrackedVolume = 0;
        }
        else if (e.target.hasMuted === true){
            eventTypeToTrack = "Unmuted";
            e.target.hasMuted = false;
            lastTrackedVolume = currentVolume;
        }
        else if (e.target.muted === false && e.target.hasMuted === false){
            if (lastTrackedVolume > currentVolume){
                eventTypeToTrack = "Volume down";
                lastTrackedVolume = currentVolume;
            }
            else {
                eventTypeToTrack = "Volume up";
                lastTrackedVolume = currentVolume;
            }
        }
    
        let eventData = {
            eventType: eventTypeToTrack,
            videoTitle: getVideoName(e.target),
            eventTimestamp: e.target.currentTime,
            currentVolume: e.target.volume
        };
        trackEvent(eventData);
    };

    function addMediaTrackingListeners(mediaElement){
        mediaElement.hasPlayed = false;
        mediaElement.hasPaused = false;
        mediaElement.hasReplayed = false;
        mediaElement.hasEnded = false;
        mediaElement.hasMuted = false;
        mediaElement.addEventListener("play", processPlayMediaEvent);
        mediaElement.addEventListener("timeupdate", processTimeUpdateMediaEvent);
        mediaElement.addEventListener("pause", processPauseMediaEvent);
        mediaElement.addEventListener("seeked", processSeekedMediaEvent);
        mediaElement.addEventListener("ended", processEndedMediaEvent);
        mediaElement.addEventListener("volumechange", processVolumeChangeMediaEvent);
    }
    
    let mediaElements = document.querySelectorAll("video");
    
    mediaElements.forEach((mediaElement) => addMediaTrackingListeners(mediaElement));
    window.addEventListener("beforeunload", handleTabUnloadDuringVideoPlay);

};