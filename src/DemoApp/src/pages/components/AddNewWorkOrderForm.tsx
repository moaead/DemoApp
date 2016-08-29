import * as React from "react";
import * as ReactDOM from "react-dom";
import {Field, Form, reduxForm} from "redux-form"


const validate = values => {
    const errors: any = {}
    if (!values.orderQty) {
        errors.orderQty = 'Required'
    } else if (isNaN(Number(values.orderQty))) {
        errors.orderQty = 'Must be a number'
    }
    if (!values.productId) {
        errors.productId = 'Required'
    }
    return errors
};


interface IAddNewWorkOrderFormProps {
    handleSubmit?;
    pristine?;
    reset?;
    submitting?;
    onSubmit?;

    productId?;
}
class AddNewWorkOrderForm extends React.Component<IAddNewWorkOrderFormProps, {}> {
    state = {
        productsDropdownData: []
    };
    productIdSelect;

    componentDidMount() {
        fetch("/Products/Dropdown")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    productsDropdownData: data
                });
            });
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        const renderField = ({input, label, type, meta: {touched, error}}) => (
            <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
                <label className="control-label col-md-2">{label}: </label>
                <div className="col-md-10">
                    <input {...input} placeholder={label} type={type} className="form-control"/>
                    {touched && error && <div style={{marginTop:5, color:"#a94442"}}>{error}</div>}
                </div>
            </div>
        );


        const renderSelect = ({input, label, children, meta: {touched, error}}) => {
            this.productIdSelect = input;
            return (
                <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
                    <label className="control-label col-md-2">{label}: </label>
                    <div className="col-md-10">
                        <select  {...input}
                            className="form-control"
                            children={children}/>
                        {touched && error && <div style={{marginTop:5, color:"#a94442"}}>{error}</div>}
                    </div>
                </div>


            )
        };


        return (
            <form onSubmit={handleSubmit} className="form form-horizontal">
                <Field name="orderQty" component={renderField} type="text" label="Order quantity"/>

                <Field name="productId" component={renderSelect} type="text" label="Product">
                    <option value="">Select a product</option>
                    {this.state.productsDropdownData
                        .map(t => <option key={t.value} value={t.value}>{t.text}</option>)}

                </Field>

                <div className="modal-footer">
                    <div className="form-group">
                                    <span className="header-buttons">
                                    <div className="row">
                                    <div className="col-md-6 pull-right">
                                        <input className="btn btn-primary" type="submit" value="Add"
                                               style={{ marginLeft: "5px" }}/>
                                        <input className="btn btn-secondary" type="reset" value="Close" data-dismiss=
                                            "modal"/>
                                    </div>
                                        </div>
                                </span>
                    </div>
                </div>

            </form>
        );
    }
}

export default reduxForm({
    form: 'AddNewWorkOrderForm',
    validate
})(AddNewWorkOrderForm);
