import * as PIXI from 'pixi.js';
import {WIDTH_BORDER, BORDER_COLOR, WORD_SHAPE} from './constants';

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
        this.startShape.x = this.startShapeX;/* + this.startShapeWidth; 
        тут мы ничего не увеличиваем, потому что заденем 
        пивот стартового квадратика*/
        this.startShape.y = this.startShapeY;

        //вывод
        console.log("Ширина стартовой клетки");
        console.log("Высота стартовой клетки");
        console.log("x: " + this.startShape.x);
        console.log("y: " + this.startShape.y);

        /* (2) а значит мы можем нарисовать это все дело через координаты созданного массива с фигурами
        относительно локальных координат стартового квадратика  */
        //какую фигуру рисуем
        let shape = 'J' 
        //проходимся по фигуре, по 0 градусов поворота, чтобы проверить вывод координат для инициализации фигур
        for (let index = 0; index < WORD_SHAPE[shape].rotations[0].length; index++) {
            //выводим координаты
            const koord = WORD_SHAPE[shape].rotations[0][index];
            console.log(koord);
        }
        console.log(); 

        /*(1) замечаем, что для того, чтобы нарисовать несколько кубиков, нужно просто в drawRect
        параметр с x умножать this.startShapeWidth для кубика  */

        //рисуем стартовый квадратик
        this.startShape.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
        this.startShape.beginFill(WORD_SHAPE[shape].color, 1);
        //рисуем прямо у "пивота", прямо на выбранном квадратике
        //берем за высоту и ширину - параметры квадратиков сетки
        this.startShape.drawRect(0, 0, this.startShapeWidth, this.startShapeHeight);
        this.startShape.endFill();

        //рисуем второй квадратик
        this.startShape.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
        this.startShape.beginFill(WORD_SHAPE[shape].color, 1);
        //рисуем прямо у "пивота", прямо на выбранном квадратике
        //берем за высоту и ширину - параметры квадратиков сетки
        this.startShape.drawRect(0 + this.startShapeWidth, 0, this.startShapeWidth, this.startShapeHeight);
        this.startShape.endFill();

        //рисуем третий квадратик
        this.startShape.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
        this.startShape.beginFill(WORD_SHAPE[shape].color, 1);
        //рисуем прямо у "пивота", прямо на выбранном квадратике
        //берем за высоту и ширину - параметры квадратиков сетки
        this.startShape.drawRect(0 + this.startShapeWidth * -2 /*тут мы должны умножать ширину на множитель из координат массива с фигурами */, 0, this.startShapeWidth, this.startShapeHeight);
        this.startShape.endFill();
        
        

        //добавляем на поле нашу клетку
        this.rectangleMain.addChild(this.startShape);
    }
}