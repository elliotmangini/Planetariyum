import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';



export default function Profile () {
  const { u } = useParams();
  const [ user , setUser ] = useState(null);


  // ONLY FETCH IF THIS ISN'T THE LOGGED IN USER

  useEffect(() => {
    fetch(`/users/${u.toLowerCase()}`)
    .then(resp => resp.json())
    .then(data => setUser(data));
  },[]);

  return (
    <>
    {/* { !user ? <Navigate to="/" /> : */}

    { user ?
    <>
      <img width="100%" src={user.avatar_url}></img>
    </>
    : null }
    </>
  );
}
