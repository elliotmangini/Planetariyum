import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';



export default function Collection () {
  const { c } = useParams();
  const [ collection , setCollection ] = useState(null);


  useEffect(() => {
    fetch(`/collections/${c.toLowerCase()}`)
    .then(resp => resp.json())
    .then(data => setCollection(data));
  },[]);

  return (
    <>
      { collection ?
        <>
          <img width="100%" height="100%" src={collection.cover_url} />
        </>
      : null }
    </>
  );
}
