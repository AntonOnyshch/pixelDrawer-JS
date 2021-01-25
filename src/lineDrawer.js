import {PixelDrawer} from "./pixelDrawer.js";

/** Allows you to draw lines directly on data buffer 
* @extends PixelDrawer
*/
export class LineDrawer extends PixelDrawer {
    

    constructor() {
        super();
        this.linesBuffers = new Array();
    }

    /**
    * @param {Number} width - Width of canvas
    * @param {Number} height - Height of canvas
    * @param {Boolean} [alpha = true] - Indicates whether or not your canvas use alpha channel. By default is true.
    * @param {Number} [bitPerPixel = 4] - The number of bits per pixel. For example: 4 bits per pixel means rgba channel.
    */
    init(width, height,  alpha = true, bitPerPixel = 4) {
        super.init(width, height, alpha, bitPerPixel);

        //Calculate length for internal buffer. 
        //We will put pixels in this buffer and then use it for clearing our drawn line
        /** @private */
        this.bufferLength = this.width > this.height ? this.width : this.height;
    }

    /** 
    * Clear the only pixels where our line has drawn
    * @param {Number} index - index that indicates drawn line
    */
   clearData(index = -1) {
        if(this.linesBuffers.length === 0) {
            return;
        }
        else if(index >= this.linesBuffers.length) {
            throw new Error(`Index must be less than ${this.linesBuffers.length}`);
        }

        const alpha = this.alpha ? 0 : 255;
        if(index === -1) {
            let pixel = 0;
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    pixel = i * this.stride + j * 4;
                    this.data[pixel] = 0;
                    this.data[pixel + 1] = 0;
                    this.data[pixel + 2] = 0;
                    this.data[pixel + 3] = alpha;
                }
            }
        }
        else {
            const pixelBuffer = this.linesBuffers[index][0];
            for (let i = 0; i < pixelBuffer.length; i++) {
                this.data[pixelBuffer[i]] = 0;
                this.data[pixelBuffer[i] + 1] = 0;
                this.data[pixelBuffer[i] + 2] = 0;
                this.data[pixelBuffer[i] + 3] = alpha;
            }
    
            pixelBuffer.length = 0;
    
            this.linesBuffers[index][1].length = 0;
        }

    }

    /**
     * Draw a line on data buffer
     * @param {Number} x0 - x coordinate that represents start of the line
     * @param {Number} y0 - y coordinate that represents start of the line
     * @param {Number} x1 - x coordinate that represents end of the line
     * @param {Number} y1 - y coordinate that represents end of the line
     * @param {(Uint8Array | Uint8ClampedArray)} color - Color of the line
    */
    draw(x0, y0, x1, y1, color) {
        this.clearDataBuffer(this.linesBuffers.length - 1);
        if(this.linesBuffers.length === 0) {
            this.linesBuffers.push([new Array(this.bufferLength), new Array(this.bufferLength)]);
        }
        const pixelBuffer = this.linesBuffers[this.linesBuffers.length - 1][0];
        const yBuffer = this.linesBuffers[this.linesBuffers.length - 1][1];
        this.internalDraw(x0, y0, x1, y1, (x, y, p) => {
            pixelBuffer[x] = p;
            yBuffer[x] = y;
            this.data[p] = color[0];
            this.data[p + 1] = color[1];
            this.data[p + 2] = color[2];
            this.data[p + 3] = color[3];
        });

        return 0;
    }

    /**
     * Add new line on data buffer
     * @param {Number} x0 - x coordinate that represents start of the line
     * @param {Number} y0 - y coordinate that represents start of the line
     * @param {Number} x1 - x coordinate that represents end of the line
     * @param {Number} y1 - y coordinate that represents end of the line
     * @param {(Uint8Array | Uint8ClampedArray)} color - Color of the line
    */
    addLine(x0, y0, x1, y1, color) {
        this.linesBuffers.push([new Array(this.bufferLength), new Array(this.bufferLength)]);
        const index = this.linesBuffers.length - 1;
        const pixelBuffer = this.linesBuffers[index][0];
        const yBuffer = this.linesBuffers[index][1];
        this.internalDraw(x0, y0, x1, y1, (x, y, p) => {
            pixelBuffer[x] = p;
            yBuffer[x] = y;
            this.data[p] = color[0];
            this.data[p + 1] = color[1];
            this.data[p + 2] = color[2];
            this.data[p + 3] = color[3];
        });

        return index;
    }

    /**
     * Internal method for drawing a line on data buffer
     * @param {Number} x0 - x coordinate that represents start of the line
     * @param {Number} y0 - y coordinate that represents start of the line
     * @param {Number} x1 - x coordinate that represents end of the line
     * @param {Number} y1 - y coordinate that represents end of the line
     * @callback pixelReadyCallback
     * @param {pixelReadyCallback} pixelReady - The callback that will be fired when pixel will be calculated.
    */
    internalDraw(x0, y0, x1, y1, pixelReady = (x, y, pixel) => { }) {
        //Steep is true if the width of line is less than height
        let steep = false;

        // if the line is steep, we transpose the coordinates
        if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
            [x0, y0] = [y0, x0];
            [x1, y1] = [y1, x1];
            steep = true;
        }
        // make it left-to-right
        if (x0 > x1) {
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }
        const dx = x1 - x0;
        const dy = y1 - y0;
        const derror = Math.abs(dy) * 2;
        const yadd = y1 > y0 ? 1 : -1;
        const dx2 = dx * 2;

        let error = 0;
        let y = y0;
        let x = x0;
        let pixel = 0;

        //Calculate error
        const _setError = () => {
            error += derror;
            if (error > dx) {
                y += yadd;
                error -= dx2;
            }
        }

        //If line is steep we treat it like from up to down(or down to up)
        if(steep) {
            for (; x < x1; x++) {
                pixel = x * this.stride + y * 4;
                pixelReady(x, y, pixel);
                _setError();
            }
        }
        else {//from left to right(or right to left)
            for (; x < x1; x++) {
                pixel = y * this.stride + x * 4;
                pixelReady(x, y, pixel);
                _setError();
            }
        }

    }
}