export function create() {
    // Assuming you have a tilemap and layers set up
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);

    // Calculate the center of the map
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;

    // Set the camera to focus on the center of the map
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setZoom(1); // Adjust zoom level if needed
    this.cameras.main.centerOn(centerX, centerY);

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

function onWheel(pointer, gameObjects, deltaX, deltaY, deltaZ) {
    this.camera.zoom -= deltaY * 0.001;
    this.camera.zoom = Phaser.Math.Clamp(this.camera.zoom, 0.5, 2);
}