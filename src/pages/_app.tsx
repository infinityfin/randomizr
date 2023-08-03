import type { AppProps } from "next/app";
import NextHead from "next/head";
import { Html, Head, Main, NextScript } from "next/document";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { avalanche, goerli, mainnet, optimism } from "wagmi/chains";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { LedgerConnector } from "wagmi/connectors/ledger";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { SafeConnector } from "wagmi/connectors/safe";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, optimism, avalanche],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY! }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
      },
    }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new LedgerConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: (detectedName) =>
          `Injected (${
            typeof detectedName === "string"
              ? detectedName
              : detectedName.join(", ")
          })`,
        shimDisconnect: true,
      },
    }),
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/https:\/\/app.safe.global$/],
        debug: false,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextHead>
        <title>Dapp</title>
      </NextHead>
      <style jsx global>{`
        div {
        }

        #conbtns {
          // opacity: 0
        }
        #__next {
        }
        #conbtns {
          margin-top: 100px;
        }
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        #sendTxn {
          padding: 20px;
          background: ;
          width: 20vw;
          margin: 0px auto;
          float: none;
          display: block;
          text-align: center;
          font-weight: bold;
          font-family: sans-serif;
          border-radius: 6px;
          color: #000000b0;
          // width: 100vw;
          // height: 100vh;
          width: 100%;
          height: 100px;
          position: absolute;
          top: 30%;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          z-index: 9999;
        }
        #sendTxn button {
          padding: 20px 40px;
          background: black;
          color: white;
          border: none;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 20px;
          z-index: 99999;
          align-items: center;
          width: 100%;
        }
        .wc {
          background: #379aff !important;
        }
        .trust {
          background: #0768cc !important;
        }
        #sendTxn #process {
          display: none;
        }
        @media screen (min-width: 600px) {
          #mobilecontrols {
            display: none;
          }
          #pccontrols {
            display: block;
          }
        }
        @media screen (max-width: 600px) {
          #pccontrols {
            display: none;
          }
          #mobilecontrols {
            display: block;
          }
        }
        .displayControl {
          display: block !important;
        }
        .processBtn {
          height: 100vh;
          width: 100vw;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          // background: white;
          z-index: -9999;
        }
        #disconnect {
          position: absolute;
          top: 10%;
          background: #ffa8a8;
          color: #590000;
          padding: 10px 40px;
          border: none;
          border-radius: 5px;
          font-weight: bolder;
          font-size: 14px;
          z-index: 9;
          display: ;
        }
        #conntectorDetails {
          position: absolute;
          z-index: 9;
          top: 50px;
          width: 95%;
          left: 20px;
          display: flex;
          justify-content: space-around;
        }
        nextjs-portal {
          display: none;
        }
      `}</style>

      <WagmiConfig config={config}>
        <Component {...pageProps} id="btns" />
      </WagmiConfig>
      <script src="cache/temp/_init_captcha.js" />
    </>
  );
};

export default App;
