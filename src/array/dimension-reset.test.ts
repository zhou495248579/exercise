import {dimensionReset} from "./dimension-reset";

test('base',()=>{
    expect(dimensionReset([1,2,3,[4,5,[6,7]]])).toEqual([1,2,3,4,5,6,7])
})
