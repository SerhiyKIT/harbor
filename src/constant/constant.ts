import { IInitialState } from '../interface/IInitialState';
import { StatusHarbor } from '../interface/enum';



export const Constant = (state: IInitialState) => {

    const { arrayBoat, arrayFence, arrayHarbor } = state;
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;


    //Harbor
    const heightHarborMax = screenHeight / (arrayHarbor.length + 0.1);
    const heightHarbor = heightHarborMax - 20;
    const harborX = 10;
    const widthHarbor = 100;


    //Fence
    const fenceX = screenWidth / 4;
    const heightFence = screenHeight / (arrayFence.length + 1);
    const widthFence = 20;


    //Boat
    const widthBoat = 100;
    const heightBoat = 50;
    const boatX = screenWidth - 100;
    const boatY = screenHeight / 2.7;

    const searchFullHarbor = () => {
        const fullHarbor = arrayHarbor.find(({ full }) => full === true);
        if (fullHarbor !== undefined && fullHarbor.conect === false) {
            return {
                harbor: fullHarbor,
                status: StatusHarbor.FULL
            };
        }
        else {
            return {
                harbor: fullHarbor,
                status: StatusHarbor.EMPTY
            };
        }
    }

    const searchEmptyHarbor = () => {
        const emptyHarbor = arrayHarbor.find(({ full }) => full === false);
        if (emptyHarbor !== undefined && emptyHarbor.conect === false) {
            return {
                harbor: emptyHarbor,
                status: StatusHarbor.EMPTY
            };
        }
        else {
            return {
                harbor: emptyHarbor,
                status: StatusHarbor.FULL
            };
        }
    }

    return {
        screenHeight,
        screenWidth,
        heightHarborMax,
        heightHarbor,
        harborX,
        widthHarbor,
        fenceX,
        heightFence,
        widthFence,
        widthBoat,
        heightBoat,
        boatX,
        boatY,
        searchFullHarbor,
        searchEmptyHarbor
    }
}
