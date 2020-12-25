import {PixelDrawer} from "./pixelDrawer.js";

export class CircleDrawer extends PixelDrawer {
    constructor(width, height, alpha = true, bitPerPixel = 4) {
        super(width, height, alpha, bitPerPixel);

        this.internalBuffer = new Array();
    }

    //Clear only pixels where our circle was drawn
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

    draw(x1, y1, r, color) {
       this.clearInternalBuffer();
       this.internalBuffer.length = 0;
       const data = this.data;
       this.internalDraw(x1, y1, r, (p1, p2, p3, p4) => {

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