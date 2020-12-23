import {LineDrawer} from './lineDrawer.js';

const pixelDrawer = {
    getLineDrawer: function(width, height,  alpha = true, bitPerPixel = 4) {
        return new LineDrawer(width, height,  alpha, bitPerPixel);
    }
}
export default pixelDrawer;