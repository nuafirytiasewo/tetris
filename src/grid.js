import * as PIXI from 'pixi.js';
import {BORDER_COLOR, CUBE_FILL_COLOR, WIDTH_BORDER, WIDTH_FIELD, HEIGHT_FIELD} from './constants';

export class Grid {
    constructor(rectangleMain, rectangleWidth, rectangleHeight) {
        this.rectangleMain = rectangleMain;
        this.rectangleWidth = rectangleWidth;
        this.rectangleHeight = rectangleHeight;

        //определяем размер каждой клетки
        this.cubeWidth = this.rectangleWidth / WIDTH_FIELD; //делим на 10, потому что в ширину их должно быть 10
        //делим на 20, потому что в высоту их должно быть 20, 
        this.cubeHeight = this.rectangleHeight / HEIGHT_FIELD; //а также потому что высота в 2 раза больше ширины у прямоугольника
    }
    create() {
        // устанавливаем начальные координаты клетки в левый верхний угол rectangleMain
        let cubeX = -this.rectangleWidth / 2;
        let cubeY = -this.rectangleHeight / 2;
        // цикл для рисования клеток по высоте
        for (let i = 0; i < HEIGHT_FIELD; i++) {
            //возвращаемся в начало по x
            cubeX = -this.rectangleWidth / 2;
            //цикл по ширине
            for (let j = 0; j < WIDTH_FIELD; j++) {
                //записываем в переменную квадратик
                this.cube = new PIXI.Graphics();
                //рисуем квадратик в сетке
                this.cube.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
                this.cube.beginFill(CUBE_FILL_COLOR, 1);
                this.cube.drawRect(0, 0, this.cubeWidth, this.cubeHeight);
                this.cube.endFill();
                
                //устанавливаем координаты каждой клетки
                this.cube.x = cubeX;
                this.cube.y = cubeY;
                //сначала проходимся по ширине
                cubeX += this.cubeWidth;

                console.log("Клетка:" + i + " " + j);
                console.log("Ширина клетки" + this.cubeWidth);
                console.log("Высота клетки" + this.cubeHeight);
                console.log("x: " + this.cube.x);
                console.log("y: " + this.cube.y);

                //добавляем на поле нашу клетку
                this.rectangleMain.addChild(this.cube);
            }
            //проходимся по высоте
            cubeY += this.cubeHeight;
        }
    }
}