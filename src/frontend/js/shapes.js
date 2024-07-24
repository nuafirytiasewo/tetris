import * as PIXI from 'pixi.js';
import { WORD_SHAPE, WIDTH_FIELD, HEIGHT_FIELD, ROTATE_SHAPE, FALLING_SPEED, BORDER_COLOR, WIDTH_BORDER} from './constants';

//класс для управления фигурами в игре
export class Shapes {
    constructor(app, cubeWidth, cubeHeight, containerMain, containerX, containerY, containerWidth, containerHeight, gridSet) {
        this.app = app; //ссылка на приложение PIXI
        this.cubeWidth = cubeWidth; //ширина одного кубика
        this.cubeHeight = cubeHeight; //высота одного кубика
        this.containerMain = containerMain; //основной контейнер для размещения фигур
        this.containerX = containerX; //начальная координата X для контейнера
        this.containerY = containerY; //начальная координата Y для контейнера
        this.containerWidth = containerWidth; //ширина контейнера
        this.containerHeight = containerHeight; //высота контейнера
        this.gridSet = gridSet; //сетка для хранения состояния ячеек

        this.currentShape = null; //текущая фигура
        this.fallInterval = null; //интервал для падения фигуры
        this.shapeGraphics = []; //массив для хранения графических объектов фигуры
    }

