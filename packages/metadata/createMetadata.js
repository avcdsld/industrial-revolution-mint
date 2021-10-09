const fs = require("fs");
const _ = require("underscore");
const numberOfTokens = 1250; // 9*1250=11250
const imageCid = [
  "QmV8KFqDhWsDT53cqQspLTHSKU1BMBhix9xFateaFgdbPc", // 1-1000
  "QmV7i7F8uoy6id5EgyQuh91gnbvypD2VeNiwJgPLRV6ogh", // 1001-2000
  "QmdeNGLBR84pN98ViaNvedprDFaiKWUjCRQMbXrKvK5mou", // 2001-3000
  "QmPDFdsjkyDqwWGedp9XjQx1ymbE6zbuXkwYBcRHrtdmUp", // 3001-4000
  "QmWEqqSbjEu4cqqZbuFGSVxtkCuPzu4XuGeiaQfXS4op7u", // 4001-5000
  "QmV6NZ1YykUqVwQr55QsMaTKNDFErDk18SxXaD8f8t1Hpq", // 5001-6000
  "QmVKuTkojeRu9Q7w47jpSZ5h7V7bGJa91tt38ivJBMrX29", // 6001-7000
  "QmRnsKHJ6gHh2VbH3VrcgfFXpkawSZU8DxwRKUvVN2Z7nk", // 7001-8000
  "QmRBibTBdBmFL9D49xhZi2qiMpVZQsBfXLXWTCvBcUz9E2", // 8001-9000
  "QmcDVMux9FSDc6BgMy87ZQENdLyfF5zUXiS63DHJ3MSSng", // 9001-10000
  "QmQ7GjrLPUXqo1Cy7Seqh7BdytNvn4MhxiYvk7JUs1vmL4", // 10001-11000
  "QmbH6tajHy2pJXeesuzxTM2U8K6TxethNQnmZKCxTeowq1", // 11001-11250
];
// const generativeArtCid = "QmbT85ghtUQTL5Zhij5ocMXHLFxR7BAKJ6PnEpQrLXkaM1/";

const getImageCid = (imageId) => {
  return imageCid[Math.floor(imageId / 1000)];
};

const createFile = () => {
  let imageIds = [];
  for (let i = 0; i < numberOfTokens * 9; i++) {
    imageIds.push(i);
  }
  const shuffledImageIds = _.shuffle(imageIds);

  for (let i = 0; i < numberOfTokens; i++) {
    const images = [];
    const momentSerialNumbers = [];
    for (let j = 0; j < 9; j++) {
      const id = (i + 1) * (j + 1) - 1;
      images.push(
        `https://gateway.pinata.cloud/ipfs/${getImageCid(shuffledImageIds[id] + 1)}/${shuffledImageIds[id] + 1}.png`
      );
      momentSerialNumbers.push(shuffledImageIds[id] + 1);
    }
    for (let j = 0; j < 9; j++) {
      const id = (i + 1) * (j + 1) - 1;
      const obj = {
        name: `Industrial Revolution - moments #${i}  (${shuffledImageIds[id] + 1} / ${numberOfTokens * 9})`,
        description: `Industrial Revolution - moments

Image collection by marimosphere


#${i} [${momentSerialNumbers.join(", ").toString()}]


A collection of still images made from a collaborative movie with modular artist GALCID.

Inspired by the track's audiorscape and the meaning of this title "Industrial Revolution".


This image structure is based on a number of elements.


The background layers represent industrial revolution in modern history, include the industrial products and factory machines,  mixed so many layers and elements with effects.


In the front layer, dots and lines trace the background layer in synchronized movements with the music. 

The dots and lines are generated by an algorithm that traces a moving images.

This represents the AI trying to understand human history and culture. The dots and lines also represent the nodes and transactions of the blockchain. This front layer represents the latest information revolution we are experiencing now.


I aimed to represent the overlap of both revolutions across time.


The original video is divided into 11250 frames to create each images. The nine images are then made into one NFT. In other words, one NFT contains nine images, and the images are displayed randomly over time.

When you update the metadata, one of the nine images is selected and switched according to the block number at that time.


Each NFT will have the right to access the original full length movie and our live show in the metaverse in the future.


We hope you enjoy it.`,
        image: `https://gateway.pinata.cloud/ipfs/${getImageCid(shuffledImageIds[id] + 1)}/${
          shuffledImageIds[id] + 1
        }.png`,
        // animation_url: `https://ipfs.fleek.co/ipfs/${generativeArtCid}`,
        // external_url: "",
        images,
        attributes: [
          {
            trait_type: "moments",
            value: momentSerialNumbers.join(", ").toString(),
          },
        ],
      };
      const toJSON = JSON.stringify(obj);
      // console.log(toJSON);
      fs.writeFile(`./metadata_created/${i}-${j + 1}`, toJSON, (err) => {
        if (err) console.log(err);
        if (!err) {
          console.log(`JSONファイルを生成しました`);
        }
      });
    }
  }
};

createFile();
