import React, { useState } from 'react'
import axios from 'axios';
export default function Soona() {

const [data, setData]=useState([])

  const [name,setName]=useState('')
  const Apicreate =async (e) => {
    
e.preventDefault()
    const apk = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=2ef2e385ae98409181bfd9f70786677d&query=chicken&number=20&equipment=pan&cuisine=${name}`
    );

 
    setData(apk.data.results)
    console.log(data);
  }

 


  return (
    <div>
      <button onClick={(e) => (Apicreate(e), setName("indian"))}>India</button>
      <br />
      <button onClick={(e) => (Apicreate(e), setName("american"))}>
      America
      </button>

      <div className='flex'>
        <div className='flex gap-x-5 gap-y-5 ml-10 my-10 flex-wrap'>
          {data.map((e, index) => {
            return (
              <div key={index}>
                <img src={e.image} width='80%' draggable='false' />
                {console.log(e.image)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
