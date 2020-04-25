import React, {Component, memo, useEffect, useMemo, useState} from "react";
import RouterExercise from "./router";

const CountButton = React.memo(function CountButton({onClick, count}) {
    console.log('render count')
    return <button onClick={onClick}>{count}</button>
})


export function App() {
    console.log('app render')
    const [count1, setCount1] = React.useState(0)
    const increment1 = React.useCallback(() => setCount1(c => c + 1), [])

    const [count2, setCount2] = React.useState(0)
    const increment2 = React.useCallback(() => setCount2(c => c + 1), [])
    useEffect(() => {
        console.log('effect')
    },[])
    return (
        <>
            {/*<CountButton count={count1} onClick={increment1} />*/}
            {/*<CountButton count={count2} onClick={increment2} />*/}
            <RouterExercise/>
        </>
    )
}
