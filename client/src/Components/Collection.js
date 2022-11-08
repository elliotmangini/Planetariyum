import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from '../StyleSheets/Collection.module.css';



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
          <div className={style.collection_page}>
            <img width="100%" height="100%" className={style.full_art_background} src={collection.cover_url} />

            <div className={style.main_content_container}>
              <img width="100%" height="100%" className={`${style.full_art_background} ${style.nested_full_art}`} src={collection.cover_url} />
              <div className={style.cover_and_quick_details}>
                <img className={style.cover_art} src={collection.cover_url} />
                <div className={style.quick_details}>
                  <div className={style.text_item}>{collection.creator.display_name}</div>
                  <div className={style.text_item}>{collection.name}</div>
                </div>
              </div>
              <div className={style.description_text}>{collection.description}</div>
              <div className={style.button_container}>
                <div className={style.main_button}>Solo</div>
                <div className={style.main_button}>Invite</div>
                <div className={style.main_button}>Matchmaking</div>
                <div className={style.main_button}>Create Event</div>
              </div>
            </div>
          </div>
        </>
      : null }
    </>
  );
}
