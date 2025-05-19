import React from 'react';

export function Plus(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="none" stroke={props.color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h7m7 0h-7m0 0V5m0 7v7"></path></svg>);
}