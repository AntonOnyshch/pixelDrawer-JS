import {LineDrawer} from './lineDrawer.js';
import {CircleDrawer} from './circleDrawer.js';

const pixelDrawer = {
    getLineDrawer: function(width, height,  alpha = true, bitPerPixel = 4) {
        return new LineDrawer(width, height,  alpha, bitPerPixel);
    },
    getCircleDrawer: function(width, height,  alpha = true, bitPerPixel = 4) {
        return new CircleDrawer(width, height,  alpha, bitPerPixel);
    }
}
export default pixelDrawer;