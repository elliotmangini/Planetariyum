import { v4 as uuid } from 'uuid';

import GridItem from './GridItem';



export default function Home ({ publications }) {

    const gridItems = publications.map((p) =>{
        return (
            <GridItem item={p} key={uuid()} />
        )
    })



    return (
        <>
        {gridItems}
        </>
    )
}