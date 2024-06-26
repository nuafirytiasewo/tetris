import * as PIXI from 'pixi.js';
import {WIDTH_BORDER, BORDER_COLOR, CUBE_FILL_COLOR, WORD_SHAPE} from './constants';

//этот класс отвечает за создание стартового квадратика, откуда будут рисоваться остальные фигуры
export class Shapes {
    constructor(rectangleMain, startShapeX, startShapeY, startShapeWidth, startShapeHeight) {
        this.rectangleMain = rectangleMain;
        this.startShapeX = startShapeX;
        this.startShapeY = startShapeY;
        this.startShapeWidth = startShapeWidth;
        this.startShapeHeight = startShapeHeight;
    }
    create() {
        //записываем в переменную стартовый квадратик
        this.startShape = new PIXI.Graphics();

        //устанавливаем "пивот" в выбранную клетку по координатам
        this.startShape.x = this.startShapeX;
        this.startShape.y = this.startShapeY;

        //вывод
        console.log("Ширина стартовой клетки" + this.startShapeWidth);
        console.log("Высота стартовой клетки" + this.startShapeHeight);
        console.log("x: " + this.startShape.x);
        console.log("y: " + this.startShape.y);

        //рисуем стартовый квадратик
        this.startShape.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
        this.startShape.beginFill('red', 1);
        //рисуем прямо у "пивота", прямо на выбранном квадратике
        //берем за высоту и ширину - параметры квадратиков сетки
        this.startShape.drawRect(0, 0, this.startShapeWidth, this.startShapeHeight);
        this.startShape.endFill();
        
        //добавляем на поле нашу клетку
        this.rectangleMain.addChild(this.startShape);
    }
}