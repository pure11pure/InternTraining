import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function UserDetail() {
  const { userId } = useParams();

  const { user } = useContext(UserContext);
  return (
    <div className="grid mx-auto">
      <div>userDetail {user.name} </div>
      <div>: xxxxxxxx</div>
    </div>
  );
}

export default UserDetail;
