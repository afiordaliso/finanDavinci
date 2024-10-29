import React from 'react';
import { useGlobalState } from 'context/GlobalState';

const Balance = () => {
    const { total } = useGlobalState(); // Se accede a 'Context'
    return (
        <div>
            <h2>Balance: {total}</h2>
        </div>
    );
};

export default Balance;
