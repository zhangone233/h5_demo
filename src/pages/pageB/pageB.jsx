import React, { memo, useState } from 'react';
import './pageB.scss';

const PageB = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: '券1'
    },
    {
      id: 2,
      name: '券2'
    },
    {
      id: 3,
      name: '券3'
    },
    {
      id: 4,
      name: '券4'
    },
    {
      id: 5,
      name: '券5'
    },
    {
      id: 6,
      name: '券6'
    },
    {
      id: 7,
      name: '券7'
    },
    {
      id: 8,
      name: '券8'
    },
    {
      id: 9,
      name: '券9'
    },
  ]);

  return (
    <div className="wrapper">
      <div className='list-container'>
        {data.map(listInfo => (
          <div className="list-item" key={listInfo.id}>
            <h5>{listInfo.name}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(PageB);