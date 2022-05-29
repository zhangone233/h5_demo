import React, { PureComponent } from 'react';
import './pageC.scss';

import ListItem from './components/ListItem/ListItem.jsx';
import dayjs from 'dayjs';

class PageC extends PureComponent {
  state = {
    data: [],
  }

  componentDidMount() {
    // 模拟获取数据
    Promise.resolve().then(() => {
      const mockData = [
        {
          id: 1,
          name: '券1',
          // 距离今天此时此刻, 一周（7天）之后的日期时间戳  (超过1天的，展示为 年-月-日)
          deadline: dayjs().add(1, 'week').endOf('second').unix().toString(),
        },
        {
          id: 2,
          name: '券2',
          // 距离今天此时此刻, 2个小时后的时间戳 （不满一天的，展示为 时-分-秒 。需要自动倒计时）
          deadline: dayjs().add(2, 'hour').unix().toString(),
        },
        {
          id: 3,
          name: '券3',
          // 距离今天此时此刻, 已经过期一个小时
          deadline: dayjs().subtract(1, 'hour').unix().toString(),
        },
        {
          id: 4,
          name: '券4',
          // 10秒后过期
          deadline: dayjs().add(10, 'second').unix().toString(),
        },
      ];

      this.setState({
        data: mockData
      });
    })
  }

  render() {
    const { data } = this.state;
    console.log(data, 'data');

    return (
      <div className="wrapper">
        <div className='list-container'>
          {data.map(ticketInfo => (
            <ListItem ticketData={ticketInfo} key={ticketInfo.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default PageC;