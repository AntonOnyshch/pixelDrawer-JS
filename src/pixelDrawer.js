export class PixelDrawer {
    constructor(width, height, alpha = true, bitPerPixel = 4) {
        this.data = undefined;
        this.alpha = alpha;
        this.width = width;
        this.height = height;
        this.stride = this.width * bitPerPixel;
    }

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