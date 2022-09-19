import React from 'react';
import { Form, Select } from 'antd';

export default class MutualExclusionSelect extends React.Component {

  render() {
    const { listData, formInstance } = this.props;
    const listItem = listData.find(item => formInstance?.getFieldValue(item.fieldName)); // 没有选中的就是undefined

    return listData.map(item => {
      const { fieldName, label, options } = item;
      
      return (
        <Form.Item
          label={label}
          name={fieldName}
        >
          <Select 
            allowClear
            options={options} 
            style={{ width:'100%' }} 
            disabled={listItem && listItem.fieldName !== fieldName} 
          />
        </Form.Item>
      )
    });
  }
}