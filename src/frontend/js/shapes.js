import * as PIXI from 'pixi.js';
import {WIDTH_BORDER, BORDER_COLOR, CUBE_FILL_COLOR, WORD_SHAPE} from './constants';

export class Shapes {
    constructor(rectangleMain, startShapeX, startShapeY, startShapeWidth, startShapeHeight) {
        this.rectangleMain = rectangleMain;
        this.startShapeX = startShapeX;
        this.startShapeY = startShapeY;
        this.startShapeWidth = startShapeWidth;
        this.startShapeHeight = startShapeHeight;
        
    }
    create() {
        
        //записываем в переменную квадратик
        this.startShape = new PIXI.Graphics();
        //рисуем стартовый квадратик в сетке
        this.startShape.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1);
        this.startShape.beginFill('red', 1);
        this.startShape.drawRect(this.startShapeX, this.startShapeY, this.startShapeWidth, this.startShapeHeight);
        this.startShape.endFill();
        
        
        //добавляем на поле нашу клетку
        this.rectangleMain.addChild(this.startShape);
        
    }
}