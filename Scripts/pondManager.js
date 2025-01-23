export function spawnPond(scene, isoX, isoY, x, y) {
    const graphics = scene.add.graphics();
    graphics.fillStyle(0x0000FF, 1); // Blue color for the pond

    // Draw a random shape to represent the pond
    const shapeType = Math.floor(Math.random() * 3); // Randomly choose between 3 shapes
    graphics.beginPath();
    if (shapeType === 0) {
        // Draw a circle
        graphics.fillCircle(isoX, isoY, 20);
    } else if (shapeType === 1) {
        // Draw an ellipse
        graphics.fillEllipse(isoX, isoY, 30, 20);
    } else {
        // Draw a polygon (triangle)
        graphics.moveTo(isoX, isoY - 20);
        graphics.lineTo(isoX - 20, isoY + 20);
        graphics.lineTo(isoX + 20, isoY + 20);
        graphics.closePath();
        graphics.fillPath();
    }

    graphics.setDepth(isoY + 1); // Ensure pond is above the tile
    graphics.setInteractive(new Phaser.Geom.Circle(isoX, isoY, 20), Phaser.Geom.Circle.Contains);
    graphics.on('pointerdown', () => {
        console.log('Pond clicked at:', x, y);
        // Add interaction logic here
    });
}