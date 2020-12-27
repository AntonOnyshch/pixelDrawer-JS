import {CircleDrawer} from '../../src/circleDrawer.js';

window.init = function(canvasId) {
      const cvsRef = document.getElementById(canvasId);
      const cvsContext = cvsRef.getContext('2d', { alpha: false });
      const cvsImageData = cvsContext.getImageData(0, 0, cvsRef.width, cvsRef.height);

      const drawer = new CircleDrawer(cvsImageData.width, cvsImageData.height, false);

      drawer.data = cvsImageData.data;
      const color = new Uint8Array([0, 0, 255, 255]);

      cvsRef.onmousemove = (e) => {
          drawer.draw(e.offsetX, e.offsetY, 30, color, 3);
          cvsContext.putImageData(cvsImageData, 0, 0);
      }
}
