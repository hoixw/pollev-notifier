let check = 1;

function checkForElement() {
    const element = document.querySelector('.component-response-activity');

    if (element && check) {
        // console.log("FOUND")
        check = 0;
        chrome.runtime.sendMessage({ playSound: true });
    } else if (element) {
        // console.log("FOUND");
    } else {
        check = 1
        // console.log("NOT FOUND")
    }
}


setInterval(checkForElement, 500);
