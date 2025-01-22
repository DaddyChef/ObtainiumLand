import { generateRandomMap } from './Scripts/mapGenerator.js';
import { drawTile } from './Scripts/drawTile.js';

window.onload = function () {
    console.log('Game is loading...'); // Debugging statement

    const config = {
        type: Phaser.AUTO,
        width: 320,     // best resolution to 
        height: 568,    // fit in mobile devices
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        input: {
            activePointers: 3 // Allow multiple pointers for mobile devices
        }
    };

    const game = new Phaser.Game(config);

    let camera;
    let dragStartX, dragStartY;

    function preload() {
        console.log('Preloading assets...'); // Debugging statement
        // Load the tilesheet
        this.load.spritesheet('spritesheet', 'assets/tilemaps/iso/spritesheet.png', { frameWidth: 32, frameHeight: 32 });
        // Load the tree sprite
        this.load.image('tree', 'assets/Tree1.png');
        // Change the background color to dark blue
        this.cameras.main.setBackgroundColor('#A8CA58');
    }

    function create() {
        console.log('Creating game scene...'); // Debugging statement
        const tileWidth = 32;
        const tileHeight = 16;
        const mapWidth = 32;
        const mapHeight = 32;

        // Create a random map
        const map = generateRandomMap(mapWidth, mapHeight);

        // Draw the map
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const tile = map[y][x];
                drawTile(this, tile, x, y, tileWidth, tileHeight);
            }
        }

        // Initialize camera
        camera = this.cameras.main;

        // Add camera controls
        this.input.on('pointerdown', onPointerDown, this);
        this.input.on('pointermove', onPointerMove, this);

        // Add zoom controls
        this.input.on('wheel', onWheel, this);
    }

    function update() {
        // Update the camera controls (if needed)
    }

    function onPointerDown(pointer) {
        dragStartX = pointer.x;
        dragStartY = pointer.y;
    }

    function onPointerMove(pointer) {
        if (pointer.isDown) {
            camera.scrollX -= (pointer.x - dragStartX) * 0.5;
            camera.scrollY -= (pointer.y - dragStartY) * 0.5;

            dragStartX = pointer.x;
            dragStartY = pointer.y;
        }
    }

    function onWheel(pointer, gameObjects, dx, dy, dz) {
        // Adjust camera zoom level
        camera.zoom -= dy * 0.001; // Adjust the zoom sensitivity as needed

        // Limit zoom levels
        camera.zoom = Phaser.Math.Clamp(camera.zoom, 0.5, 2); // Adjust the min and max zoom levels as needed
    }
};