import UserDeleteButton from "./userDeleteButton";

export default function UserCard({ user, no }) {
  return (
    <div className="userCard">
      <div>0{no}</div>
      <div>{user.user_name}</div>
      <div>{user.department === null ? "Center" : user.department}</div>
      <div>{user.last_login === null ? "no data yet" : user.last_login}</div>
      <div>{user.is_admin ? "Yes" : "No"}</div>
      <div>{user.is_active ? "Yes" : "No"}</div>
      <div>
        <button className="btn btn-green btn-small">EDIT</button>
        <UserDeleteButton
          userId={user.id}
          disable={user.is_admin ? true : false}
        />
      </div>
    </div>
  );
}
