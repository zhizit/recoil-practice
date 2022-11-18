import { selector } from "recoil";
import { personsState, arrangementPriceState } from "./atom";

/**
 * selectorはAtomにもとづく派生state
 * Atomの値を何らかの計算や加工した結果を返します
 */

// 主賓の人数を扱うStateとしてselectorを生成
export const mainGuestCountState = selector({
  // UniqueになるようにKeyを設定
  key: "MainGuestCount",
  get: ({ get }) => {
    // get(定義したState) でアイテムを取得できる
    const persons = get(personsState);
    // 加工して返す
    return persons.filter((person) => person.isMainGuest).length;
  },
});

export const guestCountState = selector({
  key: "GuestCount",
  get: ({ get }) =>
    get(personsState).filter((person) => !person.isMainGuest).length,
});

export const regularBillState = selector({
  key: "RegularBill",
  get: ({ get }) => {
    const arrangementPrice = get(arrangementPriceState);
    if (arrangementPrice < 1000) return 0;
    // 主賓は500円OFFなので、他のゲストが多めに払う
    const mainGuestCount = get(mainGuestCountState);
    const extraPrice = mainGuestCount * 500;
    const price =
      (arrangementPrice + extraPrice) / (get(guestCountState) + mainGuestCount);
    // 細かいお金にならないよう100円単位で請求
    return Math.ceil(price / 100) * 100;
  },
});

export const specialDiscountBillState = selector({
  key: "SpecialDiscountBill",
  get: ({ get }) => {
    const bill = get(regularBillState);
    return bill - 500 >= 0 ? bill - 500 : 0;
  },
});

// 以下のように複数のStateをまとめて書くこともできる
export const totalState = selector({
  key: "Total",
  get: ({ get }) => {
    const personCount = get(mainGuestCountState) + get(guestCountState);
    const actualAmount = 
    get(regularBillState) * get(guestCountState) +
    get(specialDiscountBillState) * get(mainGuestCountState);
    return {
      personCount,
      actualAmount
    }
  },
});
