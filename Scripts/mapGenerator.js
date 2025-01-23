export function generateMap(width, height) {
    const map = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push({ x: x, y: y, tree: false, rock: false, pond: false });
        }
        map.push(row);
    }

    // Add one pond
    const pondX = Math.floor(Math.random() * (width - 4));
    const pondY = Math.floor(Math.random() * (height - 4));
    for (let dy = 0; dy < 5; dy++) {
        for (let dx = 0; dx < 5; dx++) {
            map[pondY + dy][pondX + dx].pond = true;
        }
    }

    // Add trees and rocks
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!map[y][x].pond) {
                const hasTree = Math.random() < 0.1; // 10% chance to have a tree
                const hasRock = !hasTree && Math.random() < 0.1; // 10% chance to have a rock, but only if there's no tree
                map[y][x].tree = hasTree;
                map[y][x].rock = hasRock;
            }
        }
    }

    return map;
}