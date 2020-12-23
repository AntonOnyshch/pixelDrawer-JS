import PixelDrawer from "./pixelDrawer.js";

export default class CircleDrawer extends PixelDrawer {
    constructor(width, height) {
        super(width, height);
    }
    drawCircle(x1, y1, r) {
        //console.log(`${x1} : ${y1} : ${r}`);
        let pixel1, pixel2, pixel3, pixel4;
        let x = 0;
        let y = r;
        let delta = 1 - 2 * r;
        let error = 0;
        const data = this.data;
        const canvasWidthFactor = this.canvasWidthFactor;
        while (y >= 0) {
            pixel1 = (y1 + y) * canvasWidthFactor + (x1 + x) * 4;
            pixel2 = (y1 - y) * canvasWidthFactor + (x1 + x) * 4;
            pixel3 = (y1 + y) * canvasWidthFactor + (x1 - x) * 4;
            pixel4 = (y1 - y) * canvasWidthFactor + (x1 - x) * 4;
            data[pixel1] = 250;
            data[pixel1 + 1] = 0;
            data[pixel1 + 2] = 123;
            data[pixel1 + 3] = 255;
            data[pixel2] = 250;
            data[pixel2 + 1] = 0;
            data[pixel2 + 2] = 123;
            data[pixel2 + 3] = 255;
            data[pixel3] = 250;
            data[pixel3 + 1] = 0;
            data[pixel3 + 2] = 123;
            data[pixel3 + 3] = 255;
            data[pixel4] = 250;
            data[pixel4 + 1] = 0;
            data[pixel4 + 2] = 123;
            data[pixel4 + 3] = 255;
            error = 2 * (delta + y) - 1;
            if ((delta < 0) && (error <= 0)) {
                delta += 2 * ++x + 1;
                continue;
            }
            if ((delta > 0) && (error > 0)) {
                delta -= 2 * --y + 1;
                continue;
            }
            delta += 2 * (++x - y--);
        }
    }
}