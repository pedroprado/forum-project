import React from 'react';

const authContext = React.createContext({
    authenticated : true,
    username: 'pedroprado'
});

export default authContext;