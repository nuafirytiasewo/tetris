import * as PIXI from 'pixi.js';
import {WIDTH_BORDER, BORDER_COLOR, WORD_SHAPE, ROTATE_SHAPE} from './constants';

//этот класс отвечает за создание стартового квадратика, откуда будут рисоваться остальные фигуры
export class Shapes {
    constructor(containerMain, startShapeX, startShapeY, startShapeWidth, startShapeHeight, defaultRotateShape) {
        this.containerMain = containerMain;
        this.startShapeX = startShapeX; // начальная координата x фигуры
        this.startShapeY = startShapeY; // начальная координата y фигуры
        this.startShapeWidth = startShapeWidth; // ширина клетки фигуры
        this.startShapeHeight = startShapeHeight; // высота клетки фигуры
        this.defaultRotateShape = defaultRotateShape; //какой у нее поворот (по умолчанию)
    }

    //функция для случайного выбора буквы
    getRandomShapeWord() {
        const shapeKeys = Object.keys(WORD_SHAPE); //получаем все возможные ключи (буквы)
        const randomIndex = Math.floor(Math.random() * shapeKeys.length); //выбираем случайный индекс
        return shapeKeys[randomIndex]; //возвращаем случайную букву
    }

    //создание фигуры
    create(currentX, currentY) {
        //если уже существует фигура
        if (this.startShape) {
            // то удаляем предыдущую фигуру перед созданием новой
            this.containerMain.removeChild(this.startShape);
            //записываем в переменную стартовый квадратик
            this.startShape = new PIXI.Graphics();

            //загружаем координаты "перерисованной" фигуры
            this.startShape.x = currentX;
            this.startShape.y = currentY;
        }
        //если первый раз фигуру создаем, то
        else {
            //записываем в переменную стартовый квадратик
            this.startShape = new PIXI.Graphics();

            //устанавливаем "пивот" в стартовый квадратик по координатам
            this.startShape.x = this.startShapeX;/* + this.startShapeWidth; 
            тут мы ничего не увеличиваем, потому что заденем 
            пивот стартового квадратика*/
            this.startShape.y = this.startShapeY;
        }

        //вывод
        console.log("Ширина стартовой клетки");
        console.log("Высота стартовой клетки");
        console.log("x: " + this.startShape.x);
        console.log("y: " + this.startShape.y);
        
        //какую фигуру рисуем
        let shapeWord = this.getRandomShapeWord(); //используем случайную букву

        //массив фигуры
        let shapeArray = WORD_SHAPE[shapeWord].rotations[this.defaultRotateShape];
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

    //функция для того чтобы фигура падала
    fallShape() {
        //перемещаем пивот вниз на высоту ровно одного кубика
        this.startShape.y += this.startShapeHeight;
        //возвращаем координату пивота фигуры по y
        return this.startShape.y;
    }

    //функция для перемещения фигуры влево
    moveLeftShape() {
        //перемещаем пивот влево на ширину ровно одного кубика
        this.startShape.x -= this.startShapeWidth;
        //возвращаем координату пивота фигуры по x
        return this.startShape.x;
    }

    //функция для перемещения фигуры вправо
    moveRightShape() {
        //перемещаем пивот вправо на ширину ровно одного кубика
        this.startShape.x += this.startShapeWidth;
        //возвращаем координату пивота фигуры по x
        return this.startShape.x;
    }

    //функция для вращения фигуры на 90 градусов
    rotateShape() {
        //прибавляем 90 градусов
        this.defaultRotateShape += ROTATE_SHAPE;
        //если фигура больше, чем на 270 градусов, то
        if (this.defaultRotateShape > 270) {
            //обнуляем поворот
            this.defaultRotateShape = 0;
        }
        //сохраняем текущее положение фигуры перед ее перерисовкой
        let currentX = this.startShape.x; //записываем текующую координату по x
        let currentY = this.startShape.y; //записываем текующую координату по y

        //перерисовываем фигуру после поворота
        this.create(currentX, currentY); 
        //возвращаем поворот фигуры
        return this.defaultRotateShape;
    }
}