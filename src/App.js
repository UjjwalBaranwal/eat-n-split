import { useState } from "react";
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
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const handleShowAddFriend = () => {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  };
  const handleFriendList = (friend) => {
    setFriends((el) => [...el, friend]);
    setShowAddFriend((el) => !el);
  };
  const handleSelectedFriend = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((el) => (el?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };
  const handleSplitBill = (value) => {
    console.log(value);
    setFriends((el) =>
      el.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friend={friends}
          onSelection={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleFriendList} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplittBill friend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}
function FriendList({ friend, onSelection, selectedFriend }) {
  // const friend = initialFriends;

  return (
    <ul>
      {friend.map((el) => (
        <Friend
          friend={el}
          key={el.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  console.log(isSelected);
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const newfriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newfriend);
    console.log(newfriend);
    setImage("https://i.pravatar.cc/48");
    setName("");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="add-friend">🙎Add friend</label>
      <input
        type="text"
        id="add-friend"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="img-url">🙎Image URL</label>
      <input
        type="text"
        id="img-url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplittBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [payBill, setPayBill] = useState("user");
  const friendPaid = bill ? bill - paidByUser : "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(payBill === "user" ? friendPaid : -paidByUser);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>splitt bill with {friend.name} </h2>
      <label htmlFor="bill-value">💰 Bill Value</label>
      <input
        type="text"
        id="bill-value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label htmlFor="my-expanse">👉👈 I spend</label>
      <input
        type="text"
        id="my-expanse"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : e.target.value
          )
        }
      />
      <label htmlFor="x-spend">💹 {friend.name} spend</label>
      <input type="text" id="x-spend" value={friendPaid} disabled />
      <label htmlFor="who_pay">🤑 Who is paying </label>
      <select
        id="who_pay"
        value={payBill}
        onChange={(e) => setPayBill(e.target.value)}
      >
        <option value="user">You</option>
        <option value="frined">{friend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
