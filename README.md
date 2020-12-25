[Русский вариант](README.Ru.md)

# Table of Contents
- [How-to-reproduce](#how-to-reproduce)
- [How it works](#how-it-works)
  - [Line Drawer](#linedrawer)
  - [Circle Drawer](#circledrawer)
  
 
# Pixel Drawer
This is a simple pixel drawer. You can draw lines, circles using JS.

<a name="how-to-reproduce"></a>
# How to reproduce?
1. Clone or download repo
2. Execute this line in terminal: **node ./startNode.js** to start Node server
3. Put it in the browser line: **http://localhost:3000/examples/lineDrawer/index.html**

**NB!** after /examples/  you can write *lineDrawer* or *circleDrawer*. All examples are placed in [examples](examples/) folder.

<a name="how-it-works"></a>
# How it works?

<a name="linedrawer"></a>
# Line Drawer

![Example of drawn line](readme-Resources/example.gif)

Let's assume that we have *x0 = 20px, y0 = 80px, x1 = 80px and y1 = 40px* coordinates.
Consider the next image:
![How line drawer works-1](readme-Resources/how-linedrawer-works-1.png)

Let's walk down to our method and analyze some lines of it.

The first thing we need to understand whether our line is steep or not. Steep means that (x1 - x0) < (y1 - y0). In other words: width of line is less than height.
Our coordinates will not be steep, because (80 - 20) > (80 - 40);

![How line drawer works-2](readme-Resources/how-linedrawer-works-2.png)

If the line is steep we transpose our coordinates to make it NOT steep, so we can draw it horizontally(from left to right) again.


    if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
      [x0, y0] = [y0, x0];
      [x1, y1] = [y1, x1];
      steep = true;
    }

![How line drawer works-3](readme-Resources/how-linedrawer-works-3.png)

These lines of code will make or coordinates from left to right.

        if (x0 > x1) {
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }
        
> **NB!** Whe should **always** draw our line from *left to right* and width should always be bigger than height.

Imagine we want to draw this line:

![How line drawer works-4](readme-Resources/linedrawer-1.png)

Now consider this code:

        const dx = x1 - x0;
        const dy = y1 - y0;
        const derror = Math.abs(dy) * 2;
        const yadd = y1 > y0 ? 1 : -1;
        const dx2 = dx * 2;
        let error = 0;
        
![How line drawer works-4](readme-Resources/linedrawer-2.png)

If **error > dx** than we increment our Y by 1;

![How line drawer works-4](readme-Resources/linedrawer-3.png)

Different example:
![How line drawer works-5](readme-Resources/linedrawer-4.png)


<a name="circledrawer"></a>
# Circle Drawer

![Example of drawn circle](readme-Resources/circleExample.gif)
