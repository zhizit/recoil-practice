import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { PersonalBill } from "./components/PersonalBill";
import { personsState, arrangementPriceState } from "./recoil/atom";
import { totalState } from "./recoil/selector";
import "./App.css";

export type Person = {
  id: number;
  name: string;
  isMainGuest: boolean;
};

function App() {
  // useRecoilState hook を使うと値の参照と登録ができる
  const [persons, setPersons] = useRecoilState(personsState);
  // useRecoilValue hook を使うと値を参照できる
  const { personCount, actualAmount } = useRecoilValue(totalState);
  // useSetRecoilState hook を使うと値を追加できる
  const setArrangementPrice = useSetRecoilState(arrangementPriceState);

  const handleAddPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPersons((oldList) => [
      ...oldList,
      {
        id: getId(),
        name: event.target.name.value,
        isMainGuest: event.target.isMainGuest.value,
      },
    ]);
  };

  const onChangeArrangementPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setArrangementPrice(Number(event.target.value));
  };

  return (
    <div className="App">
      <h2>南極忘年会</h2>
      <h3>費用として集めたい金額の目安</h3>
      <div>
        <label>
          ¥：
          <input
            type="number"
            min="0"
            onChange={onChangeArrangementPrice}
            // FIXME: ちゃんと書くならRecoilで取得するべき。useSetRecoilStateのsampleを書くためにこうしている。
            defaultValue="13200"
          />
        </label>
      </div>
      <h3>割り勘表</h3>
      <div>
        <p>※主賓は500円OFF</p>
        <p>※細かいお金にならないよう100円単位で請求</p>
        {persons.map((person) => (
          <PersonalBill key={person.id} person={person} />
        ))}
        <p>
          {personCount}人:合計¥
          {actualAmount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
        </p>
      </div>
      <h3>割り勘表に追加</h3>
      <form onSubmit={handleAddPerson}>
        <label>
          <input type="checkbox" name="isMainGuest" />
          主賓
        </label>
        <label>
          <input type="text" name="name" placeholder="名前" required />
        </label>
        <input type="submit" value="決定" />
      </form>
    </div>
  );
}

export default App;

// utility for creating unique Id
let id = 1;
function getId() {
  return id++;
}
