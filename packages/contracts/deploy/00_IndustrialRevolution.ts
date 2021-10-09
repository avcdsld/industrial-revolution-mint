const func = async (hre: any) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("IndustrialRevolution", {
    from: deployer,
    // args: ["NFT Title", "SYMBOL", "url"],
    // args: ["ArtiStake ARTIST NFT", "ARTI", "https://ipfs.fleek.co/ipfs/bafybeiexsh7jzsvcqgbmbkblfjqzhotgrb2jmp7nbqsmxqvw63p3yoqfi4"],
    args: [
      "Industrial Revolution - moments",
      "REVO",
      "https://gateway.pinata.cloud/ipfs/QmdXuxF4E6YXHsd4syesnDAYFtgs7ovyr8RN6bpBmm1Vdx/",
    ],
    log: true,
  });
};

export default func;
module.exports.tags = ["IndustrialRevolution"];
