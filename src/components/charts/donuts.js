import _ from 'lodash'
export default function makeDonuts(donutName, data) {
  const {blogs,tags} = data
  const tempArry = []
  // map blog=>tag
  const blogByTag = blogs.map(item => item.tags)
  // count how many posts per tag
  const temp = _.countBy([].concat.apply([], blogByTag))
  for (let [key, value] of Object.entries(temp)) {
    const tem = { 'value': value, 'name': key==1?'Vue':key==2?'React':'NodeJS' }  
    tempArry.push(tem)
  }
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: donutName,
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: tempArry
      }
    ]
  }
  return option
}
