import { update } from '@tweenjs/tween.js';
import { Application, Graphics } from 'pixi.js';
import { Boat } from './interface/enum';
import { AddFence } from './addFence';
import { AddBoat } from './addBoat';
import { IBoat } from './interface/IBoat';
import { IFence } from './interface/IFence';
import { IHarbor } from './interface/IHarbor';
import { Constant } from './constant/constant';

(async () => {
    let arrayBoat: IBoat[] = [];

    let arrayFence: IFence[] = [
        { id: 0, turn: [] },
        { id: 1, turn: [] }
    ];

    let arrayHarbor: IHarbor[] = [
        { id: 0, full: false, conect: false },
        { id: 1, full: false, conect: false },
        { id: 2, full: false, conect: false },
        { id: 3, full: false, conect: false }
    ];

    const state = {
        arrayBoat,
        arrayFence,
        arrayHarbor
    }

    const readTurn: IBoat[] = [];
    const greenTurn: IBoat[] = [];

    const deleteReadTurn = (id: number) => {
        const index = readTurn.findIndex((boat) => boat.id === id);
        readTurn.splice(index, 1);
    }

    const deleteGreenTurn = (id: number) => {
        const index = greenTurn.findIndex((boat) => boat.id === id);
        greenTurn.splice(index, 1);
    }

    const { heightHarbor, harborX, widthHarbor, heightHarborMax } = Constant(state);

    console.log(state);

    const app = new Application();

    await app.init({ background: '#4245f5', resizeTo: window });
    app.canvas.style.position = 'absolute';

    document.body.appendChild(app.canvas);

    AddFence(app, state);

    const harborY = (id: number) => {
        return 5 + (id * heightHarborMax)
    }

    let harbor1Full = false;
    let harbor2Full = false;
    let harbor3Full = false;
    let harbor4Full = false;

    let harbor1Conect = false;
    let harbor2Conect = false;
    let harbor3Conect = false;
    let harbor4Conect = false;

    const harbor1 = new Graphics();
    const harbor2 = new Graphics();
    const harbor3 = new Graphics();
    const harbor4 = new Graphics();

    harbor1.rect(harborX, harborY(0), widthHarbor, heightHarbor)
    harbor1.fill(0x4245f5)
    harbor1.stroke({ width: 5, color: 0xffff00, alignment: 1 })

    harbor2.rect(harborX, harborY(1), widthHarbor, heightHarbor)
    harbor2.fill(0x4245f5)
    harbor2.stroke({ width: 5, color: 0xffff00, alignment: 1 })

    harbor3.rect(harborX, harborY(2), widthHarbor, heightHarbor)
    harbor3.fill(0x4245f5)
    harbor3.stroke({ width: 5, color: 0xffff00, alignment: 1 })

    harbor4.rect(harborX, harborY(3), widthHarbor, heightHarbor)
    harbor4.fill(0x4245f5)
    harbor4.stroke({ width: 5, color: 0xffff00, alignment: 1 })

    app.stage.addChild(harbor1);
    app.stage.addChild(harbor2);
    app.stage.addChild(harbor3);
    app.stage.addChild(harbor4);

    const searchEmptyHarbor = () => {
        if (harbor1Full === false && harbor1Conect === false) {
            return 0;
        }
        else if (harbor2Full === false && harbor2Conect === false) {
            return 1;
        }
        else if (harbor3Full === false && harbor3Conect === false) {
            return 2;
        }
        else if (harbor4Full === false && harbor4Conect === false) {
            return 3;
        }
        else {
            return -1;
        }
    }

    const searchFullHarbor = () => {
        if (harbor1Full === true && harbor1Conect === false) {
            return 0;
        }
        else if (harbor2Full === true && harbor2Conect === false) {
            return 1;
        }
        else if (harbor3Full === true && harbor3Conect === false) {
            return 2;
        }
        else if (harbor4Full === true && harbor4Conect === false) {
            return 3;
        }
        else {
            return -1;
        }
    }

    const updateConectHarbor = (harborId: number, status: boolean) => {
        switch (harborId) {
            case 0:
                harbor1Conect = status;
                break;
            case 1:
                harbor2Conect = status;
                break;
            case 2:
                harbor3Conect = status;
                break;
            case 3:
                harbor4Conect = status;
                break;
        }
    }



    const updateHarbor1 = (color: number, status: boolean) => {
        harbor1.clear();
        harbor1.rect(harborX, harborY(0), widthHarbor, heightHarbor)
        harbor1.fill(color)
        harbor1.stroke({ width: 5, color: 0xffff00, alignment: 1 })
        harbor1Full = status;
        updateConectHarbor(0, true);
        app.stage.addChild(harbor1)
    }

    const updateHarbor2 = (color: number, status: boolean) => {
        harbor2.clear();
        harbor2.rect(harborX, harborY(1), widthHarbor, heightHarbor)
        harbor2.fill(color)
        harbor2.stroke({ width: 5, color: 0xffff00, alignment: 1 })
        harbor2Full = status;
        updateConectHarbor(1, true);
        app.stage.addChild(harbor2)
    }

    const updateHarbor3 = (color: number, status: boolean) => {
        harbor3.clear();
        harbor3.rect(harborX, harborY(2), widthHarbor, heightHarbor)
        harbor3.fill(color)
        harbor3.stroke({ width: 5, color: 0xffff00, alignment: 1 })
        harbor3Full = status;
        updateConectHarbor(2, true);
        app.stage.addChild(harbor3)
    }

    const updateHarbor4 = (color: number, status: boolean) => {
        harbor4.clear();
        harbor4.rect(harborX, harborY(3), widthHarbor, heightHarbor)
        harbor4.fill(color)
        harbor4.stroke({ width: 5, color: 0xffff00, alignment: 1 })
        harbor4Full = status;
        updateConectHarbor(3, true);
        app.stage.addChild(harbor4)
    }

    const updateHarbor = (boatType: Boat, harborId: number) => {
        if (boatType === Boat.READ) {
            switch (harborId) {
                case 0:
                    updateHarbor1(0xffff00, true);
                    break;
                case 1:
                    updateHarbor2(0xffff00, true);
                    break;
                case 2:
                    updateHarbor3(0xffff00, true);
                    break;
                case 3:
                    updateHarbor4(0xffff00, true);
                    break;
            }
        }
        else {
            switch (harborId) {
                case 0:
                    updateHarbor1(0x4245f5, false);
                    break;
                case 1:
                    updateHarbor2(0x4245f5, false);
                    break;
                case 2:
                    updateHarbor3(0x4245f5, false);
                    break;
                case 3:
                    updateHarbor4(0x4245f5, false);
                    break;
            }

        }
    }

    const moveId = () => {
        if (searchEmptyHarbor() !== -1) {
            if (readTurn.length > 0) {
                return readTurn[0].id;
            }
        } else {
            if (greenTurn.length > 0) {
                return greenTurn[0].id;
            }
        }
    }

    const creatBoat = setInterval(() => {
        const randomBoatType = Math.random() < 0.5 ? Boat.READ : Boat.GREAN;
        const randomFull = randomBoatType === Boat.READ ? true : false;
        const boat = { id: arrayBoat.length, type: randomBoatType, full: randomFull }

        arrayBoat.push(boat);
        console.log(arrayBoat);
        AddBoat(
            app,
            state,
            boat,
            updateHarbor,
            updateConectHarbor,
            searchFullHarbor(),
            searchEmptyHarbor(),
            readTurn,
            greenTurn,
            moveId(),
            deleteReadTurn,
            deleteGreenTurn
        );
    }, 8000);

    app.ticker.add(() => {

        update();
    });

})();