import React from 'react';

class FormItem extends React.Component {
  render () {
    const {label = '', children = '', error = '', className = ''} = this.props;
    return (
      <div className={className}>
        <label>{label}</label>
        {children}
        {error && <span>{error}</span>}
      </div>
    );
  }
}

export default FormItem;