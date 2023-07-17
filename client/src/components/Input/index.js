import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function InputUnform({nome, ...rest}) {
    const refInput = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(nome)
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: refInput.current,
            path: 'value'
        })
    }, [fieldName, registerField])
    return (
        <input ref={refInput} defaultValue={defaultValue} {...rest} />
    );
}