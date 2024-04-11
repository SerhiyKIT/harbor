import { IHarbor } from "./IHarbor";
import { IBoat } from "./IBoat";
import { IFence } from "./IFence";

export interface IInitialState {
    arrayHarbor: IHarbor[];
    arrayBoat: IBoat[];
    arrayFence: IFence[];
}