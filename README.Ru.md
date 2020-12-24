# pixelDrawer-JS

![Example of drawn line](https://github.com/AntonOnyshch/pixelDrawer-JS/raw/main/readme-Resources/example.gif)


# Как запустить?
1. Скачайте или склонируйте репозиторий. 
2. Выполните в терминале: **node ./startNode.js** для запуска Node сервера.
3. Перейдите по адресу: **http://localhost:3000/examples/lineDrawer/index.html**
После */examples/* идет имя папки. В данном случае это **lineDrawer**.

# Как это работает?
**Линии**

Давайте предположим что у нас есть следующие координаты *x0,y0,x1 and y1*.
Посмотрите на изображение:
![How line drawer works-1](https://github.com/AntonOnyshch/pixelDrawer-JS/raw/main/readme-Resources/how-linedrawer-works-1.png)

Теперь пройдемся по каждой строчке метода который рисует линию и разберем её.

    if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
      [x0, y0] = [y0, x0];
      [x1, y1] = [y1, x1];
      steep = true;
    }
Первое что нам нужно сделать это понять, крутая ли наша линия. То, что она крутая нам даст вот это равенство: (x1 - x0) < (y1 - y0). Это значит что условная ширина линии меньше чем высота.
Наша линия не будет крутой потому-что (80 - 20) > (80 - 40);

**NB!** Мы **всегда** должны рисовать линию слева на право!
