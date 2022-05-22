import React, { memo } from 'react';
import './index.scss';

const Home = () => {

  return <div className='container'>
    <div className='content'>
      <div className='header'>
        <h4>我是标题</h4>
      </div>

      <div className="info">
        {/* 从这开始的 */}
        <div className='ticket-item'>
          {/* 其它元素 定位 */}
          <div className='extra-node'>
            <button className='btn'>天天神券</button>
          </div>

          {/* 主要文字内容区域 */}
          <div className='parent'>
            <div className='left'>
              <div className="title">
                ￥<span className='price-text'>4</span>
              </div>

              <div className='bottom-text'>
                <span className='condition-text'>满30可用</span>
              </div>
            </div>

            <div className='center'>
              <div className="title">
                夜宵随机神券
              </div>

              <div className='bottom-text'>
                <span className='condition-text'>07:34:23到期</span>
              </div>
            </div>

            <div className='right'>
              <div className='right-condition-text'>
                最高膨胀至<span className='price-text'>20</span>
              </div>

              <div className='go-swell'>
                <div className='swell-btn'>
                  去膨胀
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default memo(Home)
