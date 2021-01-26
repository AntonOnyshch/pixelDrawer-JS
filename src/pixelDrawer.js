/** 
* Base class for drawing on data buffer
*/
export class PixelDrawer {

    constructor() {
        this.data = undefined;
    }

    /**Set initial values
    * @param {Number} width - Width of canvas
    * @param {Number} height - Height of canvas
    * @param {Boolean} [alpha = true] - Indicates whether or not your canvas use alpha channel. By default is true.
    * @param {Number} [bitPerPixel = 4] - The number of bits per pixel. For example: 4 bits per pixel means rgba channel.
     */
    init(width, height, alpha = true, bitPerPixel = 4) {
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

    /** 
    * Set one pixel to data buffer
    * @param {Number} pixel - pixel value according to bitPerPixel parameter
    * @param {Array} color - array of RGBA
    */
    setPixel(pixel, color) {
        // if(pixel === undefined || pixel < 0) {
        //     throw new Error("pixel value must be a positive number");
        // }
        // else if(color === undefined || (color instanceof Array && color.length < 3)) {
        //     throw new Error("color value must be an array and has length bigger than 2");
        // }
        this.data[pixel] = color[0];
        this.data[pixel + 1] = color[1];
        this.data[pixel + 2] = color[2];
        this.data[pixel + 3] =  this.alpha ? color[3] : 255;
    }
}