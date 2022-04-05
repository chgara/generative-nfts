const layersOrder = [
    { name: "boys/background", number: 4 },
    {
        name: "boys/body",
        number: 4,
    },
    {
        name: "boys/accessories",
        number: 4,
    },
];

const format = {
    width: 500,
    height: 500,
};

const rarity = [
    { key: "", val: "original" },
    { key: "_r", val: "rare" },
    { key: "_sr", val: "super rare" },
];

const defaultEdition = 64;

module.exports = { layersOrder, format, rarity, defaultEdition };
