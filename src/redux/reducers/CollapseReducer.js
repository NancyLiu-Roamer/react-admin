const init = false
export const collapseReducer = (pre=init,action)=>{
    const {type} = action
    switch (type) {
        case 'collapSide':
            return !pre
        default:
            return pre;
    }
}

