
import axios from 'axios'
import {apirealtime, apirundb} from './conn'
let axiosConfig = {
  headers: {
    'Authorization': localStorage.getItem('syncbox.cloud') == null ? '' : JSON.parse(localStorage.getItem('syncbox.cloud')).token
  }
}

var realtime = {
  infoOEE: function (codemodule, idparent) {
    return axios.get(apirealtime + 'infoOEE/' + codemodule + '/' + idparent, axiosConfig)
  },

  infoContentOEE: function (idparent, iddetail) {
    return axios.get(apirealtime + 'infogroupOEE/' + idparent + '/' + iddetail, axiosConfig)
  },

  obteneroeeinfocomplete: function () {
    return axios.get(apirealtime + 'obteneroeeinfocomplete', axiosConfig)
  },

  getOEEGroup: function (idparent, iddetail) {
    return axios.get(apirealtime + 'getOEEGroup/' + idparent + '/' + iddetail, axiosConfig)
  },

  gettables: function () {
    return axios.get(apirealtime + 'gettables', axiosConfig)
  },

  infoContentWorkstationOEE: function (wsdetails) {
    return axios.get(apirealtime + 'getInfoWorkstation/' + wsdetails, axiosConfig)
  },

  actionProductionOrder: function (info, wscode, event) {
    let axconf = {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }
    return axios.post(apirealtime + 'wscontroller/' + wscode + '/' + event, info, axconf)
  },

  concurrentOrders: function (info, event) {
    let axconf = {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }
    return axios.post(apirealtime + 'concurrentorders/' + event, info, axconf)
  },

  apirundb: function (db, key) {
    let axconf = {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }
    return axios.get(apirundb + 'rundbbykey/' + db + '/' + key, axconf)
  },

  apihget: function (db, key) {
    let axconf = {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }
    return axios.get(apirundb + 'runhget/' + db + '/' + key, axconf)
  },

  apirunset: function (db, key,value) {
    let axconf = {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }
    return axios.get(apirundb + 'runset/' + db + '/' + key + '/' + value + '/5', axconf)
  },

  sendredis: function (db, key,column, value) {
    let axconf = {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }
    return axios.get(apirundb + 'sendhash/' + db + '/' + key +'/'+ column +'/'+ value, axconf)
  },

  sendProductionOrder: function (event, info) {
    let axconf = {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }
    return axios.post(apirealtime + 'wssendevents/' + event, info, axconf)
  },

  getReport (control, report, code, start, finish) {
    let axconf = {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }
    return axios.get(apirealtime + 'wsreportinfo/' + report + '/' + control + '/' + code + '/' + start + '/' + finish, axconf)
  },

  getStopCode: function (wscode) {
    return axios.get(apirealtime + 'getInfoOperation/' + wscode + '/' + 'stopcode', axiosConfig)
  },

  getresumen: function (wscode) {
    return axios.get(apirealtime + 'getresumen/' + wscode )
  },

  callerscontroller: function (event, info) {
    return axios.post(apirealtime + 'callerscontroller/'+event, info, axiosConfig)
  },

  getdevices: function(){
    return axios.get(apirealtime + 'getdevices' )
  },

  sendbatchprint: function(batchinfo){
    let axconf = {
      headers:{
      'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
      }
    }

    return axios.post(apirealtime + 'sendbatchprint' , batchinfo,axconf)
  },

  infoColorsOEE: function (value) {
    let color = ''
    if (value > 0 && value <= 75) {
      color = 'danger'
    } else if (value > 75 && value <= 85) {
      color = 'warning'
    } else if (value > 85 && value <= 95) {
      color = 'success'
    } else if (value > 95) {
      color = 'primary'
    } // else {
    //   color = ''
    // }
    return color
  },

  infoColorsCurrenComplete: function (value) {
    let color = ''
    if (value > 0 && value <= 75) {
      color = 'success'
    } else if (value > 75 && value <= 85) {
      color = 'warning'
    } else if (value > 85) {
      color = 'danger'
    } // else if (value > 95) {
    //   color = 'primary'
    // } // else {
    //   color = ''
    // }
    return color
  },


  infoColorsCurrenVelocity: function (value) {
    let color = ''
    if (value > 0 && value <= 75) {
      color = 'danger'
    } else if (value > 75 && value <= 85) {
      color = 'warning'
    } else if (value > 85) {
      color = 'success'
    } // else if (value > 95) {
    //   color = 'primary'
    // } // else {
    //   color = ''
    // }
    return color
  },

  infoColorsVelocity: function (value) {
    let color = ''
    if (value > 0 && value <= 75) {
      color = 'danger'
    } else if (value > 75 && value <= 85) {
      color = 'warning'
    } else if (value > 85) {
      color = 'success'
    } // else if (value > 95) {
    //   color = 'primary'
    // } // else {
    //   color = ''
    // }
    return color
  },

  infoBackgroudColorsOEE: function (value) {
    let color = ''
    if (value > 0 && value <= 65) {
      color = '#CD0000'
    } else if (value > 65 && value <= 75) {
      color = '#FF8C00'
    } else if (value > 75 && value <= 85) {
      color = '#FFD700'
    } else if (value > 85 && value <= 95) {
      color = '#40a070'
    } else if (value > 95) {
      color = '#00C5CD'
    } else {
      color = '#FFF'
    }
    return color
  },

  infoForeColorsOEE: function (value) {
    let color = ''
    if (value > 0 && value <= 65) {
      color = '#FFF'
    } else if (value > 65 && value <= 75) {
      color = '#FFF'
    } else if (value > 75 && value <= 85) {
      color = '#000'
    } else if (value > 85 && value <= 95) {
      color = '#FFF'
    } else if (value > 95) {
      color = '#40a070'
    } else {
      color = '#000'
    }
    return color
  }
}

export {
  realtime
}
