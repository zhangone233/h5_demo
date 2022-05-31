import React, { PureComponent } from 'react';
import dayjs from 'dayjs';

/**
 * 类型
 * ```
 *  ticketData = {
 *      id: number,
 *      name: string,
 *      deadline: string
 *  }
 * ```
 */

class ListItem extends PureComponent {

  // static getDerivedStateFromProps (nextProps, nextState) {
    
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { delayBox, finalReward } = this.props;

  //   if (prevProps.delayBox !== delayBox || prevProps.finalReward !== finalReward) {
  //     this.hasCoupon();
  //   }
  // }

  // 截止日期定时器
  deadlineTimer = null;

  componentWillUnmount() {
    // 卸载组件时要清除定时器，防止内存泄漏。控制台报警
    this.clearTimeoutFn();
  }

  clearTimeoutFn = () => {
    try {
      clearTimeout(this.deadlineTimer);
    } finally {
      // 如果js执行环境处于严格模式下，清除定时器为null时，可能会报错
    }
  }

  startTimeoutFn = (differenceSecondsTime) => {
    this.clearTimeoutFn();
    const { ticketData } = this.props;

    if (!ticketData?.deadline || !differenceSecondsTime || differenceSecondsTime < 0) {
      return;
    };

    this.deadlineTimer = setTimeout(() => {
      this.forceUpdate();
    }, 1000);
  }

  /**
   * 输入任意秒数, 计算该秒数对应的时分秒, 并返回元组
   * @param { number } seconds 秒数
   * @param { boolean } isAddZero 是否为个位数补前缀 0
   * @returns { [string, string , string] } [时，分，秒]
   */
  secondsConvertHMS = (seconds, isAddZero) => {
    if (!seconds || seconds <= 0) return ['00', '00', '00'];

    // 多少个整小时数
    const h = parseInt(seconds / 60 / 60);

    // 不满一小时的剩余分钟
    const m = parseInt(seconds / 60 % 60);

    // 不满一分钟的剩余秒数
    const s = parseInt(seconds % 60);

    const result = [h, m, s];
    return isAddZero ? result.map(n => n < 10 ? `0${n}` : String(n)) : result.map(String);
  }

  /**
   * 判断截止日期是否超过了一天 (包括等于一天)。 超过一天返回 true
   * @param { string } timestamp 截止日期的秒级时间戳
   * @returns { [boolean, number] } 元组
   * 索引0：是否超过     
   * 索引1：距离截止时间剩余的总秒数
   */
  isTheDeadlineMoreOneDay = (timestamp) => {
    if (!timestamp) return false;

    // 一天的秒数
    const secondsDay = 3600 * 24;

    // 当前本地时间的秒级时间戳
    const localTimestamp = Math.round(Date.now() / 1000);

    // 截止时间 减 当前时间 等于 剩余截止的时间
    const differenceSecondsTime = Number(timestamp) - localTimestamp;

    return [differenceSecondsTime >= secondsDay, differenceSecondsTime];
  }

  /**
   * 渲染截止日期
   * @param { string } deadlineTimestamp
   */
  renderDeadline = (deadlineTimestamp) => {
    return dayjs(Number(deadlineTimestamp) * 1000).format('YYYY-MM-DD');
  }

  /**
   * 渲染截止时间倒计时
   * @param { number } differenceSecondsTime 截止的总秒数
   */
  renderDeadlineCountDown = (differenceSecondsTime) => {
    if (!differenceSecondsTime || differenceSecondsTime < 0) {
      this.clearTimeoutFn();
    }

    const [h, m, s] = this.secondsConvertHMS(differenceSecondsTime, true);

    // this.startTimeoutFn(differenceSecondsTime);
    return `${h}:${m}:${s}`;
  }

  /**
   * 1. 判断截止日期是否超过了1天（24小时）
   * 2. 根据不同场景渲染不同的
   * @param { string } deadlineTimestamp 当前实例的截止日期时间戳
   */
  calculateDeadline = (deadlineTimestamp) => {
    const [isBeyond, differenceSecondsTime] = this.isTheDeadlineMoreOneDay(deadlineTimestamp);

    if (isBeyond) {
      this.clearTimeoutFn();
    }

    return isBeyond ? this.renderDeadline(deadlineTimestamp) : this.renderDeadlineCountDown(differenceSecondsTime);
  }

  render() {
    const { ticketData } = this.props;
    console.log('render');
    return (
      <div className="list-item">
        <h5>{ticketData.name}</h5>
        <p className='item-deadline'>{this.calculateDeadline(ticketData.deadline)}</p>
      </div>
    )
  }
}

export default ListItem;
