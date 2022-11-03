import { Navigate } from 'react-router-dom';



export default function Dashboard({ user }) {
  return (
    <>
    { !user ? <Navigate to="/" /> :
    <>
      <>Dashboard goes here!</>
      
      
      <h1>State Shit</h1>
      <p>avatar</p>
      <img src={user.avatar_url}></img>
      
    </>
    }
    </>
  );
}
