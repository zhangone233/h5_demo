import React, { PureComponent } from 'react';
import './pageF.scss';


class pageE extends PureComponent {


  render() {

    return (
      <div className="wrapper">

        <div className="modal-container">
          <div className="content-box">
            <div className='description-box'>
              <p className='text'>
                文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
              </p>
            </div>
            <div className='btn-box'>
              <button onClick={() => console.log('能点到')}>按钮</button>
              
              <div className='layer'></div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}

export default pageE;