import React, { useEffect } from 'react';
 
let Main = () => {
     useEffect(() => {
     // 类似于 componentDidMount 和 componentDidUpdate:
    
     return () => {
         // 类似于 componentWillUnmount
     };
     }, []);
     // ...
};
export default Main