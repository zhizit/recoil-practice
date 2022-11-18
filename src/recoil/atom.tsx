import { atom } from "recoil";

export const arrangementPriceState = atom({
  key: "ArrangementPrice",
  default: 13200,
});

export const personsState = atom({
  key: "Persons",
  default: [
    { id: 1000, name: "ペンギン", isMainGuest: false },
    { id: 1001, name: "トナカイ", isMainGuest: false },
    { id: 1002, name: "ベルーガ", isMainGuest: false },
    { id: 1003, name: "シロクマ", isMainGuest: true },
  ],
});
