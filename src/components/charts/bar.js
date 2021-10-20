import _ from 'lodash'
export default function makeBar(barName,data){
    const temp = _.groupBy(data, item => item.status)
        // get key from object    
        const xLabel = Object.keys(temp).map(item => {
            return item == 1 ? 'Draft' : item == 2 ? 'Active' : 'Archive'
        })
        const option = {
            // title: {
            //     text: "Posts per Status"
            // },
            tooltip: {trigger: 'item'},
            legend: {
                data: ['Posts']
            },
            xAxis: {
                data: xLabel
            },
            yAxis: {},
            series: [
                {
                    name: barName,
                    type: 'bar',
                    data: Object.values(temp).map(item => item.length)
                }
            ]
        }
     return option   
}
    
