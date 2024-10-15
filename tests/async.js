import axios from 'axios'
import _upperFirst from 'lodash/upperFirst'
import _toLower from 'lodash/toLower'

export function asyncFn(){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve('Done!')
        }, 6000)
    });
}

export async function fetchMovieTitle(){
    const res = await axios.get('https://omdbapi.com?apikey=9cd161fb&i=tt4520988')
    console.log(res)
    return _upperFirst(_toLower(res.data.Title)) //Frozen II
}