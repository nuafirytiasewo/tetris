import * as PIXI from 'pixi.js';
import { WORD_SHAPE, BORDER_COLOR, CUBE_FILL_COLOR, WIDTH_BORDER, WIDTH_FIELD, HEIGHT_FIELD, FALLING_SPEED } from './constants';
import { Shapes } from './shapes';

//класс для создания и управления сеткой
export class Grid {
    constructor(app, containerMain, containerX, containerY, containerWidth, containerHeight) {
        this.app = app; //ссылка на приложение PIXI
        this.containerMain = containerMain; //основной контейнер для размещения сетки
        this.containerX = containerX; //начальная координата X для контейнера
        this.containerY = containerY; //начальная координата Y для контейнера
        this.containerWidth = containerWidth; //ширина контейнера
        this.containerHeight = containerHeight; //высота контейнера

        this.cubeWidth = this.containerWidth / WIDTH_FIELD; //ширина одного кубика
        this.cubeHeight = this.containerHeight / HEIGHT_FIELD; //высота одного кубика
    }

    //функция для получения случайной формы фигуры
    getRandomShapeWord() {
        const shapeKeys = Object.keys(WORD_SHAPE); //получаем массив ключей из объекта фигур
        const randomIndex = Math.floor(Math.random() * shapeKeys.length); //случайный индекс
        return shapeKeys[randomIndex]; //возвращаем случайный ключ
    }

    //функция для создания сетки
    create() {
        let cubeX = -this.containerWidth / 2; //начальная координата X для первого кубика
        let cubeY = -this.containerHeight / 2; //начальная координата Y для первого кубика

        const gridSet = []; //массив для хранения состояния сетки
        for (let i = 0; i < HEIGHT_FIELD; i++) { //цикл по высоте сетки
            cubeX = -this.containerWidth / 2; //сброс координаты X для нового ряда
            gridSet[i] = []; //инициализация нового ряда

            for (let j = 0; j < WIDTH_FIELD; j++) { //цикл по ширине сетки
                const cube = new PIXI.Graphics(); //создание нового графического объекта для кубика
                cube.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1); //установка стиля линии для границ кубика
                cube.beginFill(CUBE_FILL_COLOR); //начало заполнения кубика
                cube.drawRect(cubeX, cubeY, this.cubeWidth, this.cubeHeight); //отрисовка кубика
                cube.endFill(); //завершение заполнения кубика

                this.containerMain.addChild(cube); //добавление кубика в основной контейнер
                gridSet[i][j] = 0; //установка начального состояния ячейки в сетке
                cubeX += this.cubeWidth; //перемещение по оси X для следующего кубика
            }
            cubeY += this.cubeHeight; //перемещение по оси Y для следующего ряда
        }

        //создание экземпляра класса Shapes и инициализация его
        this.shapes = new Shapes(this.app, this.cubeWidth, this.cubeHeight, this.containerMain, this.containerX, this.containerY, this.containerWidth, this.containerHeight, gridSet, this);
        this.shapes.init(); //вызов метода инициализации у объекта shapes
    }

    //функция для перезапуска игры
    restartGame() {
        this.containerMain.removeChildren(); //удаление всех детей из основного контейнера
        this.create(); //создание новой сетки и инициализация игры заново
    }
}