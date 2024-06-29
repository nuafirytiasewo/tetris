import * as PIXI from 'pixi.js';
import {WIDTH_BORDER, BORDER_COLOR, WORD_SHAPE} from './constants';

//этот класс отвечает за создание стартового квадратика, откуда будут рисоваться остальные фигуры
export class Shapes {
    constructor(containerMain, startShapeX, startShapeY, startShapeWidth, startShapeHeight) {
        this.containerMain = containerMain;
        this.startShapeX = startShapeX;
        this.startShapeY = startShapeY;
        this.startShapeWidth = startShapeWidth;
        this.startShapeHeight = startShapeHeight;
    }
    create() {
        //записываем в переменную стартовый квадратик
        this.startShape = new PIXI.Graphics();

        //устанавливаем "пивот" в стартовый квадратик по координатам
        this.startShape.x = this.startShapeX;/* + this.startShapeWidth; 
        тут мы ничего не увеличиваем, потому что заденем 
        пивот стартового квадратика*/
        this.startShape.y = this.startShapeY;

        //вывод
        console.log("Ширина стартовой клетки");
        console.log("Высота стартовой клетки");
        console.log("x: " + this.startShape.x);
        console.log("y: " + this.startShape.y);
        
        //какую фигуру рисуем
        let shapeWord = 'T';
        //какой у нее поворот
        let rotateShape = 90;
        //массив фигуры
        let shapeArray = WORD_SHAPE[shapeWord].rotations[rotateShape];
        //цвет фигуры
        let shapeColor = WORD_SHAPE[shapeWord].color;

        //проходимся по фигуре, по 0 градусов поворота, чтобы проверить вывод координат для инициализации фигур
        for (let i = 0; i < shapeArray.length; i++) {
            //узнаем "локальные координаты" каждого квадратика из массива с фигурами
            const koord = shapeArray[i];
            //рисуем каждый квадратик
            this.startShape.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
            this.startShape.beginFill(shapeColor, 1);
            /*каждый квадратик фигуры прорисовываем так, что:
            x - ширина клетки, умноженная на множитель "локальных координат" фигуры
            y - высота клетки, умноженная на множитель "локальных координат" фигуры */
            this.startShape.drawRect(this.startShapeWidth * koord[0], this.startShapeHeight * koord[1], this.startShapeWidth, this.startShapeHeight);
            this.startShape.endFill();
        }

        //добавляем на поле нашу фигуру
        this.containerMain.addChild(this.startShape);
    }
}