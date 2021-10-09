export const rpc =
  process.env.NODE_ENV === "test"
    ? "https://polygon-mumbai.infura.io/v3/7495501b681645b0b80f955d4139add9"
    : "https://mainnet.infura.io/v3/7495501b681645b0b80f955d4139add9";
export const networkId = process.env.NODE_ENV === "test" ? 80001 : 1;
export const openSea =
  process.env.NODE_ENV === "test" ? "https://testnets.opensea.io/assets/mumbai" : "https://opensea.io/assets";
