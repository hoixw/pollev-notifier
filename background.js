chrome.runtime.onInstalled.addListener(() => {
    console.log('Service Worker installed.');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Service Worker starting up.');
});


/**
 * Plays audio files from extension service workers
 * @param {string} source - path of the audio file
 * @param {number} volume - volume of the playback
 */
async function playSound(source = 'audio/loud.mp3', volume = 1) {
    await createOffscreen();
    await chrome.runtime.sendMessage({ play: { source, volume } });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.playSound) {
        playSound(); // Replace with your sound file and desired volume
        // console.log("Sound Played")
    }
});

// Create the offscreen document if it doesn't already exist
async function createOffscreen() {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'testing' // details for using the API
    });
}