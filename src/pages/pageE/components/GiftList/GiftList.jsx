import React, { PureComponent } from 'react';
import './GiftList.scss';

import GiftItem from './GiftItem/GiftItem.jsx'

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
            <GiftItem giftData={item} key={item.id} />
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