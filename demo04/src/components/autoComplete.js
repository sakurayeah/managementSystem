import React from 'react';
import './autoComplete.less';

class AutoComplete extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayValue: '',
      activeItemIndex: -1
    };
  }
  iptChange(value) {
    this.props.onValueChange(value);
  }
  render () {
    const {displayValue, activeItemIndex} = this.state;
    const {value, options, iptType = 'text'} = this.props;
    return (
      <div className="auto-complete-wrap">
        <input 
          value={displayValue || value}
          onInput={(e) => this.iptChange(e.target.value)}
          type={iptType}
        />
        {
          options.length > 0 && (
            <ul 
              className="options" 
            >
              {
                options.map((item, index) => {
                  return (
                    <li 
                      key={index}
                      onClick={() => this.iptChange(item.value)}
                    >
                      {item.text}
                    </li>
                  );
                })
              }
            </ul>
          )
        }
      </div>
    );
  }
}

export default AutoComplete;