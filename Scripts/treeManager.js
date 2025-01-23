export function spawnTree(scene, isoX, isoY, x, y) {
    const graphics = scene.add.graphics();
    graphics.fillStyle(0x8B4513, 1); // Brown color for the tree trunk
    graphics.fillRect(isoX - 5, isoY - 20, 10, 20); // Tree trunk
    graphics.fillStyle(0x228B22, 1); // Green color for the tree leaves
    graphics.fillCircle(isoX, isoY - 30, 15); // Tree leaves
    graphics.setDepth(isoY + 1); // Ensure tree is above the tile
    graphics.setInteractive(new Phaser.Geom.Circle(isoX, isoY - 30, 15), Phaser.Geom.Circle.Contains);
    graphics.on('pointerdown', () => {
        console.log('Tree clicked at:', x, y);
        // Add interaction logic here
    });
}