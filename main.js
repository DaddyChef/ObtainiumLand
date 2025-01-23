import { preload } from './Scripts/preload.js';
import { create } from './Scripts/create.js';
import { update } from './Scripts/update.js';

window.onload = function () {
    console.log('Game is loading...'); // Debugging statement

    const config = {
        type: Phaser.AUTO,
        width: 1024,     // Adjusted resolution for better visibility
        height: 768,    // Adjusted resolution for better visibility
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
};