/**
 * Video tracking for HTML5 videos
 * 
 * This script analyses the interactions with <video> elements.
 */
 export default (subscribe,{eventCategoryLabel,
    videoElementSelector,
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
        if (videoName === null) {
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
            subscribe(eventArray);
    };

    const processPlayMediaEvent = (e) => {
        let videoTitle = getVideoName(e.target);
        const {currentTime, volume, seeking, hasPaused, hasPlayed, hasEnded} = e.target;
        let eventData = {
            videoTitle: videoTitle,
            eventTimestamp: currentTime,
            currentVolume: volume
        };
        if (!hasPaused && !hasPlayed){
            eventData.eventType = "Play";
            trackEvent(eventData);
            e.target.hasPlayed = true;
        }
        else if (!seeking && hasPlayed && hasPaused) {
            eventData.eventType = "Resume";
            trackEvent(eventData);
            e.target.hasReplayed = true;
            e.target.hasEnded = false;
        }
        else if (hasEnded) {
            eventData.eventType = "Replay after watching";
            trackEvent(eventData);
            e.target.hasEnded = false;
        }
    };

    const processTimeUpdateMediaEvent = (e) => {
        const {currentTime, duration, hasPlayed} = e.target;

        let videoTitle = getVideoName(e.target);
        //percentage method
        if (trackThresholds && hasPlayed){
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
        if (currentTime < duration && !seeking) {
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
        if (currentTime < duration && !seeking) {
            if (hasPaused){
                eventData.eventType = "Seeked when paused";
                trackEvent(eventData);
            } else if (!hasPlayed && !hasPaused) {
                eventData.eventType = "Seeked before playback";
                trackEvent(eventData);
            } else if (hasPlayed && !hasPaused && !hasReplayed && hasEnded) {
                eventData.eventType = "Seeked after finished watching";
                trackEvent(eventData);
                //workaround for the fact that after resume type of "Play", "seeking during playback" is automatically triggered
            } else if (hasPlayed && !hasPaused && !hasReplayed) {
                eventData.eventType = "Seeked during playback";
                trackEvent(eventData);
            } 
             else if (hasReplayed){
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
            if (!ended && !paused && hasPlayed){
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
        const {currentTime, volume, muted, hasMuted} = e.target;
        let currentVolume = parseInt((volume*100).toFixed(0));
        if (muted){
            eventTypeToTrack = "Muted";
            e.target.hasMuted = true;
            lastTrackedVolume = 0;
        }
        else if (hasMuted){
            eventTypeToTrack = "Unmuted";
            e.target.hasMuted = false;
            lastTrackedVolume = currentVolume;
        }
        else if (!muted && !hasMuted){
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
            eventTimestamp: currentTime,
            currentVolume: volume
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
    
    let mediaElements = document.querySelectorAll(videoElementSelector);
    
    mediaElements.forEach((mediaElement) => addMediaTrackingListeners(mediaElement));
    window.addEventListener("beforeunload", handleTabUnloadDuringVideoPlay);

};