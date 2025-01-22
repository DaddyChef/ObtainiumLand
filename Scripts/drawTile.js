import { spawnTree } from './treeManager.js';

export function drawTile(scene, tileData, x, y, tileWidth, tileHeight) {
    const isoX = (x - y) * (tileWidth / 2) + scene.sys.game.config.width / 2;
    const isoY = (x + y) * (tileHeight / 2);

    const tile = scene.add.image(isoX, isoY, 'spritesheet', tileData.tile);
    tile.setDepth(isoY); // Set depth based on isoY for correct layering

    if (tileData.tree) {
        spawnTree(scene, isoX, isoY, x, y);
    }
}