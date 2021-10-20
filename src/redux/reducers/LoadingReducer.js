const init = false
export const LoadingReducer = (pre=init,action)=>{
    const {type,payLoad} = action
    switch (type) {
        case 'changeLoading':
            return payLoad
        default:
            return pre;
    }
}
