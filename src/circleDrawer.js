import {PixelDrawer} from "./pixelDrawer.js";

/** Allows you to draw circles directly on data buffer 
 * @extends PixelDrawer
*/
export class CircleDrawer extends PixelDrawer {
    /**
    * @param {Number} width - Width of canvas
    * @param {Number} height - Height of canvas
    * @param {Boolean} [alpha = true] - Indicates whether or not your canvas use alpha chanel. By default is true.
    * @param {Number} [bitPerPixel = 4] - The number of bit per pixel. For example: 4 bit per pixel means rgba channel.
    */
    constructor() {
        super();

        /** @private */
        this.internalBuffer = new Array();
    }

    init(width, height, alpha = true, bitPerPixel = 4) {
        super.init(width, height, alpha, bitPerPixel);
    }

    /** 
    * Clear the only pixels where our circle has drawn
    */
    clearInternalBuffer() {
        const alpha = this.alpha ? 0 : 255;
        const buff = this.internalBuffer;
        for (let i = 0; i < buff.length; i++) {
            this.data[buff[i][0]] = 0;
            this.data[buff[i][0] + 1] = 0;
            this.data[buff[i][0] + 2] = 0;
            this.data[buff[i][0] + 3] = alpha;

            this.data[buff[i][1]] = 0;
            this.data[buff[i][1] + 1] = 0;
            this.data[buff[i][1] + 2] = 0;
            this.data[buff[i][1] + 3] = alpha;

            this.data[buff[i][2]] = 0;
            this.data[buff[i][2] + 1] = 0;
            this.data[buff[i][2] + 2] = 0;
            this.data[buff[i][2] + 3] = alpha;

            this.data[buff[i][3]] = 0;
            this.data[buff[i][3] + 1] = 0;
            this.data[buff[i][3] + 2] = 0;
            this.data[buff[i][3] + 3] = alpha;
        }
    }

    /**
     * Draw a circle on data buffer
     * @param {Number} centerX - X coordinate that represents center of the circle
     * @param {Number} centerY - Y coordinate that represents center of the circle
     * @param {Number} radius - Radius of the circle
     * @param {(Uint8Array | Uint8ClampedArray)} color - Color of the circle
     * @param {Number} [strokeThickness = 1] - Thickness of stroke
    */
    draw(centerX, centerY, radius, color, strokeThickness = 1) {
       this.clearInternalBuffer();
       this.internalBuffer.length = 0;
       const data = this.data;
       for (let i = 0; i < strokeThickness; i++) {
        this.internalDraw(centerX, centerY, radius + i, (p1, p2, p3, p4) => {

            this.internalBuffer.push(new Int32Array([p1, p2, p3, p4]));
    
            data[p1] = color[0];
            data[p1 + 1] = color[1];
            data[p1 + 2] = color[2];
            data[p1 + 3] = color[3];
    
            data[p2] = color[0];
            data[p2 + 1] = color[1];
            data[p2 + 2] = color[2];
            data[p2 + 3] = color[3];
    
            data[p3] = color[0];
            data[p3 + 1] = color[1];
            data[p3 + 2] = color[2];
            data[p3 + 3] = color[3];
    
            data[p4] = color[0];
            data[p4 + 1] = color[1];
            data[p4 + 2] = color[2];
            data[p4 + 3] = color[3];
           });
       }
    }

    /**
     * Internal method for drawing a circle on data buffer
     * @param {Number} x1 - X coordinate that represents center of the circle
     * @param {Number} x1 - Y coordinate that represents center of the circle
     * @param {Number} r - Radius of the circle
     * @callback pixelReadyCallback
     * @param {pixelReadyCallback} pixelReady - The callback that will be fired when all 4 pixels will be calculated.
    */
    internalDraw(x1, y1, r, pixelReady = (p1, p2, p3, p4) => { }) {

        let pixel1, pixel2, pixel3, pixel4;
        let x = 0;
        let y = r;
        let delta = 1 - 2 * r;
        let error = 0;
        
        const stride = this.stride;
        while (y >= 0) {
            pixel1 = (y1 + y) * stride + (x1 + x) * 4;
            pixel2 = (y1 - y) * stride + (x1 + x) * 4;
            pixel3 = (y1 + y) * stride + (x1 - x) * 4;
            pixel4 = (y1 - y) * stride + (x1 - x) * 4;

            pixelReady(pixel1, pixel2, pixel3, pixel4);

            error = 2 * (delta + y) - 1;
            if ((delta < 0) && (error <= 0)) {
                delta += 2 * ++x + 1;
                continue;
            }
            if ((delta > 0) && (error >= 0)) {
                delta -= 2 * --y + 1;
                continue;
            }
            delta += 2 * (++x - y--);
        }
    }
}