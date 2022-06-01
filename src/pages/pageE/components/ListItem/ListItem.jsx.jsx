import React, { PureComponent } from 'react';
import dayjs from 'dayjs';

/**
 * 类型
 * ```
 *  ticketData = {
 *      id: number,
 *      name: string,
 *      deadlineTime: string
 *      standardTime: string
 *  }
 * ```
 */

// 一天的秒数
const SECONDS_DAY = 3600 * 24;
// 倒计时定时器间隔时间 （秒）
const INTERVAL_MILLISECOND = 1;

class ListItem extends PureComponent {
  constructor(props) {
    super();

    /**
     * 1. 组件首次挂载之前先进行计算和判断过期时间，设置初始state对象属性
     */

    const { ticketData } = props;
    const { deadlineTime, standardTime } = ticketData;
    // standardTime 后端不返，就可以前端自己取本地时间
    // this.calculateDeadline(deadlineTime, dayjs().unix().toString());

    const { isShowCountDown = false, differenceSecondsTime = 0 } = this.calculateDeadline(deadlineTime, standardTime);

    const formatTime = (
      isShowCountDown ?
        this.renderDeadlineCountDown(differenceSecondsTime) :
        this.renderDeadline(deadlineTime)
    ) || '';

    const btnDisabled = isShowCountDown && differenceSecondsTime <= 0;

    this.state = {
      // 是否禁用领取按钮
      btnDisabled,
      // 是否需要展示倒计时
      isShowCountDown,
      // 当前时间距离截止过期时间的总秒数差
      differenceSecondsTime,
      // 最终展示在页面的时间字符串
      formatTime,
    }
  }

  // 截止日期倒计时定时器
  deadlineTimer = null;

  componentDidMount() {
    const { isShowCountDown, differenceSecondsTime } = this.state;

    // 组件初始挂载完成之后，如果这张券需要展示倒计时且还未过期，则开启定时器
    if (isShowCountDown && differenceSecondsTime) {
      // this.startIntervalFn(differenceSecondsTime);
    }
  }

  componentWillUnmount() {
    // 卸载组件时要清除定时器，防止内存泄漏。控制台报警
    this.clearIntervalFn();
  }

  /**
   * 1. 判断截止日期是否超过了1天（24小时）
   * 2. 返回初始state属性值的对象
   * @param { string } deadlineTimestamp 当前实例的截止日期时间戳
   * @param { string } standardTimestamp 此时此刻标准北京时间戳
   * 
   * @returns { object } patchState 用来更新初始state属性的补丁对象
   */
  calculateDeadline = (deadlineTimestamp, standardTimestamp) => {
    if (!deadlineTimestamp) {
      return {
        differenceSecondsTime: 0,
        isShowCountDown: false,
      };
    }

    // 当前本地时间的秒级时间戳
    const localTimestamp = Number(standardTimestamp) || dayjs().unix();

    // 截止时间 减 当前时间 等于 剩余截止的时间
    const differenceSecondsTime = (Number(deadlineTimestamp) - localTimestamp) || 0;

    return {
      isShowCountDown: differenceSecondsTime < SECONDS_DAY,
      differenceSecondsTime: differenceSecondsTime < 0 ? 0 : differenceSecondsTime,
    }
  }

  clearIntervalFn = () => {
    try {
      clearInterval(this.deadlineTimer);
    } finally {
      // 如果js执行环境处于严格模式下，清除定时器为null时，可能会报错
    }
  }

  /**
   * 1. 开启倒计时定时器
   * 2. 定时器回调执行，重新计算倒计时剩余时间。更新state
   */
  startIntervalFn = () => {
    this.clearIntervalFn();
    this.deadlineTimer = setInterval(() => {
      const { differenceSecondsTime } = this.state;
      const newDifferenceSecondsTime = differenceSecondsTime - INTERVAL_MILLISECOND;
      const formatTime = this.renderDeadlineCountDown(newDifferenceSecondsTime);

      this.setState({
        formatTime,
        differenceSecondsTime: newDifferenceSecondsTime,
      })
    }, INTERVAL_MILLISECOND * 1000);
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
   * 渲染截止日期
   * @param { string } deadlineTimestamp
   * @returns { string } YYYY-MM-DD
   */
  renderDeadline = (deadlineTimestamp) => {
    return dayjs(Number(deadlineTimestamp) * 1000).format('YYYY-MM-DD') + " 过期";
  }

  /**
   * 1. 判断是否已到过期时间。如果过期清除定时器，更新state禁用领取按钮属性。
   * 2. 返回最新的倒计时时间字符串
   * @param { number } differenceSecondsTime 截止过期的总秒数
   * @returns { string } 00:00:00
   */
  renderDeadlineCountDown = (differenceSecondsTime) => {
    if (differenceSecondsTime <= 0) {
      this.clearIntervalFn();
      this.state && this.setState({
        btnDisabled: true,
      });
      return '红包已过期';
    }

    const [h, m, s] = this.secondsConvertHMS(differenceSecondsTime, true);

    return `${h}:${m}:${s} 后过期`;
  }


  render() {
    const { ticketData } = this.props;
    const { btnDisabled, formatTime } = this.state;

    console.log('render');

    return (
      <div className="list-item">
        <h5>{ticketData.name}</h5>

        <p className='item-deadline'>{formatTime}</p>

        <button
          disabled={btnDisabled}
          className={`receive-btn${btnDisabled ? ' receive-btn-disabled' : ''}`}
        >
          领取
        </button>
      </div>
    )
  }
}

export default ListItem;
