import _ from 'lodash'
export default function makePie(pieName,data){
    const {users,roles} = data
    //grouby roleId
    const temp = _.groupBy(users, item => (item.roleId))
    const tempArry = []
    // change roleId => role name
    for (let [key, value] of Object.entries(temp)) {
        const a = { 'value': value.length, 'name': key==1?'Admin':key==2?'Manage':'User' }
        tempArry.push(a)
    }
    const option = {
        title: {
            // text: 'Users',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: pieName,
                type: 'pie',
                radius: '50%',
                data: tempArry,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    return option
}