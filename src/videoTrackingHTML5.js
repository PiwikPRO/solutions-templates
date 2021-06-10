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
                            additionallyTrackTimestampAsDimension,
                            dimensionIdForTimestamps
    }) => {
    
    const percentageThresholds = thresholdsToTrack.split(",").map(x=>+x);
    console.log("percentageThresholds",percentageThresholds);
    let trackedThresholds = {};
    let mostRecentVideoTimestamp;

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
        if (eventData.eventTimestamp != mostRecentVideoTimestamp){
            if (trackingAccuracy < 0 || trackingAccuracy > 3){
                trackingAccuracy = 0;
            }
            eventData.eventTimestampFixed = eventData.eventTimestamp.toFixed(trackingAccuracy);
            eventData.eventCategoryLabel = eventCategoryLabel;
            console.log("diag",eventData.eventType);
            let eventArray = [
                'trackEvent',
                eventData.eventCategoryLabel,
                eventData.eventType,
                eventData.videoTitle,
                eventData.eventTimestampFixed];
            if (additionallyTrackTimestampAsDimension){
                let dimensionsObject = {
                    ["dimension"+dimensionIdForTimestamps.toString()]: eventData.eventTimestamp
                };
                eventArray.push(dimensionsObject);
            }
            window._paq.push(eventArray);
            mostRecentVideoTimestamp = eventData.eventTimestamp;
        }
    };

    const processPlayMediaEvent = (e) => {
        console.log("play event",e);
        var currentPlayTime = e.target.currentTime;
        var videoTitle = getVideoName(e.target);
        e.target.currentPlayTime = e.target.currentTime;
        var isUserSeeking = e.target.seeking;
        if (isUserSeeking == false && e.target.hasPlayed == true && e.target.hasPaused == true) {
            let eventData = {
                eventType: "Resume",
                videoTitle: videoTitle,
                eventTimestamp: currentPlayTime
            };
            trackEvent(eventData);
        }
        else if (e.target.hasEnded == true) {
            e.target.hasReplayed = true;
            let eventData = {
                eventType: "Replay after watching",
                videoTitle: videoTitle,
                eventTimestamp: currentPlayTime
            };
            trackEvent(eventData);
            e.target.hasEnded = false;
        }
        else if (e.target.paused == false && e.target.hasPlayed == false){
            let eventData = {
                eventType: "Play",
                videoTitle: videoTitle,
                eventTimestamp: currentPlayTime
            };
            trackEvent(eventData);
          console.log(videoTitle,"play at ", currentPlayTime);
          e.target.hasPlayed = true;
        }
    };

    const processTimeUpdateMediaEvent = (e) => {
        var currentPlayTime = e.target.currentTime;
        var videoDuration = e.target.duration;
        var videoTitle = getVideoName(e.target);
        e.target.currentPlayTime = currentPlayTime;
        //percentage method
        if (trackThresholds){
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
                        eventTimestamp: currentPlayTime
                    };
                    trackEvent(eventData);
                    console.log("currentVideoPlayPercent > percentageThresholds",testedThreshold);
                    trackedThresholds[videoTitle].push(testedThreshold);
                }
            }
        }
    };

    const processPauseMediaEvent = (e) => {
        console.log("pause event",e);
        e.target.hasPaused = true;
        var currentPlayTime = e.target.currentTime;
        var videoTitle = getVideoName(e.target);
        var isUserSeeking = e.target.seeking;
        if (e.target.currentTime < e.target.duration && isUserSeeking == false) {
            var eventData = {
                eventType: "Pause",
                videoTitle: videoTitle,
                eventTimestamp: currentPlayTime
            };
            trackEvent(eventData);
            console.log(videoTitle,e.type,isUserSeeking,currentPlayTime);
            e.target.hasPaused = true;
        } else {
           e.target.hasPaused = false;
        }
    };

    const processSeekedMediaEvent = (e) => {
        console.log("seeked event",e);
        var isUserSeeking = e.target.seeking;
        var eventData = {
            videoTitle: getVideoName(e.target),
            eventTimestamp: e.target.currentTime
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
        console.log("ended event",e);
        e.target.hasPaused = false;
        e.target.hasEnded = true;
        var eventData = {
            eventType: "Watched",
            videoTitle: getVideoName(e.target),
            eventTimestamp: e.target.currentTime
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
        console.log(e);
        console.log("muted",e.target.muted);
        console.log("volume",e.target.volume);
        let eventTypeToTrack;
        if (e.target.muted == true){
            eventTypeToTrack = "Muted";
            e.target.hasMuted = true;
        }
        else if (e.target.hasMuted == true){
            eventTypeToTrack = "Unmuted";
            e.target.hasMuted = false;
        }
        else if (e.target.muted == false && e.target.hasMuted == false){
            eventTypeToTrack = "Volume change";
        }
    
        var eventData = {
            eventType: eventTypeToTrack,
            videoTitle: getVideoName(e.target),
            eventTimestamp: e.target.currentTime,
            currentVolume: e.target.volume
        };
        console.log(eventData);
        trackEvent(eventData);
    };

    function addMediaTrackingListeners(mediaElement){
        mediaElement.hasPlayed = false;
        mediaElement.hasPaused = false;
        mediaElement.hasReplayed = false;
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