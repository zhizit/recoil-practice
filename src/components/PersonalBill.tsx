import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Person } from "../App";
import { personsState } from "../recoil/atom";
import { regularBillState, specialDiscountBillState } from "../recoil/selector";

type PersonalBillProps = {
  person: Person;
};

export const PersonalBill: FC<PersonalBillProps> = (props) => {
  const [persons, setPersons] = useRecoilState(personsState);
  const regularBill = useRecoilValue(regularBillState);
  const specialDiscountBill = useRecoilValue(specialDiscountBillState);
  const bill = props.person.isMainGuest ? specialDiscountBill : regularBill;

  const handleDeletePerson = () =>
    setPersons(persons.filter((person) => person.id !== props.person.id));

  return (
    <div className="personal-bill-content">
      <p>{props.person.name}さん{props.person.isMainGuest && "*"}</p>
      <p>¥{bill.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}</p>
      <button type="button" onClick={handleDeletePerson}>
        X
      </button>
    </div>
  );
};
