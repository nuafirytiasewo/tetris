import * as PIXI from 'pixi.js';
import {BORDER_COLOR, CUBE_FILL_COLOR, WIDTH_BORDER} from './constants';

export class Grid {
    constructor(rectangleMain, rectangleWidth, rectangleHeight) {
        this.rectangleMain = rectangleMain;
        this.rectangleWidth = rectangleWidth;
        this.rectangleHeight = rectangleHeight;

        //определяем размер каждого квадратика
        this.cubeWidth = this.rectangleWidth / 10; //делим на 10, потому что в ширину их должно быть 10
        //делим на 20, потому что в высоту их должно быть 20, 
        this.cubeHeight = this.rectangleHeight / 20; //а также потому что высота в 2 раза больше ширины у прямоугольника
        
        //записываем в переменную квадратик
        this.cube = new PIXI.Graphics();
        
    }
    create() {
        //рисуем квадратик в сетке
        this.cube.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);

        // Устанавливаем pivot в центр квадратика
        this.cube.pivot.set(this.cubeWidth / 2, this.cubeHeight / 2);

        this.cube.x = - this.rectangleMain.width / 2;
        this.cube.y = - this.rectangleMain.height / 2;
        
        this.cube.beginFill(CUBE_FILL_COLOR, 1);
        this.cube.drawRect(this.cube.x, this.cube.y, this.cubeWidth, this.cubeHeight);
        this.cube.endFill();
        
        
        console.log(this.cubeWidth, this.cubeHeight, this.cube.x, this.cube.y);
        this.rectangleMain.addChild(this.cube);

        // // цикл для рисования секторов
        // for (let i = 0; i < this.amountSegments; i++) {
        //     //рисуем сектор
        //     const sector = new Sector(this.borderWheel, this.radiuscube, this.angleStep, i);
        //     sector.create();
        //     //добавляем сектор на основу для колеса
        //     this.cube.addChild(sector.sector);
        // }
    }
}