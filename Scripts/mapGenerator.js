export function generateRandomMap(width, height) {
    const map = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const randomTile = Phaser.Math.Between(0, 24); // Assuming you have 25 different tiles in the tilesheet
            const hasTree = Phaser.Math.Between(0, 100) < 3; // 3% chance to spawn a tree
            row.push({ tile: randomTile, tree: hasTree });
        }
        map.push(row);
    }
    return map;
}