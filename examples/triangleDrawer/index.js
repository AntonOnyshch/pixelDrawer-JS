import { TriangleDrawer } from '../../src/triangleDrawer.js';

window.init = function(canvasId) {
      const cvsRef = document.getElementById(canvasId);
      const cvsContext = cvsRef.getContext('2d', { alpha: false });
      const cvsImageData = cvsContext.getImageData(0, 0, cvsRef.width, cvsRef.height);

      const drawer = new TriangleDrawer();
      drawer.init(cvsImageData.width, cvsImageData.height, false);

      drawer.data = cvsImageData.data;
      const color = new Uint8Array([22, 209, 109, 255]);
      const triangleA = new Array(450, 250, 200);
      const triangleB = new Array(450, 50, 200);
      const triangleC = new Array(250, 250, 200);

      drawer.updateZBuffer();

      drawer.draw(triangleA, triangleB, triangleC, color);
      cvsContext.putImageData(cvsImageData, 0, 0);

      // cvsRef.onmousemove = (e) => {
      //   drawer.draw(centerX, centerY, e.offsetX, e.offsetY, color);
      //   cvsContext.putImageData(cvsImageData, 0, 0);
      // }
}
