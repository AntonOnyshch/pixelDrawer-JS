import {LineDrawer} from './lineDrawer.js';
import {CircleDrawer} from './circleDrawer.js';

const pixelDrawer = {
    /**
    * @param {Number} width - Width of canvas
    * @param {Number} height - Height of canvas
    * @param {Boolean} [alpha = true] - Indicates whether or not your canvas use alpha channel. By default is true.
    * @param {Number} [bitPerPixel = 4] - The number of bits per pixel. For example: 4 bits per pixel means rgba channel.
    */
    getLineDrawer: function() {
        return new LineDrawer();
    },
    /**
    * @param {Number} width - Width of canvas
    * @param {Number} height - Height of canvas
    * @param {Boolean} [alpha = true] - Indicates whether or not your canvas use alpha channel. By default is true.
    * @param {Number} [bitPerPixel = 4] - The number of bits per pixel. For example: 4 bits per pixel means rgba channel.
    */
    getCircleDrawer: function() {
        return new CircleDrawer();
    }
}
export default pixelDrawer;