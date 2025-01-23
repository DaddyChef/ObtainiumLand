import { generateMap } from './mapGenerator.js';
import { drawTile } from './drawTile.js';

export function create() {
    console.log('Creating game scene...'); // Debugging statement
    const tileWidth = 64; // Adjusted for isometric tiles
    const tileHeight = 32; // Adjusted for isometric tiles
    const mapWidth = 24; // Number of tiles horizontally
    const mapHeight = 24; // Number of tiles vertically

    // Generate the map
    const map = generateMap(mapWidth, mapHeight);

    // Draw the map
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const tile = map[y][x];
            drawTile(this, tile, x, y, tileWidth, tileHeight);
        }
    }

    // Initialize camera
    this.camera = this.cameras.main;

    // Add camera controls
    this.input.on('pointerdown', onPointerDown, this);
    this.input.on('pointermove', onPointerMove, this);

    // Add zoom controls
    this.input.on('wheel', onWheel, this);
}

function onPointerDown(pointer) {
    this.dragStartX = pointer.x;
    this.dragStartY = pointer.y;
}

function onPointerMove(pointer) {
    if (pointer.isDown) {
        this.camera.scrollX -= (pointer.x - this.dragStartX) * 0.5;
        this.camera.scrollY -= (pointer.y - this.dragStartY) * 0.5;

        this.dragStartX = pointer.x;
        this.dragStartY = pointer.y;
    }
}

function onWheel(pointer, gameObjects, dx, dy, dz) {
    // Adjust camera zoom level
    this.camera.zoom -= dy * 0.001; // Adjust the zoom sensitivity as needed

    // Limit zoom levels
    this.camera.zoom = Phaser.Math.Clamp(this.camera.zoom, 0.5, 2); // Adjust the min and max zoom levels as needed
}