// pages/admin/notifications.js
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export default async function Notifications() {
  await connect();
  const users = await User.find({});
  return (
    <div>
      <h1>All users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            User ID: {user.userId}, Name: {JSON.stringify(user.f_name + " " + user.l_name)},
            Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
