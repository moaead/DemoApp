import * as React from "react";
import WorkOrderPage from "./pages/WorkOrderPage";
import {Provider} from "react-redux";
//import TestPage from "./pages/TestPage";


interface IAppProps {
    store;
}
export default class App extends React.Component<IAppProps, {}> {
    render() {
        return (
            <Provider store={this.props.store}>
                <WorkOrderPage/>
            </Provider>
        );
    }
}