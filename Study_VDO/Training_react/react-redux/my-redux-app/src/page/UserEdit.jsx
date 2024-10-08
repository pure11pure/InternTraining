import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUser, createUser, editUser } from "../actions/userActions";
import { fetchUser, createUser, editUser } from "../reducers/userSlice";
import { useParams } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  // subscribe 'Store'
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handleSave = async () => {
    console.log("BTN :|handleSave()| ");
    if (id) {
      const res = await dispatch(editUser(userData));
      if (res.success) {
        alert("Edit user successful");
      }
    } else {
      const res = await dispatch(createUser(userData));
      if (res.success) {
        alert("Create user successful");
      }
    }

    // const result = userData.id
    //   ? await dispatch(editUser(userData))
    //   : await dispatch(createUser(userData));
    // if (result.success) {
    //   setMessage("User saved successfully.");
    //   setIsError(false);
    //   history.push("/"); // Redirect after successful save
    // } else {
    //   setMessage(result.message || "An error occurred.");
    //   setIsError(true);
    // }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="text"
        name="phoneNumber"
        value={userData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="mb-4 w-full rounded border p-2"
      />
      {message && (
        <div className={isError ? "text-red-500" : "text-green-500"}>
          {message}
        </div>
      )}

      <button
        onClick={handleSave}
        className="rounded bg-green-500 px-4 py-2 text-white"
      >
        Save
      </button>
    </div>
  );
};

export default UserEdit;
