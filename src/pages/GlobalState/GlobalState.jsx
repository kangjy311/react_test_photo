import React, { useState } from 'react';
import Component1 from './components/Component1/Component1';
import { useRecoilState } from 'recoil';
import { inputState } from './atoms/inputState';

function GlobalState(props) {
    const [ value, setValue ] = useRecoilState(inputState);
    // 비구조할당

    return (
        <div>
            <h1>{value}</h1>
            <Component1/>
        </div>
    );
}

export default GlobalState;