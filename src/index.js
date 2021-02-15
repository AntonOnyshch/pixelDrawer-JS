import {LineDrawer} from './lineDrawer.js';
import {CircleDrawer} from './circleDrawer.js';
import { TriangleDrawer } from './triangleDrawer.js';

const pixelDrawer = {
    getLineDrawer: function() {
        return new LineDrawer();
    },
    getCircleDrawer: function() {
        return new CircleDrawer();
    },
    getTriangleDrawer: function() {
        return new TriangleDrawer();
}
}
export default pixelDrawer;