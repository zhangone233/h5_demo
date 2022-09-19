import React from 'react';
import './index.scss';

import { groupBy } from './utils';
import { Input, Select, Form } from 'antd';
import MutualExclusionSelect from './components/MutualExclusionSelect';

const mockData = [
  {
    //  id
    id: 1,
    //  label
    label: '用户名',
    //  字段名
    fieldName: 'field-1',
    //  组件类型
    type: 'Input',
    //  默认值
    defaultValue: '111'
  },
  {
    id: 2,
    label: '字段2',
    fieldName: 'field-2',
    type: 'Select',
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    groupingValue: '2', // 选中 选项2 的时候，才展示分组字段
    grouping: [
      {
        id: 11,
        label: '分组字段1',
        fieldName: 'field-2-1',
        type: 'Select',
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ],
        group: 'group1',
      },
      {
        id: 22,
        label: '分组字段2',
        fieldName: 'field-2-2',
        type: 'Select',
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ],
        group: 'group1',
      },
      {
        id: 33,
        label: '分组字段3',
        fieldName: 'field-2-3',
        type: 'Select',
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ],
        group: 'group1',
      },
      {
        id: 44,
        label: '分组字段4',
        fieldName: 'field-2-4',
        type: 'Select',
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ],
        group: 'group2',
      },
      {
        id: 55,
        label: '分组字段5',
        fieldName: 'field-2-5',
        type: 'Select',
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ],
        group: 'group2',
      },
    ]
  },
]

export default class App extends React.Component {
  constructor () {
    super();

    const initialValues = mockData.reduce((container, item) => {
      const { defaultValue, grouping, fieldName } = item;
      if (defaultValue) {
        container[fieldName] = defaultValue;
      }

      if (Array.isArray(grouping) && grouping.length) {
        grouping.forEach(child => {
          const { defaultValue, fieldName } = child;
          if (defaultValue) {
            container[fieldName] = defaultValue;
          }
        })
      }

      return container;
    }, {});

    this.state = {
      initialValues: initialValues,
    }
  }

  formInstanceRef = React.createRef();

  renderInput(item) {
    const { defaultValue, fieldName, label } = item;

    return (
      <Form.Item
        label={label}
        name={fieldName}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
    )
  }

  renderSelect(item) {
    const { formInstanceRef } = this;
    const { fieldName, label, options, grouping, groupingValue } = item;

    console.log(formInstanceRef, 'formInstanceRef');

    const siblingNodes = [];
    // 判断是否有分组的数据
    if (Array.isArray(grouping) && grouping.length) {
      const fieldValue = formInstanceRef.current?.getFieldValue(fieldName);

      if (fieldValue === groupingValue) {
        // 根据 group属性 给每组进行分类
        const groupingObj = groupBy(grouping, (item) => item.group);

        // groupingObj = { group1: [item, item, item], group2: [item, item] };
        console.log(groupingObj, 'groupingObj');

        Object.values(groupingObj).forEach(item => siblingNodes.push(
          <MutualExclusionSelect listData={item} formInstance={formInstanceRef.current} />
        ));
      }
    }

    console.log(siblingNodes, 'siblingNodes');

    return (
      <>
        <Form.Item
          label={label}
          name={fieldName}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Select allowClear options={options} style={{ width:'100%' }} />
        </Form.Item>
        
        {siblingNodes}
      </>
    )
  }

  renderControl(item) {
    const { type, id } = item;

    switch(type) {
      case 'Input': 
        return (
          <div className='grouping-component' key={id}>
            {this.renderInput(item)}
          </div>
        )
      
      case 'Select':
        return (
          <div className='grouping-component' key={id}>
            {this.renderSelect(item)}
          </div>
        )
      default: 
        return null;
    }
  }

  render() {
    const { initialValues } = this.state;
    console.log('rerender');
    
    return (
      <div className='grouping-container'>
        <div className='grouping-content'>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            ref={this.formInstanceRef}
            initialValues={initialValues}
            onFieldsChange={(changedFields, allFields) => {
              console.log(allFields, 'allFields');
              this.setState({
                initialValues: allFields,
              });
              // 这个地方跟roo不一样，不用参考在意
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {mockData.map(item => this.renderControl(item))}
          </Form>
        </div>
      </div>
    )
  }
}