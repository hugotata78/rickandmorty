import React, {useEffect, useState} from 'react'
import Card from '../card/Card'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

const GraphHome = ()=>{

    const [chars,setChars]=useState([])
    const query = gql`
    {
        characters{
            results{
                name
                image
            }
        }
    }
    `
    const { data, loading, error } = useQuery(query)

    useEffect(()=>{
        if(data && !loading && !error){
            setChars([...data.characters.results])
        }
    },[data])

    function nextChars (){
        chars.shift()
        setChars([...chars])
    }
    if(loading) return <h2>Cargando...</h2>
    return(
        <Card leftClick={nextChars} {...chars[0]}/>
    )
}

export { GraphHome }