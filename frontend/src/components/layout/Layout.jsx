import {Toaster} from 'react-hot-toast';
import React from 'react';

export const Layout = ({children}) => {
    return <div>
        <Toaster/>
        {children}
    </div>
}
