import Vue from 'vue'

export default Vue.filter('newLine', (value) => {
  let ValueString = Math.floor(value).toString()
  // switch (ValueString.length) {
  //   case 0 | 1 | 2 | 3 | 4 | 5:
  //     return Number(ValueString)
  //     break;
  //   case 6:
  //     var six = Number(ValueString.substring(0, 2))
  //     return `${six}万`
  //     break;
  //   case 7:
  //     var seven = Number(ValueString.substring(0, 3))
  //     return `${seven}万`
  //     break;
  //   case 8:
  //     var eight = Number(ValueString.substring(0, 4))
  //     return `${eight}万`
  //     break;
  //   default :
  //     var night = Number(ValueString.substr(0, 1))
  //     return `${night}亿`
  // }
  if (ValueString.length < 6) {
    return Number(ValueString)
  } else if (ValueString.length === 6) {
    var six = Number(ValueString.substring(0, 2))
    return `${six}万`
  } else if (ValueString.length === 7) {
    var seven = Number(ValueString.substring(0, 3))
    return `${seven}万`
  } else if (ValueString.length === 8) {
    var eight = Number(ValueString.substring(0, 4))
    return `${eight}万`
  } else {
    var night = Number(ValueString.substr(0, 1))
    return `${night}亿`
  }
})
