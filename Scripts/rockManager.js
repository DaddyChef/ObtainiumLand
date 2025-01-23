export function spawnRock(scene, isoX, isoY, x, y) {
    const graphics = scene.add.graphics();
    graphics.fillStyle(0x808080, 1); // Gray color for the rock

    // Draw a triangle to represent the rock
    graphics.beginPath();
    graphics.moveTo(isoX, isoY - 10); // Top point
    graphics.lineTo(isoX - 10, isoY + 10); // Bottom left point
    graphics.lineTo(isoX + 10, isoY + 10); // Bottom right point
    graphics.closePath();
    graphics.fillPath();

    graphics.setDepth(isoY + 1); // Ensure rock is above the tile
    graphics.setInteractive(new Phaser.Geom.Triangle(isoX, isoY - 10, isoX - 10, isoY + 10, isoX + 10, isoY + 10), Phaser.Geom.Triangle.Contains);
    graphics.on('pointerdown', () => {
        console.log('Rock clicked at:', x, y);
        // Add interaction logic here
    });
}