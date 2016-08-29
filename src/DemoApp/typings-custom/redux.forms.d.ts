declare module "redux-form" {
    export const Field: any;
    export const Form: any;
    export function reduxForm(config:any,
                              mapStateToProps?:MapStateToProps,
                              mapDispatchToProps?:MapDispatchToPropsFunction|MapDispatchToPropsObject):ClassDecorator;
}