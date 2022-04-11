# Generative NFTs

This are tow main commandline utilities that lets you create genetarive images from parts of <br>
images. The second utility uploads all the files and the metadata automatically to a decentraliced <br>
storege (IPFS)

<img src="https://i.ibb.co/CsYxR53/collage.png" alt="Image of the repo">

<br>

This is the code part of the tutorial <strong> "NFT-Evolutions" </strong> for the web3 Hackathon.

>

<br>

## Demo

You can view a demo of how to use the two commandline utilities you can refer to these videos:

-  How to create generative images: [video](https://youtu.be/SZ9Qy41qD_k)
-  How to upload the files and metadata automatically to IPFS: [video](https://youtu.be/ozt-wgrILE4)

## Requeriments and installation

Frist of all you will need NodeJs and Yarn installed in a LTS version.

1. Clone the repo and install the dependencies:

```sh
git clone <thisrepo>
cd ./generative-nfts
yarn install
```

2. <strong>!!!!IMPORTANT!!!!</strong> Add a folder called <strong>layer</strong> on the root of the folder and the put inside the files <br>
   Containing the parts of your image.

<br>

## How to use it

-  <strong> Create the images </strong>:

   -  Create a folder called <strong>layers</strong> on the root directory of this repo.
   -  Put inside the layer dir all the images, you should separate the images in <strong>sub-folders</strong> <br> each one called as the propety that the image are.
   -  Then edite the <strong>./src/config.js</strong> and edit the config object, modify it to mach your images path. <br>
   -  What can you set on the config?:
      -  <strong>width/height</strong>: Change the propeties of the <strong>format</strong> object located in the same file.
      -  <strong>Rarity system</strong>: By default there is a rarity system, you can modify it editing the rarity object on the same file. <br>
         The default rarity system works by <strong>appending</strong> the following to the images name
         -  <strong>""(void)</strong>: It will have the same chances of appearing.
         -  <strong>"\_r"</strong>: It will have **50%** chances less of appearing.
         -  <strong>"\_sr"</strong>: It will have **90%** chances less of appearing.
      -  <strong>Number of images</strong>: Edit the **defaultEdition** variable located on the config file.<br>

   If you need more detailed instructions please refer to the video provided above.

-  <strong>Upload the images to IPFS</strong>:
   -  This part assumes that you have done the previous part.
   -  Run the command:
      ```sh
         yarn upload
      ```
   -  It will regenerate the metadata files with the URIs of the images uploaded to IPFS
   -  Then it will generate a file called <strong>metadata.json</strong> under the <strong>build</strong> directory. <br>
      This file contains an array of URIs, these are the URIs of the metadata uploaded to IPFS. <br>
      If you want to mint NFTs with these images you should pass as the URI the ones provided in the metadata file.

<strong>!! Important !! The key part on this proyect is under the file src/pages/api/nfts.ts.
<strong/>
