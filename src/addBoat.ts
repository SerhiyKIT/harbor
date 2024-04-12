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
    searchFullHarbor: () => number | null,
    searchEmptyHarbor: () => number | null,
    readTurn: IBoat[],
    greenTurn: IBoat[],
    moveId: number | undefined,
    deleteReadTurn: (id: number) => void,
    deleteGreenTurn: (id: number) => void,
    updateTurnOut: (boatType: Boat, status: boolean) => void,
    readTurnOut: () => boolean,
    greenTurnOut: () => boolean,
    returnTurnUpdate: () => boolean,
    setTurnUpdate: (status: boolean) => void
) => {
    const { id, type, full } = newBoatState;
    const {
        green,
        read,
        blue,
        heightBoat,
        boatX,
        widthBoat,
        screenHeight,
        screenWidth,
        heightHarborMax,
        widthFence,
        fenceX,
    } = Constant(state);

    const color = type === Boat.GREAN ? green : read;
    const boatY = type === Boat.GREAN ? screenHeight / 2.7 : screenHeight / 1.7;
    const boatColorFull = full ? color : blue;

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

    const firstHarborId = type === Boat.GREAN ? searchFullHarbor() : searchEmptyHarbor();
    console.log(firstHarborId);


    const moveToHarborY = (harborId: number) => {
        return heightHarborMax * harborId + heightHarborMax / 2 - boatY - heightHarborMax / 4
    };

    const returnFromTurn = (moveId: number, harborId: number) => {
        if (moveId === id) {
            start(harborId, 1000);
        }
    }

    const start = (harborId: number | null, time: number) => {
        new Tween(boat)
            .to({ x: moveToTurnX, y: 0 }, time)
            .easing(Easing.Quadratic.InOut)
            .onComplete(() => {
                findHarbor(harborId);
            })
            .start();
    }
    start(firstHarborId, 4000);

    const findHarbor = (harborId: number | null) => {
        new Tween(boat)
            .onComplete(() => {
                if (type === Boat.GREAN) {
                    switch (searchFullHarbor()) {
                        case null:
                            moveToTurn();
                            break;

                        default:
                            if (searchFullHarbor() !== null) {
                                moveToFence(harborId!);
                            }
                            break;
                    }
                }
                if (type === Boat.READ) {
                    switch (searchEmptyHarbor()) {
                        case null:
                            moveToTurn();
                            break;

                        default:
                            if (searchEmptyHarbor() !== null) {
                                moveToFence(harborId!);
                            }
                            break;
                    }
                }
            })
            .start();
    }

    const moveToFence = (harborId: number) => {
        new Tween(boat)
            .to({ x: moveToFenceX }, 1000)
            .onComplete(() => {
                moveToHarbor(harborId);
            })
            .start();
    }

    const moveToHarbor = (harborId: number) => {
        new Tween(boat)
            .to({ y: moveToHarborY(harborId), x: moveToHarborX }, 1000)
            .onComplete(() => {
                updateHarbor(type, harborId);
                updateConectHarbor(harborId, true);
                if (type === Boat.GREAN) {
                    boat.fill(green)
                    boat.stroke({ width: 5, color: color, alignment: 1 })
                    updateTurnOut(Boat.GREAN, false);
                } else {
                    boat.fill(blue)
                    boat.stroke({ width: 5, color: color, alignment: 1 })
                    updateTurnOut(Boat.READ, false);
                }
                setTimeout(() => {
                    moveToFenceBackX(harborId);
                }, 5000);
            })
            .start();
    }

    const moveToFenceBackX = (harborId: number) => {
        new Tween(boat)
            .to({ x: moveToFenceX }, 1000)
            .onComplete(() => {
                moveToFenceBackY();
                updateConectHarbor(harborId!, false);
                if (moveId !== undefined) {
                    returnFromTurn(moveId, harborId);
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

    //Fix this
    app.ticker.add(() => {
        if (type === Boat.GREAN && greenTurn.length > 0) {
            if (greenTurn[0].id === id && searchFullHarbor() !== null && greenTurnOut() === false) {
                start(searchFullHarbor()!, 1000);
                deleteGreenTurn(id);
                updateTurnOut(Boat.GREAN, true);
                setTurnUpdate(true);
            } else if (greenTurn.find(({ id }) => id === id) && returnTurnUpdate()) {
                setTurnUpdate(false);
            }
        }
        if (type === Boat.READ && readTurn.length > 0) {
            if (readTurn[0].id === id && searchEmptyHarbor() !== null && readTurnOut() === false) {
                start(searchEmptyHarbor()!, 1000);
                deleteReadTurn(id);
                updateTurnOut(Boat.READ, true);
                setTurnUpdate(true);
            } else if (readTurn.find(({ id }) => id === id) && returnTurnUpdate()) {
                setTurnUpdate(false);
            }
        }
    })
}