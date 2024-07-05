import * as PIXI from 'pixi.js';
import {BORDER_COLOR, CUBE_FILL_COLOR, WIDTH_BORDER, WIDTH_FIELD, HEIGHT_FIELD} from './constants';
import { Shapes } from './shapes';

//этот класс отвечает за создание сетки, которая будет заполнена клетками
export class Grid {
    constructor(app, containerMain, containerWidth, containerHeight) {
        this.app = app;
        //передаем контейнер
        this.containerMain = containerMain;
        //передаем ширину контейнера
        this.containerWidth = containerWidth;
        //передаем высоту контейнера
        this.containerHeight = containerHeight;

        //определяем размер каждой клетки
        this.cubeWidth = this.containerWidth / WIDTH_FIELD; //делим на 10, потому что в ширину их должно быть 10
        //делим на 20, потому что в высоту их должно быть 20, 
        this.cubeHeight = this.containerHeight / HEIGHT_FIELD; //а также потому что высота в 2 раза больше ширины у прямоугольника
    }
    create() {
        // устанавливаем начальные координаты (первой) клетки в левый верхний угол containerMain
        let cubeX = -this.containerWidth / 2;
        let cubeY = -this.containerHeight / 2;

        // создаем массив (сетку i x j размерности) в который будем запихивать каждую клетку
        const gridSet = [];
        // цикл для рисования клеток по высоте
        for (let i = 0; i < HEIGHT_FIELD; i++) {
            //возвращаемся в начало по x (то есть каждая строка будет заново заполняться с этого значения)
            cubeX = -this.containerWidth / 2;
            
            gridSet[i] = []; // создаем подмассив (проходимся по i - первому значению, берем из строк - итератора)

            //цикл по ширине
            for (let j = 0; j < WIDTH_FIELD; j++) {
                //записываем в переменную клетку
                this.cube = new PIXI.Graphics();
                //рисуем клетку в сетке
                this.cube.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
                this.cube.beginFill(CUBE_FILL_COLOR, 1);
                this.cube.drawRect(0, 0, this.cubeWidth, this.cubeHeight);
                this.cube.endFill();
                
                //устанавливаем относительные координаты каждой клетки
                //ставим пивот в левый верхний угол каждой клетки
                this.cube.x = cubeX;
                this.cube.y = cubeY;
                //сначала проходимся по ширине
                cubeX += this.cubeWidth;

                //вывод
                console.log("Клетка:" + i + " " + j);
                console.log("Ширина клетки" + this.cubeWidth);
                console.log("Высота клетки" + this.cubeHeight);
                console.log("x: " + this.cube.x);
                console.log("y: " + this.cube.y);

                //запихиваем в этот массив все клетки по ширине (заполняем второе число - j)
                gridSet[i].push(this.cube);

                console.log("Обьект: " + this.cube.fill.color);
                //добавляем на поле нашу клетку
                this.containerMain.addChild(this.cube);
            }
            //проходимся по высоте
            cubeY += this.cubeHeight;
        }
        //задаем стартовую клетку, откуда будут рисоваться остальные фигуры
        // this.cubeWidth, this.cubeHeight - чтобы сохранять размер клетки
        this.startCube = gridSet[2][5];
        
        //инициализируем фигуру
        this.startShape = new Shapes(this.containerMain, this.startCube.x, this.startCube.y, this.cubeWidth, this.cubeHeight);
        //рисуем фигуру
        this.startShape.create();
        
        //иницаиализируем переменную, которая будет считать сколько времени прошло (будет хранить в себе миллисекунды)
        let timer = 0;
        let frequency = 700; //через сколько миллисекунд обновлять местоположение фигуры
        //тикер для падения фигуры
        this.app.ticker.add((delta) => {
            /* В PixiJS delta представляет собой количество кадров, 
            прошедших с момента последнего вызова функции ticker. 
            Если игра или анимация работает на 60 FPS, то значение 
            delta будет около 1 для каждого кадра. 
            Если FPS ниже (например, 30 FPS), значение delta будет около 2, так как 
            прошло больше времени с последнего кадра.*/
            timer += (delta / this.app.ticker.FPS) * 1000; //прибавляем к таймеру значение сколько прошло с прошлого кадра * фпс
            // если уже накопилось достаточно времени и оно больше или равно чем частота обновения фигуры, то
            if (timer >= frequency) {
                //обнуляем таймер
                timer = 0;
                //фигура "падает"
                this.startShape.fallShape();
            }
        });

        //обрабочик событий для перемещения фигуры по горизонтали
        document.addEventListener(
          "keydown", // тип события - нажатие клавиши
          (event) => { // функция-обработчик событий
            const keyName = event.key; // получение названия нажатой клавиши
            //при нажатии на стрелку влево, фигура перемещается влево
            if (keyName === "ArrowLeft") {
              this.startShape.moveLeftShape();
            }

            //при нажатии на стрелку вправо, фигура перемещается влево
            if (keyName === "ArrowRight") {
              this.startShape.moveRightShape();
            }

            //при нажатии на стрелку вверх, фигура поворачивается на 90
            if (keyName === "ArrowUp") {
              this.startShape.rotateShape();
            }

            //при нажатии на стрелку вниз, фигура падает вниз быстрее
            if (keyName === "ArrowDown") {
              //фигура "падает"
              this.startShape.fallShape();
            }
          });

        //вывод параметров выбранной клетки, на котором будет рисоваться стартовый квадратик
        console.log(this.startCube.x, this.startCube.y);
    }
}

