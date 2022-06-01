import React, { PureComponent } from 'react';
import './pageE.scss';

import ListItem from './components/ListItem/ListItem.jsx';
import GiftList from './components/GiftList/GiftList.jsx';
import dayjs from 'dayjs';

class pageE extends PureComponent {
  state = {
    // 红包礼物数据 （抖动动画）
    giftDataList: [],
    // 券过期的数据 （倒计时）
    ticketDataList: [],
  }

  componentDidMount() {
    // 模拟获取数据
    Promise.resolve().then(() => {
      const giftDataList = [
        {
          id: 1,
          name: '好友组队',
          url: require('./gift.png'),
          isAnimation: false,
        },
        {
          id: 2,
          name: '点击领取',
          url: require('./gift.png'),
          isAnimation: true,
        },
        {
          id: 3,
          name: '点击领取',
          url: require('./gift.png'),
          isAnimation: true,
        }
      ]

      const ticketDataList = [
        {
          id: 1,
          name: '券1',
          // 距离今天此时此刻, 一周（7天）之后的日期时间戳  (超过1天的，展示为 年-月-日)
          deadlineTime: dayjs().add(1, 'week').endOf('second').unix().toString(),
          // 如果需要防止用户本地设备时间有误差的话，让后端将服务器标准北京时间也返回来
          standardTime: dayjs().unix().toString(),
        },
        {
          id: 2,
          name: '券2',
          // 距离今天此时此刻, 2个小时后的时间戳 （不满一天的，展示为 时-分-秒 。需要自动倒计时）
          deadlineTime: dayjs().add(2, 'hour').unix().toString(),
          standardTime: dayjs().unix().toString(),
        },
        {
          id: 3,
          name: '券3',
          // 距离今天此时此刻, 已经过期一个小时
          deadlineTime: dayjs().subtract(1, 'hour').unix().toString(),
          standardTime: dayjs().unix().toString(),
        },
        {
          id: 4,
          name: '券4',
          // 10秒后过期
          deadlineTime: dayjs().add(10, 'second').unix().toString(),
          standardTime: dayjs().unix().toString(),
        },
      ];

      this.setState({
        giftDataList,
        ticketDataList,
      });
    })
  }

  render() {
    const { ticketDataList, giftDataList } = this.state;

    return (
      <div className="wrapper">
        <div className='ticket-container'>
          <div className='list-container'>
            {ticketDataList.map(ticketInfo => (
              <ListItem ticketData={ticketInfo} key={ticketInfo.id} />
            ))}
          </div>
        </div>

        <div className='gift-container'>
          <GiftList giftDataList={giftDataList} />
        </div>
      </div>
    )
  }
}

export default pageE;