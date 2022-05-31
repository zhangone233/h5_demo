import React, { PureComponent } from 'react';
import './pageD.scss';

export default class PageD extends PureComponent {
  state = {
    data: [
      {
        name: '好友组队',
        url: require('./gift.png'),
        isAnimation: false,
      },
      {
        name: '点击领取',
        url: require('./gift.png'),
        isAnimation: true,
      },
      {
        name: '点击领取',
        url: require('./gift.png'),
        isAnimation: true,
      }
    ]
  }

  render () {
    const { data } = this.state;

    return (
      <div className="container">
        <div className="content">
          {/* start */}
          <div className="gift-list">
            {data.map(item => (
              <div className='gift-item'>
                  {/* 可以动态判断给指定的div加动画类名 */}
                  <div className={`gift-icon ${item.isAnimation ? 'gift-icon-animation' : ''}`}>
                    <img src={item.url} alt="" />  
                  </div>     

                  <div className='gift-name'>{item.name}</div>    
              </div>
            ))}
          </div>

          <div className='footer'>
            {/* 动画类名 sweep-ray-animation */}
            <button className='btn sweep-ray-animation'>领取</button>
          </div>
        </div>
      </div>
    )
  }
}