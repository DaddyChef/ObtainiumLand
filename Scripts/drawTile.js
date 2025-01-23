import { spawnTree } from './treeManager.js';
import { spawnRock } from './rockManager.js';

export function drawTile(scene, tileData, x, y, tileWidth, tileHeight) {
    const isoX = (x - y) * (tileWidth / 2) + scene.sys.game.config.width / 2;
    const isoY = (x + y) * (tileHeight / 2);

    // Draw the outline of the isometric tile
    const graphics = scene.add.graphics();
    if (tileData.pond) {
        graphics.lineStyle(2, 0x0000FF, 1); // Blue color for ponds
    } else {
        graphics.lineStyle(2, 0x00FF00, 1); // Green color for other tiles
    }

    // Draw the isometric tile
    graphics.beginPath();
    graphics.moveTo(isoX, isoY - tileHeight / 2);
    graphics.lineTo(isoX + tileWidth / 2, isoY);
    graphics.lineTo(isoX, isoY + tileHeight / 2);
    graphics.lineTo(isoX - tileWidth / 2, isoY);
    graphics.closePath();
    graphics.strokePath();

    // Change outer lines color for ponds
    if (tileData.pond) {
        graphics.lineStyle(2, 0xFF0000, 1); // Red color for outer lines
        graphics.strokeRect(isoX - tileWidth / 2, isoY - tileHeight / 2, tileWidth, tileHeight);
    }

    graphics.setDepth(isoY); // Set depth based on isoY for correct layering

    // Add a tree if the tile has a tree
    if (tileData.tree) {
        spawnTree(scene, isoX, isoY, x, y);
    }

    // Add a rock if the tile has a rock
    if (tileData.rock) {
        spawnRock(scene, isoX, isoY, x, y);
    }
}