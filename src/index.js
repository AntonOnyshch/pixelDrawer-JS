import {LineDrawer} from './lineDrawer.js';
import {CircleDrawer} from './circleDrawer.js';

const pixelDrawer = {
    /**
    * @param {Number} width - Width of canvas
    * @param {Number} height - Height of canvas
    * @param {Boolean} [alpha = true] - Indicates whether or not your canvas use alpha channel. By default is true.
    * @param {Number} [bitPerPixel = 4] - The number of bits per pixel. For example: 4 bits per pixel means rgba channel.
    */
    getLineDrawer: function(width, height,  alpha = true, bitPerPixel = 4) {
        return new LineDrawer(width, height,  alpha, bitPerPixel);
    },
    /**
    * @param {Number} width - Width of canvas
    * @param {Number} height - Height of canvas
    * @param {Boolean} [alpha = true] - Indicates whether or not your canvas use alpha channel. By default is true.
    * @param {Number} [bitPerPixel = 4] - The number of bits per pixel. For example: 4 bits per pixel means rgba channel.
    */
    getCircleDrawer: function(width, height,  alpha = true, bitPerPixel = 4) {
        return new CircleDrawer(width, height,  alpha, bitPerPixel);
    }
}
export default pixelDrawer;