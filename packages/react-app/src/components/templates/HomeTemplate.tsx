import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { ethers } from "ethers";

import { useWallet } from "../../hooks/useWallet";
import { useNFT } from "../../hooks/useContract";
import { Header } from "../organisms/Header";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { getNFTContract } from "../../lib/web3";
import { analytics } from "../../firebase_config";
import { logEvent } from "firebase/analytics";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const HomeTemplate: React.FC = () => {
  const [connectWallet, account] = useWallet();
  const [totalNumber, setTotalNumber] = React.useState("");
  const [max, setMax] = React.useState("11419");
  const [isLoading, setLoading] = React.useState(false);
  const [txHash, setTxHash] = React.useState(null);
  const nftContractWithSigner = useNFT();

  const mint = async () => {
    try {
      logEvent(analytics, "mint_click");
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0x1") {
          alert("Switch your network to Ethereum Mainnet.");
          return;
        }
      }

      setLoading(true);
      const value = ethers.utils.parseEther("0.1").toString();
      const tx = await nftContractWithSigner.buy(1, { value: value });
      setTxHash(tx.hash);
      logEvent(analytics, "mint_executed");
      alert("After some time, please check the asset in OpenSea mypage.");
      await tx.wait();
      setLoading(false);
    } catch (e) {
      if (String(e.message).includes("denied")) {
        logEvent(analytics, "mint_cancel");
      } else {
        logEvent(analytics, "mint_error");
      }
      setLoading(false);
    }
  };

  // // const random = Math.floor(Math.random() * 2222).toString();
  // const random = "1";

  const explorerUrlPrefix =
    process.env.NODE_ENV === "test" ? "https://mumbai.polygonscan.com/tx/" : "https://etherscan.io/tx/";

  const openseaMypageUrl =
    process.env.NODE_ENV === "test" ? "https://testnets.opensea.io/account" : "https://opensea.io/account";

  React.useEffect(() => {
    // const data =
    //   process.env.NODE_ENV === "test"
    //     ? [
    //         {
    //           chainId: "0x13881",
    //           chainName: "Matic Mumbai-Testnet",
    //           nativeCurrency: {
    //             name: "Matic",
    //             symbol: "Matic",
    //             decimals: 18,
    //           },
    //           rpcUrls: [
    //             "https://rpc-mumbai.matic.today",
    //             "https://matic-mumbai.chainstacklabs.com",
    //             "https://rpc-mumbai.maticvigil.com",
    //             "https://matic-testnet-archive-rpc.bwarelabs.com",
    //           ],
    //           blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    //         },
    //       ]
    //     : [
    //         {
    //           chainId: "0x89",
    //           chainName: "Matic Network",
    //           nativeCurrency: {
    //             name: "Matic",
    //             symbol: "Matic",
    //             decimals: 18,
    //           },
    //           rpcUrls: ["https://rpc-mainnet.matic.network/"],
    //           blockExplorerUrls: ["https://polygonscan.com/"],
    //         },
    //       ];
    // if (window.ethereum) {
    //   window.ethereum.request({ method: "wallet_addEthereumChain", params: data });
    // }
    const nftContract = getNFTContract();
    nftContract.totalSupply().then((supply: number) => {
      setTotalNumber(supply.toString());
    });
    nftContract.MAX_ELEMENTS().then((max: number) => {
      setMax(max.toString());
    });
  }, []);

  // const handleMouseEnter = () => {
  //   document.getElementById("#image1")?.click();
  // };

  return (
    <>
      <Header></Header>
      <div className="main text-white bg-black">
        <div className="py-4 pt-8" style={{ fontSize: "1.8em" }}>
          <Heading align="center" as="h1" size="3xl" color="white">
            Industrial Revolution moments / marimosphere
          </Heading>
        </div>

        <div className="">
          <Text align="center" color="white" className="pr-10 pl-10 mt-6">
            A collection of still images made from a collaborative movie with modular artist GALCID.
          </Text>
          <Text align="center" color="white" className="pr-10 pl-10 mt-6">
            Inspired by the track's audiorscape and the meaning of this title "Industrial Revolution".
          </Text>
          <Text align="center" color="white" className="pr-10 pl-10 mt-6">
            This image structure is based on a number of elements.
            The background layers represent industrial revolution in modern history, include the industrial products and factory machines, mixed so many layers and elements with effects.
            In the front layer, dots and lines trace the background layer in synchronized movements with the music.
            The dots and lines are generated by an algorithm that traces a moving images.
          </Text>
          <Text align="center" color="white" className="pr-10 pl-10 mt-6">
            This represents the AI trying to understand human history and culture. The dots and lines also represent the nodes and transactions of the blockchain. This front layer represents the latest information revolution we are experiencing now.
          </Text>
          <Text align="center" color="white" className="pr-10 pl-10 mt-6">
            I aimed to represent the overlap of both revolutions across time.
          </Text>
        </div>

        <div style={{ padding: "75% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/627904151?h=390827999f&autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title="REVO_001.mp4"
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>

        <div className="pt-0 p-10">
          <Text align="center" color="white" className="pr-10 pl-10">
            The original video is divided into 11250 frames to create each images. The nine images are then made into
            one NFT. In other words, one NFT contains nine images, and the images are displayed randomly over time. When
            you update the metadata, one of the nine images is selected and switched according to the block number at
            that time.
          </Text>
          <Text align="center" color="white" className="pr-10 pl-10 mt-6">
            Each NFT will have the right to access the original full length movie and our live show in the metaverse in
            the future. We hope you enjoy it.
          </Text>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-3 gap-4">
            <img className="nine-images" width="600px" src="/assets/image1.gif" alt="Industrial Revolution" />
            <img className="nine-images" width="600px" src="/assets/image2.gif" alt="Industrial Revolution" />
            <img className="nine-images" width="600px" src="/assets/image3.gif" alt="Industrial Revolution" />

            <img className="nine-images" width="600px" src="/assets/image4.gif" alt="Industrial Revolution" />
            <img className="nine-images" width="600px" src="/assets/image5.gif" alt="Industrial Revolution" />
            <img className="nine-images" width="600px" src="/assets/image6.gif" alt="Industrial Revolution" />

            <img className="nine-images" width="600px" src="/assets/image7.gif" alt="Industrial Revolution" />
            <img className="nine-images" width="600px" src="/assets/image8.gif" alt="Industrial Revolution" />
            <img className="nine-images" width="600px" src="/assets/image9.gif" alt="Industrial Revolution" />

            {/* <GifPlayer className="nine-images" width="600px" gif="/assets/image1.gif" still="/assets/image1.png" />
            <GifPlayer className="nine-images" width="600px" gif="/assets/image2.gif" still="/assets/image2.png" />
            <GifPlayer className="nine-images" width="600px" gif="/assets/image3.gif" still="/assets/image3.png" />

            <GifPlayer className="nine-images" width="600px" gif="/assets/image4.gif" still="/assets/image4.png" />
            <GifPlayer className="nine-images" width="600px" gif="/assets/image5.gif" still="/assets/image5.png" />
            <GifPlayer className="nine-images" width="600px" gif="/assets/image6.gif" still="/assets/image6.png" />

            <GifPlayer className="nine-images" width="600px" gif="/assets/image7.gif" still="/assets/image7.png" />
            <GifPlayer className="nine-images" width="600px" gif="/assets/image8.gif" still="/assets/image8.png" />
            <GifPlayer className="nine-images" width="600px" gif="/assets/image9.gif" still="/assets/image9.png" /> */}

            {/* <P5Display index={random} /> */}
          </div>

          <div className="m-auto mt-10">
            <Text align="center" size="xl" color="white" className="italic">
              One NFT contains images of nine unique moments.
              <br />
              The main image switches randomly when you refresh metadata.
            </Text>
          </div>

          <div className="m-auto mt-10">
            <div className="pb-5">
              <Heading align="center" as="h2" size="xl" color="white">
                Purchase here
              </Heading>
            </div>
            <div className="pb-5">
              <Text align="center" size="2xl" color="white">
                {totalNumber} / {max} minted
              </Text>
            </div>
            <div className="pb-5">
              <Text align="center" size="2xl" color="white">
                Price : 0.1 ETH
              </Text>
            </div>
            {Number(totalNumber) >= Number(max) ? (
              <>
                <div className="pb-5">
                  <Text align="center" size="2xl">
                    Sold Out
                  </Text>
                </div>
                <a href="https://opensea.io" target="_blank" rel="noreferrer">
                  <Button color="pink" rounded={true}>
                    View on OpenSea
                  </Button>
                </a>
              </>
            ) : (
              <>
                {!account ? (
                  <Button onClick={connectWallet} color="red" rounded={true} className="mb-8">
                    connectWallet
                  </Button>
                ) : (
                  <Button onClick={mint} color="red" rounded={true} className="" disabled={isLoading}>
                    {isLoading ? "sending.." : "mint"}
                  </Button>
                )}
                {txHash ? (
                  <>
                    <div className="mt-5 pb-5">
                      <a href={explorerUrlPrefix + txHash} target="_blank" rel="noreferrer">
                        <Text align="center" size="2xl" className="underline" color="white">
                          View Tx on Etherscan
                        </Text>
                      </a>
                    </div>
                    <div className="">
                      <a href={openseaMypageUrl} target="_blank" rel="noreferrer">
                        <Text align="center" size="2xl" className="underline" color="white">
                          Open OpenSea MyPage
                        </Text>
                      </a>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>

      <footer className={`w-full bg-gray-800 px-8`}>
        <div style={{ textAlign: "center", padding: 50 }} className="flex items-center justify-center text-white">
          <a href="https://twitter.com/marimosphere" target="_blank" rel="noreferrer" className="pr-2 pl-2">
            <FontAwesomeIcon color="white" style={{ padding: 10, fontSize: 50 }} icon={faTwitter} />
          </a>
          <a href="https://discord.gg/vPhaHgWsnF" target="_blank" rel="noreferrer" className="pr-2 pl-2">
            <FontAwesomeIcon color="white p-10" style={{ padding: 10, fontSize: 50 }} icon={faDiscord} />
          </a>
          <a href="https://artistake.tokyo/" target="_blank" rel="noreferrer" className="pl-2">
            <img className="h-11 mr-3" src="/assets/artistake-logo.png" alt="ArtiStake" />
          </a>
        </div>
      </footer>
    </>
  );
};
