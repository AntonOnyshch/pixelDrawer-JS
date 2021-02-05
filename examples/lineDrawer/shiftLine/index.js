import {LineDrawer} from '../../../src/lineDrawer.js';
window.coors = {
  x: 0,
  y: 0
}
window.cvsContext = undefined;
window.cvsImageData = undefined;
window.lineDrawer = undefined;
window.init = function(canvasId) {
      const cvsRef = document.getElementById(canvasId);
      window.cvsContext = cvsRef.getContext('2d', { alpha: false });
      window.cvsImageData = window.cvsContext.getImageData(0, 0, cvsRef.width, cvsRef.height);

      window.lineDrawer = new LineDrawer();
      window.lineDrawer.init(window.cvsImageData.width, window.cvsImageData.height, false);

      window.lineDrawer.data = window.cvsImageData.data;
      const color = new Uint8Array([22, 209, 109, 255]);
      const centerX = Math.round(window.cvsImageData.width * 0.5);
      const centerY = Math.round(window.cvsImageData.height * 0.5);

      window.lineDrawer.draw(centerX, centerY - 50, centerX, centerY + 50, color);
      //window.lineDrawer.draw(centerX - 50, centerY, centerX + 50, centerY, color);
      window.cvsContext.putImageData(window.cvsImageData, 0, 0);
      window.coors.x = centerX;
      window.coors.y = centerY;
      let shiftX = 0;
      let shiftY = 0;
      cvsRef.onmousemove = (e) => {
        shiftX = e.offsetX - window.coors.x;
        shiftY = e.offsetY - window.coors.y;
        if(e.offsetX != window.coors.x) {
          window.lineDrawer.shiftX(window.lineDrawer.linesBuffers.length - 1, shiftX, color);
          window.cvsContext.putImageData(window.cvsImageData, 0, 0);
          window.coors.x = e.offsetX;
          window.coors.y = e.offsetY;
        }
      }
}

window.shiftX = function shiftX(shiftX) {
  const color = new Uint8Array([22, 209, 109, 255]);
  lineDrawer.shiftX(window.lineDrawer.linesBuffers.length - 1, shiftX, color);
  cvsContext.putImageData(window.cvsImageData, 0, 0);
}