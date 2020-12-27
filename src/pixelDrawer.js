/** 
* Base class for drawing on data buffer
*/
export class PixelDrawer {

    /**
    * @param {Number} width - Width of canvas
    * @param {Number} height - Height of canvas
    * @param {Boolean} [alpha = true] - Indicates whether or not your canvas use alpha channel. By default is true.
    * @param {Number} [bitPerPixel = 4] - The number of bits per pixel. For example: 4 bits per pixel means rgba channel.
    */
    constructor(width, height, alpha = true, bitPerPixel = 4) {
        this.data = undefined;
        this.alpha = alpha;
        this.width = width;
        this.height = height;
        this.stride = this.width * bitPerPixel;
    }

    /** 
    * Clear the all data buffer
    */
    clearData() {
        const alpha = this.alpha ? 0 : 255;
        const width = this.width;
        const stride = this.stride;

        let pixel = 0;
        
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < width; j++) {
                pixel = i * stride + j * 4;
                this.data[pixel] = 0;
                this.data[pixel + 1] = 0;
                this.data[pixel + 2] = 0;
                this.data[pixel + 3] = alpha;
            }
        }
    }
}