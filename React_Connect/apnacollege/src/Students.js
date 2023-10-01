import React, { useEffect, useState } from 'react'

export default function Students() {
    const [data,setData]  = useState([]);

    useEffect(()=>{
       // var result = [{"name":"ajay"}]
       // setData(result);

        var url = "http://localhost:8989/students";

        fetch(url)
        .then(res => res.json())
        .then(result=>{setData(result)})
    },[])

  return (
    <div>
        {/* {JSON.stringify(data)} */}
        <table border={1} cellPadding={3} cellSpacing={3}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, i) => {
            return <tr>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.city}</td>
            </tr>;
          })}
            </tbody>
        </table> 
    </div>
  )
}