    //функция для инициализации фигуры и управления ее падением
    init() {
        this.createShape(); //создание новой фигуры
        this.fallShape(); //запуск падения фигуры

        //обработка нажатий клавиш для управления фигурой
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.moveShape('left'); //движение фигуры влево
            }
            if (e.key === 'ArrowRight') {
                this.moveShape('right'); //движение фигуры вправо
            }
            if (e.key === 'ArrowDown') {
                this.moveShape('down'); //движение фигуры вниз
            }
            if (e.key === 'ArrowUp') {
                this.rotateShape(); //поворот фигуры
            }
        });

        //создание начальной сетки
        this.drawGrid();
    }

    //функция для создания новой фигуры
    createShape() {
        const shapeWord = this.getRandomShapeWord(); //получение случайной формы фигуры
        const shapeData = WORD_SHAPE[shapeWord]; //данные формы фигуры
        const shapeColor = shapeData.color; //цвет формы

        //создание объекта фигуры
        this.currentShape = {
            word: shapeWord, //название формы
            coordinates: shapeData.rotations["0"].map(coord => [coord[0] + Math.floor(WIDTH_FIELD / 2), coord[1]]), //начальные координаты
            rotation: 0, //начальный угол поворота
            color: shapeColor //цвет фигуры
        };
        this.drawShape(); //отрисовка фигуры
    }

    //функция для получения случайного названия формы фигуры
    getRandomShapeWord() {
        const shapeKeys = Object.keys(WORD_SHAPE); //получение массива всех возможных форм
        const randomIndex = Math.floor(Math.random() * shapeKeys.length); //выбор случайного индекса
        return shapeKeys[randomIndex]; //возвращение случайной формы
    }

    //функция для отрисовки текущей фигуры
    drawShape() {
        this.clearShape(); //очистка предыдущей фигуры
        if (this.currentShape) {
            this.currentShape.coordinates.forEach(coord => {
                const x = coord[0] * this.cubeWidth - this.containerWidth / 2; //координата X кубика
                const y = coord[1] * this.cubeHeight - this.containerHeight / 2; //координата Y кубика

                const cube = new PIXI.Graphics(); //создание нового графического объекта для кубика
                cube.beginFill(PIXI.utils.string2hex(this.currentShape.color)); //начало заполнения кубика цветом
                cube.drawRect(x, y, this.cubeWidth, this.cubeHeight); //отрисовка кубика
                cube.endFill(); //завершение заполнения кубика
                this.containerMain.addChild(cube); //добавление кубика в основной контейнер
                this.shapeGraphics.push(cube); //добавление кубика в массив графических объектов
            });
        }
    }

    //функция для очистки предыдущей фигуры
    clearShape() {
        this.shapeGraphics.forEach(cube => this.containerMain.removeChild(cube)); //удаление каждого кубика из контейнера
        this.shapeGraphics = []; //очистка массива графических объектов
    }

    //функция для запуска падения фигуры
    fallShape() {
        this.fallInterval = setInterval(() => {
            this.moveShape('down'); //движение фигуры вниз с заданной частотой
        }, FALLING_SPEED);
    }

    //функция для движения фигуры в указанном направлении
    moveShape(direction) {
        let xShift = 0; //смещение по X
        let yShift = 0; //смещение по Y

        if (direction === 'left') {
            xShift = -1; //смещение влево
        } else if (direction === 'right') {
            xShift = 1; //смещение вправо
        } else if (direction === 'down') {
            yShift = 1; //смещение вниз
        }

        const newCoordinates = this.currentShape.coordinates.map(coord => [coord[0] + xShift, coord[1] + yShift]); //новые координаты фигуры

        if (this.isMoveValid(newCoordinates)) { //проверка валидности нового положения
            this.currentShape.coordinates = newCoordinates; //обновление координат фигуры
            this.drawShape(); //отрисовка фигуры
        } else if (direction === 'down') { //если движение вниз невозможно
            this.fixShape(); //фиксация фигуры на сетке
            this.createShape(); //создание новой фигуры
        }
    }

    //функция для поворота фигуры
    rotateShape() {
        const nextRotation = (this.currentShape.rotation + ROTATE_SHAPE) % 360; //вычисление угла поворота
        const shapeData = WORD_SHAPE[this.currentShape.word].rotations[nextRotation]; //данные для нового поворота
        const pivot = this.currentShape.coordinates[0]; //пивот (опорная точка) фигуры
        const newCoordinates = shapeData.map(coord => [pivot[0] + coord[0], pivot[1] + coord[1]]); //новые координаты после поворота

        if (this.isMoveValid(newCoordinates)) { //проверка валидности нового положения
            this.currentShape.rotation = nextRotation; //обновление угла поворота
            this.currentShape.coordinates = newCoordinates; //обновление координат фигуры
            this.drawShape(); //отрисовка фигуры
        }
    }

    //функция для проверки валидности нового положения фигуры
    isMoveValid(newCoordinates) {
        return newCoordinates.every(coord => {
            const x = coord[0]; //координата X
            const y = coord[1]; //координата Y

            if (x < 0 || x >= WIDTH_FIELD || y >= HEIGHT_FIELD) { //проверка на выход за границы поля
                return false;
            }

            if (this.gridSet[y] && this.gridSet[y][x]) { //проверка на занятость ячейки
                return false;
            }

            return true; //если все проверки пройдены
        });
    }

    //функция для фиксации фигуры на сетке
    fixShape() {
        this.currentShape.coordinates.forEach(coord => {
            const x = coord[0]; //координата X
            const y = coord[1]; //координата Y

            if (!this.gridSet[y]) {
                this.gridSet[y] = []; //инициализация строки в сетке, если ее нет
            }

            this.gridSet[y][x] = this.currentShape.color; //установка цвета ячейки на сетке
        });

        this.clearFullRows(); //удаление полных рядов
        this.updateGrid(); //обновление сетки
    }

    //функция для удаления полных рядов и сдвига остальных вниз
    clearFullRows() {
        for (let y = 0; y < HEIGHT_FIELD; y++) { //цикл по всем рядам
            if (this.gridSet[y] && this.gridSet[y].every(cell => cell !== 0)) { //если ряд полностью заполнен
                this.gridSet.splice(y, 1); //удаление полного ряда
                this.gridSet.unshift(Array(WIDTH_FIELD).fill(0)); //добавление нового пустого ряда сверху
            }
        }
    }

    //функция для отрисовки сетки
    drawGrid() {
        for (let y = 0; y < HEIGHT_FIELD; y++) { //цикл по высоте сетки
            for (let x = 0; x < WIDTH_FIELD; x++) { //цикл по ширине сетки
                if (!this.gridSet[y]) {
                    this.gridSet[y] = []; //инициализация строки в сетке, если ее нет
                }

                const cubeX = x * this.cubeWidth - this.containerWidth / 2; //координата X кубика
                const cubeY = y * this.cubeHeight - this.containerHeight / 2; //координата Y кубика

                const cube = new PIXI.Graphics(); //создание нового графического объекта для кубика
                cube.lineStyle(WIDTH_BORDER, BORDER_COLOR, 1); //установка стиля линии для границ кубика
                cube.drawRect(cubeX, cubeY, this.cubeWidth, this.cubeHeight); //отрисовка кубика
                this.containerMain.addChild(cube); //добавление кубика в основной контейнер
            }
        }
    }

    //функция для обновления сетки
    updateGrid() {
        this.containerMain.removeChildren(); //удаление всех детей из основного контейнера

        this.drawGrid(); //перерисовка сетки

        for (let y = 0; y < HEIGHT_FIELD; y++) { //цикл по высоте сетки
            for (let x = 0; x < WIDTH_FIELD; x++) { //цикл по ширине сетки
                if (this.gridSet[y] && this.gridSet[y][x]) { //если ячейка заполнена
                    const cubeX = x * this.cubeWidth - this.containerWidth / 2; //координата X кубика
                    const cubeY = y * this.cubeHeight - this.containerHeight / 2; //координата Y кубика
                    const cube = new PIXI.Graphics(); //создание нового графического объекта для кубика
                    cube.beginFill(PIXI.utils.string2hex(this.gridSet[y][x])); //начало заполнения кубика цветом
                    cube.drawRect(cubeX, cubeY, this.cubeWidth, this.cubeHeight); //отрисовка кубика
                    cube.endFill(); //завершение заполнения кубика
                    this.containerMain.addChild(cube); //добавление кубика в основной контейнер
                }
            }
        }

        this.drawShape(); //отрисовка текущей фигуры
    }
}
