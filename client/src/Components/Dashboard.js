import { Navigate } from 'react-router-dom';



export default function Dashboard({ user }) {
  return (
    <>
    { !user ? <Navigate to="/" /> :
    <>
      <img width="100%" src={user.avatar_url}></img>
    </>
    }
    </>
  );
}
