import { Application, Graphics, Renderer } from 'pixi.js';
import { IInitialState } from './interface/IInitialState';
import { Constant } from './constant/constant';
import { Tween } from '@tweenjs/tween.js';


export const AddHarbor = (
    app: Application<Renderer>,
    state: IInitialState,
    neadUpdate?: boolean,
    harborId?: number,
    full?: boolean
) => {
    const { heightHarbor, harborX, widthHarbor, heightHarborMax } = Constant(state);

    let harbor1Full = false;
    let harbor2Full = false;
    let harbor3Full = false;
    let harbor4Full = false;

    if (harborId && full) {
        harbor1Full = full
    }

    const harborY = (id: number) => {
        return 5 + (id * heightHarborMax)
    }

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

};