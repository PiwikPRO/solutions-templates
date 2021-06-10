/**
 * Video tracking for HTML5 videos
 * 
 * This script analyses the interactions with <video> elements.
 */

 export default (subscribe, {eventCategoryLabel,
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
    //let mostRecentVideoTimestamp = -1;

    const getVideoName = (video) => {
        var videoName = video.getAttribute(videoTitleAttribute);
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
        //if (eventData.eventTimestamp != mostRecentVideoTimestamp){
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
                    dimensionsObject["dimension"+dimensionIdForTimestamps.toString()] = eventData.eventTimestamp;
                }
                if (trackVolumeAsDimension){
                    dimensionsObject["dimension"+dimensionIdForVolume.toString()] = encodeURIComponent((eventData.currentVolume*100).toFixed(0)+"%");
                }
                eventArray.push(dimensionsObject);
            }
            window._paq.push(eventArray);
            //mostRecentVideoTimestamp = eventData.eventTimestamp;
        //}
    };

    const processPlayMediaEvent = (e) => {
        var currentPlayTime = e.target.currentTime;
        var videoTitle = getVideoName(e.target);
        e.target.currentPlayTime = e.target.currentTime;
        var isUserSeeking = e.target.seeking;
        let eventData = {
            videoTitle: videoTitle,
            eventTimestamp: currentPlayTime,
            currentVolume: e.target.volume
        };
        if (isUserSeeking == false && e.target.hasPlayed == true && e.target.hasPaused == true) {
            eventData.eventType = "Resume";
            trackEvent(eventData);
        }
        else if (e.target.hasEnded == true) {
            e.target.hasReplayed = true;
            eventData.eventType = "Replay after watching";
            trackEvent(eventData);
            e.target.hasEnded = false;
        }
        else if (e.target.hasPaused == false && e.target.hasPlayed == false){
            eventData.eventType = "Play";
            trackEvent(eventData);
            e.target.hasPlayed = true;
        }
    };

    const processTimeUpdateMediaEvent = (e) => {
        var currentPlayTime = e.target.currentTime;
        var videoDuration = e.target.duration;
        var videoTitle = getVideoName(e.target);
        e.target.currentPlayTime = currentPlayTime;
        //percentage method
        if (trackThresholds && e.target.hasPlayed){
            if (typeof trackedThresholds[videoTitle] == "undefined") {
                trackedThresholds[videoTitle] = [];
            }

            var currentVideoPlayPercent = (currentPlayTime / videoDuration) * 100;
            
            for (var i=0; i <= percentageThresholds.length; i++){
                let testedThreshold = percentageThresholds[i];
                if (currentVideoPlayPercent > testedThreshold && !trackedThresholds[videoTitle].includes(testedThreshold)){
                    var eventData = {
                        eventType: "Progress - " + testedThreshold + "%",
                        videoTitle: videoTitle,
                        eventTimestamp: currentPlayTime,
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
        var currentPlayTime = e.target.currentTime;
        var videoTitle = getVideoName(e.target);
        var isUserSeeking = e.target.seeking;
        if (e.target.currentTime < e.target.duration && isUserSeeking == false) {
            var eventData = {
                eventType: "Pause",
                videoTitle: videoTitle,
                eventTimestamp: currentPlayTime,
                currentVolume: e.target.volume
            };
            trackEvent(eventData);
            e.target.hasPaused = true;
        } else {
           e.target.hasPaused = false;
        }
    };

    const processSeekedMediaEvent = (e) => {
        var isUserSeeking = e.target.seeking;
        var eventData = {
            videoTitle: getVideoName(e.target),
            eventTimestamp: e.target.currentTime,
            currentVolume: e.target.volume
        };
        if (e.target.currentTime < e.target.duration && isUserSeeking == false) {
            if (e.target.hasPaused == true){
                eventData.eventType = "Seeked when paused";
                trackEvent(eventData);
            } else if (e.target.hasPlayed == false && e.target.hasPaused == false) {
                eventData.eventType = "Seeked before playback";
                trackEvent(eventData);
            } else if (e.target.hasPlayed == true && e.target.hasPaused == false && e.target.hasReplayed == false && e.target.hasEnded == true) {
                eventData.eventType = "Seeked after finished watching";
                trackEvent(eventData);
                //workaround for the fact that after resume type of "Play", "seeking during playback" is automatically triggered
            } else if (e.target.hasPlayed == true && e.target.hasPaused == false && e.target.hasReplayed == false) {
                eventData.eventType = "Seeked during playback";
                trackEvent(eventData);
            } 
             else if (e.target.hasReplayed == true){
                e.target.hasReplayed = false;
            }
        }
    };

    const processEndedMediaEvent = (e) => {
        e.target.hasPaused = false;
        e.target.hasEnded = true;
        var eventData = {
            eventType: "Watched",
            videoTitle: getVideoName(e.target),
            eventTimestamp: e.target.currentTime,
            currentVolume: e.target.volume
        };
        trackEvent(eventData);
    };

    const handleTabUnloadDuringVideoPlay = (e) => {
        mediaElements = document.querySelectorAll("video");
        mediaElements.forEach((mediaElement) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (mediaElement.ended == false && mediaElement.paused == false && mediaElement.hasPlayed == true){
                var currentPlayTime = mediaElement.currentTime;
                var videoTitle = getVideoName(mediaElement);
                var eventData = {
                    eventType: "Tab unloaded during video play",
                    videoTitle: videoTitle,
                    eventTimestamp: currentPlayTime
                };
                trackEvent(eventData);
            }
    
        });
    };

    const processVolumeChangeMediaEvent = (e) => {
        let eventTypeToTrack;
        let currentVolume = parseInt((e.target.volume*100).toFixed(0));
        if (e.target.muted == true){
            eventTypeToTrack = "Muted";
            e.target.hasMuted = true;
            lastTrackedVolume = 0;
        }
        else if (e.target.hasMuted == true){
            eventTypeToTrack = "Unmuted";
            e.target.hasMuted = false;
            lastTrackedVolume = currentVolume;
        }
        else if (e.target.muted == false && e.target.hasMuted == false){
            if (lastTrackedVolume > currentVolume){
                eventTypeToTrack = "Volume down";
                lastTrackedVolume = currentVolume;
            }
            else {
                eventTypeToTrack = "Volume up";
                lastTrackedVolume = currentVolume;
            }
            //eventTypeToTrack = "Volume change";
        }
    
        var eventData = {
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