import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import style from '../StyleSheets/Profile.module.css'; 


export default function Profile () {
  const { u } = useParams();
  const [ user , setUser ] = useState(null);

  // console.log(u);

  useEffect(() => {
    fetch(`/users/${u.toLowerCase()}`)
    .then(resp => resp.json())
    .then(data => setUser(data));
  },[]);

  return (
    <>
      { user ?
        <>
          <img className={style.avatar_background} width="100%" src={user.avatar_url}></img>
        </>
      : null }
    </>
  );
}
