import React from 'react';

const formProvider = (types) => (Comp) => {

    const initialFormState = {};
    // 处理初始需要的 fromData
    for (const key in types) {
      initialFormState[key] = {
        val: types[key].defaultValue,
        error: ''
      };
    }
    
    class FormComponent extends React.Component {
      constructor (props) {
        super(props);
        this.state = {
          formData: initialFormState,
          formValid: false // 用来保存整个表单的校验状态
        };
      }
      valChange (typeName, value) {
        const { formData } = this.state;

        const newFieldState = {val: value, error: ''};

        const typeRules = types[typeName].rules;

        for (let i = 0; i < typeRules.length; i++) {
          const {
            pattern,
            error
          } = typeRules[i];

          let valid = false;
          
          if (typeof pattern === 'function') {
            valid = pattern(value);
          } else {
            valid = pattern.test(value);
          }
          
          if (!valid) {
            newFieldState.error = error;
            break;
          }
        }

        const newForm = {...formData, [typeName]: newFieldState};

        let formValid = false;
        Object.values(newForm).every(f => {
          if (f.error) {
            formValid = true
          }
        })
        
        this.setState({
          formData: newForm,
          formValid,
        });
      }
      setFormValues(editTarget) {
        if (!editTarget) {
          return;
        }
        const { formData } = this.state;
        const newForm = {...formData};
        for (const type in formData) {
          if (editTarget[type]) {
            newForm[type] = {
              ...newForm[type],
              val: editTarget[type]
            };
            // 一般 默认填充的 error 为空
            newForm[type].error = '';
          }
        }

        this.setState({
          formData: newForm,
        });
      }
      render () {
        const {formData, formValid} = this.state;
        return (
          <Comp {...this.props} 
            formData={formData} 
            formValid={formValid} 
            onFormChange={(typeName, value) => this.valChange(typeName, value)}
            setFormValues={(editTarget) => this.setFormValues(editTarget)}
          />
        )
      }
    }
    return FormComponent;
}

export default formProvider;