const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FormSplittBill />
    </div>
  );
}
function FriendList() {
  const friend = initialFriends;

  return (
    <ul>
      {friend.map((el) => (
        <Friend friend={el} key={el.id} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ₹{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ₹{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and your friend are even</p>}
      <Button>Select</Button>
    </li>
  );
}
function Button({ children }) {
  return <button className="button">{children}</button>;
}
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label for="add-friend">🙎Add friend</label>
      <input type="text" id="add-friend" />

      <label for="img-url">🙎Image URL</label>
      <input type="text" id="img-url" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplittBill() {
  return (
    <form className="form-split-bill">
      <h2>splitt bill with X </h2>
      <label for="bill-value">💰 Bill Value</label>
      <input type="text" id="bill-value" />
      <label for="my-expanse">👉👈 I spend</label>
      <input type="text" id="my-expanse" />
      <label for="x-spend">💹 X spend</label>
      <input type="text" id="x-spend" disabled />
      <label for="who_pay">🤑 Who is paying </label>
      <select id="who_pay">
        <option value="user">You</option>
        <option value="frined">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
