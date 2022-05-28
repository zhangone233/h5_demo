import React from 'react';
import './pageA.scss';

const pageA = () => {
  // const a = 1;

  // const getStyleName = (x) => {
  //   switch(x){
  //     case 1: 
  //       return 'styleA';
  //     case 2: 
  //       return 'styleB';
  //     case 3: 
  //       return 'styleC';
  //     case 4: 
  //       return 'styleD';
  //   }
  // }

  // return <div className={`commonStyle ${getStyleName(a)}`}>内容</div>

  const styleName = 'styleA'

  return <div className={styleName}>内容</div>
}