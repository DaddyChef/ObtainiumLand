export function spawnTree(scene, isoX, isoY, x, y) {
    const tree = scene.add.image(isoX, isoY, 'tree');
    tree.setOrigin(0.5, 1); // Set pivot to bottom center
    tree.setDepth(isoY + 1); // Ensure tree is above the tile
    tree.setInteractive();
    tree.on('pointerdown', () => {
        console.log('Tree clicked at:', x, y);
        // Add interaction logic here
    });
}