import {PixelDrawer} from "./pixelDrawer.js";

export class TriangleDrawer extends PixelDrawer {

    constructor() {
        super();
    }

    init(width, height,  alpha = true, bitPerPixel = 4) {
        super.init(width, height,  alpha, bitPerPixel);

        this._zBuffer = new Array(width * height);
    }

    updateZBuffer() {
        for (let i = 0; i < this._zBuffer.length; i++) {
            this._zBuffer[i] = -2147483648;
        }
    }

    draw(a, b, c, color) {
        this.drawTriangle(a, b, c, color);
    }
    
    drawTriangle(a, b, c, color)
    {
        let tValueSwap, x1, x2, sy, tmp, pixel;

        const width = this.width;

        if(a[1] > b[1]) {
            tValueSwap = a[0];
            a[0] = b[0];
            b[0] = tValueSwap;

            tValueSwap = a[1];
            a[1] = b[1];
            b[1] = tValueSwap;
        }
        if(a[1] > c[1]) {
            tValueSwap = a[0];
            a[0] = c[0];
            c[0] = tValueSwap;

            tValueSwap = a[1];
            a[1] = c[1];
            c[1] = tValueSwap;
        }
        if(b[1] > c[1]) {
            tValueSwap = b[0];
            b[0] = c[0];
            c[0] = tValueSwap;

            tValueSwap = b[1];
            b[1] = c[1];
            c[1] = tValueSwap;
        }
        
        const ca = (c[0] - a[0]) / (c[1] - a[1]);
        const ba = (b[0] - a[0]) / (b[1] - a[1]);
        const cb = (c[0] - b[0]) / (c[1] - b[1]);

        let averageZ = (a[2] + b[2] + c[2]) / 2;

        let idx = 0;

        for (sy = a[1]; sy <= c[1]; sy++) {
            x1 = a[0] + (sy - a[1]) * ca;
            if (sy < b[1]) {
                x2 = a[0] + (sy - a[1]) * ba;
            } else {
                if(c[1] === b[1]) {
                    x2 = b[0];
                } else {
                    x2 = b[0] + (sy - b[1]) * cb;
                }
            }
            if (x1 > x2) { tmp = x1; x1 = x2; x2 = tmp; }

            x1 = Math.round(x1);
            x2 = Math.round(x2);
            
            for (let i = x1; i < x2 + 1; i++)
            {
                idx = i + (sy * width);

                if(this._zBuffer[idx] < averageZ)
                {
                    pixel = sy * this.stride + i * 4;
                
                    this.data[pixel] = color[0];
                    this.data[pixel+1] = color[1];
                    this.data[pixel+2] = color[2];
                    this.data[pixel+3] = color[3];

                    this._zBuffer[idx] = averageZ;
                }
            }
        }
    }

}