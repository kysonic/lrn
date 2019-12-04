import React from 'react';
import containerStyles from "./Container.module.css";

console.log(containerStyles);
const Container = ({children}) => {
    return (
        <div className={containerStyles.container}>{children}</div>
    );
};

export default Container;
