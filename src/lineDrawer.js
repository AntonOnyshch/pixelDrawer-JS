import {PixelDrawer} from "./pixelDrawer.js";

export class LineDrawer extends PixelDrawer {
    constructor() {
        super();
        this.onVerticalDraw = (x, y, a) => { };
        this.onHorizontalDraw = (x, y, a) => { };
        this.vLineColor = new Uint8Array([22, 209, 109, 255]);
        this.hLineColor = new Uint8Array([89, 22, 222, 255]);
        this.radianK = Math.PI / 180;
        //const length = this.width > this.height ? this.width : this.height;
        this.vLine = new Array();
        this.hLine = new Array();
    }
    init(width, height) {
        super.init(width, height);

        this.internalVLineBuffer = new Array();
        this.internalHLineBuffer = new Array();
        const length = this.width > this.height ? this.width : this.height;
        this.vLine.length = length;
        this.hLine.length = length;
        this.hLineX = 0;
        this.hLineY = 0;
        this.hLineA = 0;
        this.vLineX = 0;
        this.vLineY = 0;
        this.vLineA = 0;
    }
    redrawHorizontalLine() {
        this.x0 = this.prev_H_X0;
        this.y0 = this.prev_H_Y0;
        this.x1 = this.prev_H_X1;
        this.y1 = this.prev_H_Y1;
        this.drawLine(this.internalHLineBuffer, this.hLine, this.hLineColor);
    }
    findUnknownCathetus(angleR = 0, knownCathetus = 0) {
        return Math.round(Math.sqrt(((knownCathetus / angleR) ** 2) - (knownCathetus ** 2)));
    }

    findCoordinates(offsetX = 0, offsetY = 0, sin = 0, cos = 0) {
        
        let unknown_cathetus = 0;

        let offsetXR = 0;
        let offsetYR = 0;

        if(cos < 0) {
            cos = cos * -1;
            sin = sin * -1;
        }
        
        //First Triangle
        if(sin <= cos || sin >= cos) {
            offsetXR = this.width - offsetX;
            unknown_cathetus = this.findUnknownCathetus(cos, offsetY);
            this.x0 = offsetX + unknown_cathetus;
            this.y0 = 0;

            if(unknown_cathetus > offsetXR) {
                unknown_cathetus = this.findUnknownCathetus(sin, offsetXR);
                this.x0 = this.width;
                this.y0 = offsetY - unknown_cathetus;
            }
        }
        if(sin <= 0 && sin >= -1) {
            offsetXR = offsetX;
            unknown_cathetus = this.findUnknownCathetus(cos, offsetY);
            this.x0 = offsetX - unknown_cathetus;
            this.y0 = 0;

            if(unknown_cathetus > offsetXR) {
                unknown_cathetus = this.findUnknownCathetus(sin, offsetXR);
                this.x0 = 0;
                this.y0 = offsetY - unknown_cathetus;
            }
        }

        //Second Triangle
        if(sin <= cos || sin >= cos) {
            offsetXR = offsetX;
            unknown_cathetus = this.findUnknownCathetus(cos, this.height - offsetY);
            this.x1 = offsetX - unknown_cathetus;
            this.y1 = this.height;

            if(unknown_cathetus > offsetXR) {
                unknown_cathetus = this.findUnknownCathetus(sin, offsetXR);
                this.x1 = 0;
                this.y1 = offsetY + unknown_cathetus;
            }
        }
        if(sin <= 0 && sin >= -1) {
            offsetXR = this.width - offsetX;
            unknown_cathetus = this.findUnknownCathetus(cos, this.height - offsetY);
            this.x1 = offsetX + unknown_cathetus;
            this.y1 = this.height;

            if(unknown_cathetus > offsetXR) {
                unknown_cathetus = this.findUnknownCathetus(sin, offsetXR);
                this.x1 = this.width;
                this.y1 = offsetY + unknown_cathetus;
            }
        }
    }

    clearInternalBuffer(buffer) {
        for (let i = 0; i < buffer.length; i++) {
            this.data[buffer[i]] = 0;
            this.data[buffer[i] + 1] = 0;
            this.data[buffer[i] + 2] = 0;
            this.data[buffer[i] + 3] = 0;
        }
    }
    
