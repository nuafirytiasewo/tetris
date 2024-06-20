import * as PIXI from 'pixi.js';

export class Main {
    constructor(app) {
        this.app = app;
     
        this.rectangleMain = new PIXI.Graphics();

        // Перемещение контейнера в центр экрана и установка координат x и y контейнера в середину экрана приложения.
        this.rectangleMain.x = app.screen.width / 2;
        this.rectangleMain.y = app.screen.height / 2;

        this.rectangleMain.lineStyle(4, 0xfeeb77, 1);
        this.rectangleMain.beginFill(0xffffff);

        let rectangleWidth, rectangleHeight, rectangleX, rectangleY;

        //если чел запускает на компе (ширина больше, чем высота)
        if (app.screen.width >= app.screen.height) {
            rectangleWidth = app.screen.width * 0.2; // ширина прямоугольника (20% от ширины экрана)
            rectangleHeight = app.screen.height * 0.6; // высота прямоугольника (60% от высоты экрана)
            
        } 
        //иначе на мобилке
        else {
            rectangleWidth = app.screen.width * 0.7; // ширина прямоугольника (70% от ширины экрана)
            rectangleHeight = app.screen.height * 0.6; // высота прямоугольника (60% от высоты экрана)
        }
        
        rectangleX = -rectangleWidth / 2; // центрирование по горизонтали относительно центра контейнера
        rectangleY = -rectangleHeight / 2; // центрирование по вертикали относительно центра контейнера
        this.rectangleMain.drawRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
        this.rectangleMain.endFill();

        app.stage.addChild(this.rectangleMain);
    }

    start() {
    }
}
