import { Application, Graphics, Renderer } from "pixi.js";
import { Boat } from "./interface/enum";
import { Easing, Tween } from "@tweenjs/tween.js";
import { IBoat } from "./interface/IBoat";
import { IInitialState } from "./interface/IInitialState";
import { Constant } from "./constant/constant";


export const AddBoat = (
    app: Application<Renderer>,
    state: IInitialState,
    newBoatState: IBoat,
    updateHarbor: (boatType: Boat, harborId: number) => void,
    updateConectHarbor: (harborId: number, status: boolean) => void,
    searchFullHarbor: number,
    searchEmptyHarbor: number,
    readTurn: IBoat[],
    greenTurn: IBoat[],
    moveId: number | undefined,
    deleteReadTurn: (id: number) => void,
    deleteGreenTurn: (id: number) => void
) => {
    const { id, type, full } = newBoatState;
    const {
        heightBoat, boatX, widthBoat, screenHeight, screenWidth,
        heightHarborMax, widthFence, fenceX,
    } = Constant(state);

    const color = type === Boat.GREAN ? 0x4de62e : 0xdb1f2b;
    const boatY = type === Boat.GREAN ? screenHeight / 2.7 : screenHeight / 1.7;
    const boatColorFull = full ? color : 0x4245f5;

    const moveToFenceX = -((fenceX * 3) + 10)
    const moveToHarborX = -(screenWidth - 220)
    const moveToReadMidleY = screenHeight / 2 - boatY + 30;
    const moveToGrenMidleY = screenHeight / 2 - boatY - 30;
    const moveToMidleY = type === Boat.GREAN ? moveToGrenMidleY : moveToReadMidleY;
    const moveToTurnX = -((fenceX * 3) - (widthBoat + widthFence + 20))
    const moveToTurnY = type === Boat.GREAN ? - 100 : + 100;
    const turnX = type === Boat.GREAN ?
        (greenTurn.length * (widthBoat + 10) + moveToTurnX) :
        (readTurn.length * (widthBoat + 10) + moveToTurnX);

    const boat = new Graphics();
    boat.rect(boatX, boatY, widthBoat, heightBoat)
    boat.fill(boatColorFull)
    boat.stroke({ width: 5, color: color, alignment: 1 })

    app.stage.addChild(boat);

    const harborId = type === Boat.GREAN ? searchFullHarbor : searchEmptyHarbor;

    const moveToHarborY = heightHarborMax * harborId + heightHarborMax / 2 - boatY - heightHarborMax / 4;

    const returnFromTurn = (moveId: number) => {
        if (moveId === id) {
            start();
        }
    }

    const start = () => {
        new Tween(boat)
            .to({ x: moveToTurnX, y: 0 }, 4000)
            .easing(Easing.Quadratic.InOut)
            .onComplete(() => {
                findHarbor();
            })
            .start();
    }

    start();

    const findHarbor = () => {
        new Tween(boat)
            .onComplete(() => {
                if (type === Boat.GREAN) {
                    switch (searchFullHarbor) {
                        case -1:
                            moveToTurn();
                            break;

                        default:
                            moveToFence();
                            break;
                    }
                }
                if (type === Boat.READ) {
                    switch (searchEmptyHarbor) {
                        case -1:
                            moveToTurn();
                            break;

                        default:
                            moveToFence();
                            break;
                    }
                }
            })
            .start();
    }

    const moveToFence = () => {
        new Tween(boat)
            .to({ x: moveToFenceX }, 1000)
            .onComplete(() => {
                moveToHarbor();
            })
            .start();
    }

    const moveToHarbor = () => {
        new Tween(boat)
            .to({ y: moveToHarborY, x: moveToHarborX }, 1000)
            .onComplete(() => {
                updateHarbor(type, harborId);
                updateConectHarbor(harborId, true);
                if (type === Boat.GREAN) {
                    boat.fill(0x4de62e)
                    boat.stroke({ width: 5, color: color, alignment: 1 })
                } else {
                    boat.fill(0x4245f5)
                    boat.stroke({ width: 5, color: color, alignment: 1 })
                }
                setTimeout(() => {
                    moveToFenceBackX();
                }, 5000);
            })
            .start();
    }

    const moveToFenceBackX = () => {
        new Tween(boat)
            .to({ x: moveToFenceX }, 1000)
            .onComplete(() => {
                moveToFenceBackY();
                updateConectHarbor(harborId, false);
                if (moveId !== undefined) {
                    returnFromTurn(moveId);
                }
            })
            .start();
    }

    const moveToFenceBackY = () => {
        new Tween(boat)
            .to({ y: moveToMidleY }, 1000)
            .onComplete(() => {
                moveToBackX();
            })
            .start();
    }

    const moveToBackX = () => {
        new Tween(boat)
            .to({ x: 100 }, 4000)
            .onComplete(() => {
            })
            .start();
    }

    const moveToTurn = () => {
        new Tween(boat)
            .to({ y: moveToTurnY, x: turnX }, 1000)
            .onComplete(() => {
                if (type === Boat.GREAN) {
                    greenTurn.push(newBoatState);
                } else {
                    readTurn.push(newBoatState);
                }
            })
            .start();
    }

    const turnMove = () => {
        new Tween(boat)
            .to({ y: moveToTurnY, x: turnX }, 1000)
            .start();
    }

    app.ticker.add(() => {
        if (type === Boat.GREAN && greenTurn.length > 0) {
            if (greenTurn[0].id === id && searchFullHarbor !== -1) {
                start();
                deleteGreenTurn(id);
                turnMove();
            }
        }
        if (type === Boat.READ && readTurn.length > 0) {
            if (readTurn[0].id === id && searchEmptyHarbor !== -1) {
                start();
                deleteReadTurn(id);
                turnMove();
            }
        }
    })
}