    drawCruciateLine(cX, cY, aRV, aRH, drawV = true, drawH = true) {
            if(drawV) {

            
            this.findCoordinates(cX, cY, aRV.sin, aRV.cos);

            this.prev_V_X0 = this.x0;
            this.prev_V_Y0 = this.y0;
            this.prev_V_X1 = this.x1;
            this.prev_V_Y1 = this.y1;
    
            // if(onlyMatrix) {
            //     this.getPixelBuffer(this.x0, this.y0, this.x1, this.y1, this.canvasWidthFactor, this.vLine);
            // }
            // else {
                
            // }
            this.drawLine(this.internalVLineBuffer, this.vLine, this.vLineColor);
            this.onVerticalDraw(cX, cY, 0);
            }

            if(drawH) {
            this.findCoordinates(cX, cY, aRH.sin, aRH.cos);

            this.prev_H_X0 = this.x0;
            this.prev_H_Y0 = this.y0;
            this.prev_H_X1 = this.x1;
            this.prev_H_Y1 = this.y1;
    
            // if(onlyMatrix) {
            //     this.getPixelBuffer(this.x0, this.y0, this.x1, this.y1, this.canvasWidthFactor, this.hLine);
            // }
            // else {
                
            // }
            this.drawLine(this.internalHLineBuffer, this.hLine, this.hLineColor);
            this.onHorizontalDraw(cX, cY, 0);
        }
    }

    drawLine(internalBuffer, pixelBuffer, color) {
        this.clearInternalBuffer(internalBuffer);
        this.draw(this.x0, this.y0, this.x1, this.y1, color, (x, y, p) => {
            internalBuffer[x] = p;
            pixelBuffer[x] = y;
        });
    }
    draw(x0, y0, x1, y1, color, pixelCalc = (i, y, pixel) => { }) {
        let steep = false;
        if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) { // if the line is steep, we transpose the image
            [x0, y0] = [y0, x0];
            [x1, y1] = [y1, x1];
            steep = true;
        }
        if (x0 > x1) { // make it left-to-right
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }
        const dx = x1 - x0;
        const dy = y1 - y0;
        const derror = Math.abs(dy) * 2;
        let error = 0;
        let y = y0;
        let x = x0;
        const yadd = y1 > y0 ? 1 : -1;
        const dx2 = dx * 2;
        let pixel = 0;
        if(steep) {
            for (; x < x1; x++) {
                pixel = x * this.canvasWidthFactor + y * 4;
                pixelCalc(x, y, pixel);
    
                this.data[pixel] = color[0];
                this.data[pixel + 1] = color[1];
                this.data[pixel + 2] = color[2];
                this.data[pixel + 3] = color[3];
                error += derror;
                if (error > dx) {
                    y += yadd;
                    error -= dx2;
                }
            }
        }
        else {
            for (; x < x1; x++) {
                pixel = y * this.canvasWidthFactor + x * 4;
                pixelCalc(x, y, pixel);
    
                this.data[pixel] = color[0];
                this.data[pixel + 1] = color[1];
                this.data[pixel + 2] = color[2];
                this.data[pixel + 3] = color[3];
                error += derror;
                if (error > dx) {
                    y += yadd;
                    error -= dx2;
                }
            }
        }

    }
    getPixelBuffer(x0, y0, x1, y1, stride, outBuffer) {
        let steep = false;
        if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) { // if the line is steep, we transpose the image
            [x0, y0] = [y0, x0];
            [x1, y1] = [y1, x1];
            steep = true;
        }
        if (x0 > x1) { // make it left-to-right
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }
        const dx = x1 - x0;
        const dy = y1 - y0;
        const derror = Math.abs(dy) * 2;
        let error = 0;
        let y = y0;
        let x = x0;
        const yadd = y1 > y0 ? 1 : -1;
        const dx2 = dx * 2;
        let pixel = 0;
        if(steep) {
            for (; x < x1; x++) {
                pixel = x * stride + y * 4;
                outBuffer[x] = y;
                error += derror;
                if (error > dx) {
                    y += yadd;
                    error -= dx2;
                }
            }
        }
        else {
            for (; x < x1; x++) {
                pixel = y * stride + x * 4;
                outBuffer[x] = y;
                error += derror;
                if (error > dx) {
                    y += yadd;
                    error -= dx2;
                }
            }
        }

    }
    redrawVerticalLine() {
        this.x0 = this.prev_V_X0;
        this.y0 = this.prev_V_Y0;
        this.x1 = this.prev_V_X1;
        this.y1 = this.prev_V_Y1;
        this.drawLine(this.internalVLineBuffer, this.vLine, this.vLineColor);
    }
}