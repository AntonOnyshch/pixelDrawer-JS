import {PixelDrawer} from "./pixelDrawer.js";

export class LineDrawer extends PixelDrawer {
    constructor(width, height,  alpha = true, bitPerPixel = 4) {
        super(width, height, alpha, bitPerPixel);

        //Init empty functions so we won't check for undefined every time 
        this.onVerticalDraw = (x, y, a) => { };
        this.onHorizontalDraw = (x, y, a) => { };

        //Calculate length for internal buffer. 
        //We will put pixels in this buffer and then use it for clearing our drawn line
        const length = this.width > this.height ? this.width : this.height;
        this.internalBuffer = new Array(length);
    }

    //Clear only pixels where our line was drawn
    clearInternalBuffer() {
        const alpha = this.alpha ? 0 : 255;
        const buff = this.internalBuffer;
        for (let i = 0; i < buff.length; i++) {
            this.data[buff[i]] = 0;
            this.data[buff[i] + 1] = 0;
            this.data[buff[i] + 2] = 0;
            this.data[buff[i] + 3] = alpha;
        }
    }

    draw(x0, y0, x1, y1, color) {
        this.clearInternalBuffer();
        this.internalDraw(x0, y0, x1, y1, (x, y, p) => {
            this.internalBuffer[x] = p;

            this.data[p] = color[0];
            this.data[p + 1] = color[1];
            this.data[p + 2] = color[2];
            this.data[p + 3] = color[3];
        });
    }

    //Draw line
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