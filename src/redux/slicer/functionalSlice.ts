import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Boat } from '../../interface/enum';
import { IHarbor } from '../../interface/IHarbor';
import { IInitialState } from '../../interface/IInitialState';
import { IFence } from '../../interface/IFence';
import { IBoat } from '../../interface/IBoat';


const functionalSlice = createSlice({
  name: 'functionalSlice',
  initialState: <IInitialState>{
    arrayHarbor: [
      { id: 0, full: true, conect: false },
      { id: 1, full: false, conect: false },
      { id: 2, full: true, conect: false },
      { id: 3, full: false, conect: false }
    ],
    arrayFence: [
      { id: 0, turn: [] },
      { id: 1, turn: [] }
    ],
    arrayBoat: [
      { id: 0, type: Boat.GREAN, full: false },
      { id: 1, type: Boat.READ, full: true }
    ]
  },
  reducers: {
    setHarbor: (state: IInitialState, { payload }: PayloadAction<IHarbor>) => {
      console.log(payload);
      return { ...state, arrayHarbor: [...state.arrayHarbor, payload] };
    },
    setFance: (state: IInitialState, { payload }: PayloadAction<IFence>) => {
      console.log(payload);
      return { ...state, arrayFence: [...state.arrayFence, payload] };
    },
    setBoat: (state: IInitialState, { payload }: PayloadAction<IBoat>) => {
      console.log(payload);
      return { ...state, arrayBoat: [...state.arrayBoat, payload] };
    },
    setNewBoat: (state: IInitialState, { payload }: PayloadAction<Boat>) => {
      let nextId = state.arrayBoat.length;
      let full = payload === Boat.READ ? true : false;
      return { ...state, arrayBoat: [...state.arrayBoat, { id: nextId, type: payload, full: full }] };
    },
  }
});

export const { setHarbor, setFance, setBoat, setNewBoat } = functionalSlice.actions;

export default functionalSlice.reducer;