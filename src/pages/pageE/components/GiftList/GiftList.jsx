import React, { PureComponent } from 'react';
import './GiftList.scss';

export default class GiftList extends PureComponent {

  static defaultProps = {
    giftDataList: [],
  }

  render() {
    const { giftDataList } = this.props;

    return (
      <div className="gift-content">
        {/* start */}
        <div className="gift-list">
          {giftDataList.map(item => (
            <div className='gift-item' key={item.id}>
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
    )
  }
}