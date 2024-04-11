import { Application, Graphics, Renderer } from "pixi.js";
import { IInitialState } from './interface/IInitialState';
import { Constant } from './constant/constant';

export const AddFence = (app: Application<Renderer>, state: IInitialState) => {
    const { heightFence, fenceX, widthFence } = Constant(state);
    const drawFence = (app: Application<Renderer>) => {
        const fenceY = heightFence * 2;

        const fence = new Graphics();
        fence.rect(fenceX, 0, widthFence, heightFence)
        fence.fill(0xffff00)


        fence.rect(fenceX, fenceY, widthFence, heightFence)
        fence.fill(0xffff00)

        app.stage.addChild(fence);
    };

    drawFence(app);

};