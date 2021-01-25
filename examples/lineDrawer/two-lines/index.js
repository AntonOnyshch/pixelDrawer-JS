import {LineDrawer} from '../../../src/lineDrawer.js';

window.init = function(canvasId) {
      const cvsRef = document.getElementById(canvasId);
      const cvsContext = cvsRef.getContext('2d', { alpha: false });
      const cvsImageData = cvsContext.getImageData(0, 0, cvsRef.width, cvsRef.height);

      const lineDrawer = new LineDrawer();
      lineDrawer.init(cvsImageData.width, cvsImageData.height, false);
      lineDrawer.data = cvsImageData.data;
      const color1 = new Uint8Array([22, 209, 109, 255]);
      const color2 = new Uint8Array([209, 22, 19, 255]);
      const centerX = Math.round(cvsImageData.width * 0.5);
      const centerY = Math.round(cvsImageData.height * 0.5);

      cvsRef.onmousemove = (e) => {
        const index1 = lineDrawer.addLine(centerX, centerY, e.offsetX, e.offsetY, color1);
        const index2 = lineDrawer.addLine(centerX + 25, centerY, e.offsetX, e.offsetY, color2);
        cvsContext.putImageData(cvsImageData, 0, 0);
        lineDrawer.clearData(index1);
        lineDrawer.clearData(index2);
      }
}
