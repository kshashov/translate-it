import React from 'react';
import Spinner from "reactstrap/es/Spinner";
import {Spin} from "antd";

export default function LoadingIndicator(props) {
    return (
        <Spin {...props} delay={500}/>
    );
}