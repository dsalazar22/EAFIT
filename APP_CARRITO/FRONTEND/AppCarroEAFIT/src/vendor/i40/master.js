import axios from 'axios'
import {master} from './globals'
let axiosConfig = {
  headers: {
    'Authorization': localStorage.getItem('syncbox.cloud') == null ? '' : JSON.parse(localStorage.getItem('syncbox.cloud')).token
  }
}

var infomaster = {
  families: function (info, actions) {
    return axios.post(master + 'familiescontrol/' + actions, info, axiosConfig)
  },  
  
  lines: function (info, actions) {
    return axios.post(master + 'linescontrol/' + actions, info, axiosConfig)
  },

  supplier: function (info, id, actions) {
    return axios.post(master + 'suppliercontrol/' + actions + '/' + id, info, axiosConfig)
  },

  customers: function (info, id, actions) {
    return axios.post(master + 'customercontrol/' + actions + '/' + id, info, axiosConfig)
  },

  products: function (info, id, actions) {
    return axios.post(master + 'productscontrol/' + actions + '/' + id, info, axiosConfig)
  },

  commercialsearch: function (nit, search, actions) {
    // console.log(master + 'commercialsearch/' + actions + '/' + nit +'/'+ search)
    return axios.get(master + 'commercialsearch/' + actions + '/' + nit +'/'+ search, axiosConfig)
  },

  getproductbycode: function (code) {
    // console.log(master + 'getproductbycode/' + actions + '/' + nit +'/'+ search)
    return axios.get(master + 'getproductbycode/' + code, axiosConfig)
  },

  getcontentdownload: function (action) {
    return axios.get(master + 'getcontentdownload/' + action, axiosConfig)
  },

  plant: function (info, action) {
    return axios.post(master + 'wapiController/' + action + '/wsplant', {
      id: info.id,
      description: info.description,
      active: info.active,
      show: info.show
    }, axiosConfig)
  },

  group: function (info, action) {
    return axios.post(master + 'wapiController/' + action + '/wsgroup', {
      id: info.id,
      description: info.description,
      active: info.active,
      show: info.show
    }, axiosConfig)
  },

  workstation: function (info, action) {
    if (action === 'select') {
      return axios.post(master + 'wapiController/' + action + '/workstation', {
        code: info.codigo,
        description: info.description
      }, axiosConfig)
    } else if (action === 'select-productive') {
      return axios.post(master + 'wapiController/' + action + '/workstation', {}, axiosConfig)
    } else {
      return axios.post(master + 'wapiController/' + action + '/workstation', {
        id: info.id,
        code: info.codigo,
        description: info.description,
        code_integration: info.code_integration,
        type_id: info.selectedWorkStationType.workstation_type_id,
        plant_id: info.selectedPlant.workstation_plant_id,
        group_id: info.selectedGroup.workstation_group_id,
        cost_minute: info.cost_minute,
        cost_person_minute: info.cost_person_minute,
        active_number: info.active_number,
        concurrent_orders:info.concurrent_orders,
      }, axiosConfig)
    }
  },

  tree_workstation(){
    return axios.post(master + 'wapiController/' + 'action' + '/tree-workstation', {}, axiosConfig)
  },

  tree_workstation_capacity(){
    return axios.post(master + 'wapiController/' + 'action' + '/tree-workstation-capacity', {}, axiosConfig)
  },

  personal(info, actions) {
    return axios.post(master + 'personal/' + actions, info, axiosConfig)
  },

  scrapcode(info, actions) {
    return axios.post(master + 'scrapcode/' + actions, info, axiosConfig)
  },

  stop_code(info, actions) {
    return axios.post(master + 'stopcode/' + actions, info, axiosConfig)
  },

  stop_code_root_cause(info, actions) {
    return axios.post(master + 'stopcoderootcause/' + actions, info, axiosConfig)
  },

  callercontroll(info, actions) {
    return axios.post(master + 'callercontroll/' + actions, info, axiosConfig)
  },

  getcities() {
    return axios.get(master + 'getcities', axiosConfig)
  },

  getusers() {
    return axios.get(master + 'getusers', axiosConfig)
  },

  uploadFile: function (params, file) {
    const data = new FormData()
    data.append('file', file, file.name)
    return axios.post(master + 'contentupload/'+params, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': JSON.parse(localStorage.getItem('syncbox.cloud')).token
        }
    })
  },
}

export {
  infomaster
}