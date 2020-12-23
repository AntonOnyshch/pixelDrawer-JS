export class PixelDrawer {
    constructor() {
        this.data = undefined;
        this.width = 0;
        this.height = 0;
        this.canvasWidthFactor = 0;
        //this.init(width, height);
    }
    init(width, height) {
        this.width = width;
        this.height = height;
        this.canvasWidthFactor = this.width * 4;
    }
    clearData(opacity = 0) {
        let pixel = 0;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                pixel = i * this.canvasWidthFactor + j * 4;
                this.data[pixel] = 0;
                this.data[pixel + 1] = 0;
                this.data[pixel + 2] = 0;
                this.data[pixel + 3] = opacity;
            }
        }
    }
}