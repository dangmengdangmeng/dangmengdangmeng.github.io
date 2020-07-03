import React, { PureComponent } from 'react';

import '@styles/Form/Select';

export default class Select extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      value: props.defaultValue ? props.defaultValue : '',
    };
  }

  onChange(value) {
    this.setState({
      value,
    });
    if (typeof this.props.onChange === 'function') this.props.onChange(value);
  }

  visibleChange() {
    this.setState({
      visibleOpts: !this.state.visibleOpts,
    });
  }

  render() {
    // eslint-disable-next-line radix
    const defaultId = `input_${new Date().valueOf() + parseInt(Math.random() * 1000)}`;
    const { className = '', id = defaultId, name = defaultId, options = [] } = this.props;
    const { value, visibleOpts } = this.state;
    const selectOpt = options.find(opt => opt.value === value);

    return (
      <div className={`select-label ${className} ${visibleOpts ? 'showOpts' : ''}`} id={id} name={name} onClick={this.visibleChange.bind(this)}>
        {selectOpt ? selectOpt.content : '请选择'}
        <ul>
          {options.map(item => (
            <li className="select-item" onClick={this.onChange.bind(this, item.value)} key={`select_${item.value}`}>
              {item.content}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
