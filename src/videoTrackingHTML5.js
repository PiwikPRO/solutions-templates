/**
 * Video tracking for HTML5 videos
 * 
 * This script analyses the interactions with <video> elements.
 */

 export default (subscribe, {trackingAccuracy, trackThresholds, thresholdsToTrack}) => {
    
    const printTrackingAccuracy = (trackingAccuracy) => console.log(trackingAccuracy);
    const printTrackThresholds = (trackThresholds) => console.log(trackThresholds);
    const printThresholds = (thresholdsToTrack) => console.log(thresholdsToTrack.split(","));
    printTrackingAccuracy(trackingAccuracy);
    printTrackThresholds(trackThresholds);
    printThresholds(thresholdsToTrack);
    //subscribe({ thresholdsToTrack });

    const videoTrackingTitleAttribute = "data-video-title";
    //const thresholdsToTrack = [25, 50, 75];
    const percentageThresholds = thresholdsToTrack.split(",").map(x=>+x);
    console.log("percentageThresholds",percentageThresholds);
    let trackedThresholds = {};
    let mostRecentVideoTimestamp;

    const getVideoName = (video,videoTrackingTitleAttribute) => {
        var videoName = video.getAttribute(videoTrackingTitleAttribute);
        if (videoName == null){
            videoName = video.getAttribute("src").split("/").slice(-1).pop();
        }
        return videoName;
    };

    const trackEvent = (eventData) => {
        if (eventData.eventTimestamp != mostRecentVideoTimestamp){
            var eventTimestampToTrack = eventData.eventTimestamp.toFixed(3);
            console.log("diag",eventData.eventType);
            window._paq.push(['trackEvent',"Video", eventData.eventType, eventData.videoTitle, eventTimestampToTrack]);
            mostRecentVideoTimestamp = eventData.eventTimestamp;
        }
    };

    const processPlayMediaEvent = (e) => {
        console.log("play event",e);
        var currentPlayTime = e.target.currentTime;
        var videoTitle = getVideoName(e.target,videoTrackingTitleAttribute);
        e.target.currentPlayTime = e.target.currentTime;
        var isUserSeeking = e.target.seeking;
        e.target.hasPaused = false;
        if (isUserSeeking == false && e.target.hasPlayed == true) {
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
        var videoTitle = getVideoName(e.target,videoTrackingTitleAttribute);
        e.target.currentPlayTime = currentPlayTime;
        //percentage method

        if (typeof trackedThresholds[videoTitle] == "undefined") {
            trackedThresholds[videoTitle] = [];
            console.log("thresholds not defined");
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
    };

    const processPauseMediaEvent = (e) => {
        console.log("pause event",e);
        e.target.hasPaused = true;
        var currentPlayTime = e.target.currentTime;
        var videoTitle = getVideoName(e.target,videoTrackingTitleAttribute);
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
            videoTitle: getVideoName(e.target,videoTrackingTitleAttribute),
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
                //workaround for the fact that after resume type of "Play", "seeking during playback" is automatically triggered
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
            videoTitle: getVideoName(e.target,videoTrackingTitleAttribute),
            eventTimestamp: e.target.currentTime
        };
        trackEvent(eventData);
    };

    const handleTabCloseDuringVideoPlay = (e) => {
        mediaElements = document.querySelectorAll("video");
        mediaElements.forEach((mediaElement) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (mediaElement.ended == false && mediaElement.paused == false && mediaElement.hasPlayed == true){
                var currentPlayTime = mediaElement.currentTime;
                var videoTitle = getVideoName(mediaElement,videoTrackingTitleAttribute);
                var eventData = {
                    eventType: "Tab closed during video play",
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
            videoTitle: getVideoName(e.target,videoTrackingTitleAttribute),
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
        mediaElement.addEventListener("play", processPlayMediaEvent);
        mediaElement.addEventListener("timeupdate", processTimeUpdateMediaEvent);
        mediaElement.addEventListener("pause", processPauseMediaEvent);
        mediaElement.addEventListener("seeked", processSeekedMediaEvent);
        mediaElement.addEventListener("ended", processEndedMediaEvent);
        mediaElement.addEventListener("volumechange", processVolumeChangeMediaEvent);
    }
    
    let mediaElements = document.querySelectorAll("video");
    
    mediaElements.forEach((mediaElement) => addMediaTrackingListeners(mediaElement));
    window.addEventListener("beforeunload", handleTabCloseDuringVideoPlay);

};