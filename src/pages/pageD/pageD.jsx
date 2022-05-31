import React, { PureComponent } from 'react';
import './pageD.scss';

export default class PageD extends PureComponent {
  state = {
    data: [
      {
        name: '好友组队',
        url: require('./gift.png'),
      },
      {
        name: '点击领取',
        url: require('./gift.png'),
      },
      {
        name: '点击领取',
        url: require('./gift.png'),
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
                  <div className='gift-icon gift-icon-animation'>
                    <img src={item.url} alt="" />  
                  </div>     

                  <div className='gift-name'>{item.name}</div>    
              </div>
            ))}
          </div>

          <div className='footer'>
            <button className='btn sweep-ray'>领取</button>
          </div>
        </div>
      </div>
    )
  }
}