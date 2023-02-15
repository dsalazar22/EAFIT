import axios from 'axios'
import moment from 'moment'
import {apiconnection} from './conn'
let axiosConfig = {
  headers: {
    'Authorization': localStorage.getItem('syncbox.cloud') == null ? '' : JSON.parse(localStorage.getItem('syncbox.cloud')).token
  }
}

function getInfoWorkstation () {
  return axios.post(apiconnection + 'wapiController/' + 'info' + '/workstation', {
    code: ''
  }, axiosConfig)
}

function orderProductionController (info, action) {
  return axios.post(apiconnection + 'wapiOrdersController/' + action + '/order', {
    id: info.id,
    quantity: info.amount,
    date: moment(info.deadline).format('YYYYMMDD') + 'T00:00:00',
    isglobal: info.globalOrder,
    published: info.published,
    product: info.product,
    workstation: info.selectedCentroTrabajo != null ? info.selectedCentroTrabajo.id_workplace : 0
  }, axiosConfig)
}

function orderAvailable (info) {
  return axios.get(apiconnection + 'wapiOrdersAvailabe/' + info, axiosConfig)
}

function jobsProductionController (info, action) {
  return axios.post(apiconnection + 'jobsController/' + action, {
    jobs_id: info.id,
    amount_programmed: info.amount_programmed,
    amount_produced: info.amount_produced,
    published: info.published,
    job_status_code: info.job_status_code,
    workstation_id: info.workstation_id,
    new_workstation_id: info.new_workstation_id,
    production_order_id: info.production_order_id
  }, axiosConfig)
}

export { getInfoWorkstation, orderProductionController, jobsProductionController, orderAvailable }
