const { create } = require("ipfs-http-client");
const fs = require("fs");
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let counter = 0;

async function addFile(file, id) {
  const added = await client.add(file);
  if (counter >= 10) {
    // Doing this to avoid 429 HTTP error
    await delay(50000);
    counter = 0;
  }
  counter++;
  return { path: added.path, id };
}

function getPhotosAndMetadata() {
  // Metadata is finished in .json and photos in .png
  const files = fs.readdirSync("./build/");

  const metadata = files.filter((file) => file.endsWith(".json"));
  const photos = files.filter((file) => file.endsWith(".png"));
  console.log(
    `Found ${metadata.length} metadata files and ${photos.length} photos`
  );
  return { metadata, photos };
}

async function uploadPhotos(photosName) {
  const results = [];
  for (const photo of photosName) {
    const photoBuffer = fs.readFileSync("./build/" + photo);
    const result = await addFile(photoBuffer, photo);
    // const result = {
    //   path: "QmRwWGFZ32LffRz246HJYhV1HtKei1kRuDrxWVSBREe9cc",
    //   id: photo,
    // };
    console.log("Photo: ", photo, " added to IPFS with the path ", result.path);
    results.push(result);
  }
  return results;
}

async function uploadMetadata(metadataNames) {
  const results = [];
  for (const metadata of metadataNames) {
    const metadataBuffer = fs.readFileSync("./build/" + metadata);
    const result = await addFile(metadataBuffer, metadata);
    console.log(
      "Metadata: ",
      metadata,
      " added to IPFS with the path ",
      result.path
    );
    results.push(result);
  }
  return results;
}

function addPhotosURIToMetadata(metadataNames, photosURI) {
  for (const metadata of metadataNames) {
    const metadataObj = JSON.parse(
      fs.readFileSync("./build/" + metadata, "utf8")
    );
    const photoURI = photosURI.find((photo) => {
      return photo.id === metadataObj.edition + ".png";
    });
    metadataObj.image = "ipfs://" + photoURI.path;
    fs.writeFileSync("./build/" + metadata, JSON.stringify(metadataObj));
    console.log("Added photo URI to metadata: " + metadata);
  }
}

const uploadToIPFS = async () => {
  const { metadata, photos } = getPhotosAndMetadata();
  const photosURI = await uploadPhotos(photos);
  addPhotosURIToMetadata(metadata, photosURI);
  const metadataURI = await uploadMetadata(metadata);
  console.log(metadataURI);
  // Write to a file
};

uploadToIPFS();

module.exports = {
  uploadToIPFS,
};
