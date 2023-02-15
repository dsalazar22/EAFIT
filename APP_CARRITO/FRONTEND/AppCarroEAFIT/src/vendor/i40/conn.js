// let info = require('../../static/syncboxvars')
// import json from '../assets/vars.json'
import axios from 'axios'
const protocolo = 'http'
var InfoConfig = {
    host: function()
    {
        // let hst = "ingeproductos.syncbox.cloud"
        let hst = window.location.hostname
        // let hst = "192.168.1.208"
        // let hst = "10.10.1.251"
        // let hst = "10.0.0.23"
        // let hst = "10.10.1.134"
        // let hst = "10.1.1.11"
        // let hst = "172.16.25.5"
        //  let hst = "192.168.115.85"
        // let hst = "192.168.115.136"
        // let hst = "192.168.25.51"
        // let hst = "192.168.20.32"
        // let hst = "192.168.80.53"
        // let hst = "192.168.0.232"
        // let hst = "192.168.10.198"
        if (JSON.parse(localStorage.getItem('syncbox.cloud')) != null)
            axios.post(protocolo+'://' + hst + '/datacontroller' + 'currentUser', JSON.parse(localStorage.getItem('syncbox.cloud')).token).then(response =>{
                // console.log(response)
            }).catch(e => {
                localStorage.removeItem('syncbox.cloud')
                this.$router.push(this.$route.query.redirect || '/login')
          })
        else{
            localStorage.removeItem('syncbox.cloud')
            // this.$router.push(this.$route.query.redirect || '/login')
        }
        return hst
    },

    login: function()
    {
        // return protocolo+`://`+"ingeproductos.syncbox.cloud"+`/datacontrollerloginx/`
        return protocolo+`://`+window.location.hostname+`/datacontrollerloginx/`
        // return protocolo+`://`+"192.168.1.208"+`/datacontrollerloginx/`
        // return protocolo+`://`+"10.10.1.251"+`/datacontrollerloginx/`
        // return protocolo+`://`+"10.0.0.23"+`/datacontrollerloginx/`
        // return protocolo+`://`+"10.10.1.134"+`/datacontrollerloginx/`
        // return protocolo+`://`+"10.1.1.11"+`/datacontrollerloginx/`
        // return protocolo+`://`+"172.16.25.5"+`/datacontrollerloginx/`
        //  return protocolo+`://`+"192.168.115.85"+`/datacontrollerloginx/`
        // return protocolo+`://`+"192.168.115.136"+`/datacontrollerloginx/`
        // return protocolo+`://`+"192.168.25.51"+`/datacontrollerloginx/`
        // return protocolo+`://`+"192.168.20.32"+`/datacontrollerloginx/`
        // return protocolo+`://`+"192.168.80.53"+`/datacontrollerloginx/`
        // return protocolo+`://`+"192.168.0.232"+`/datacontrollerloginx/`
        // return protocolo+`://`+"192.168.10.198"+`/datacontrollerloginx/` 810758535
    }
}


let host = InfoConfig.host()
// let host = '192.168.115.130'
// let host = '10.50.0.134'
// let host = '10.1.1.11'
// let host = '10.1.1.10'
// let host = window.location.hostname
// let host = '127.0.0.1:8080'
// let host = '192.168.25.51'
// let datacontroller = "http://192.168.115.130:1900/"
// let apirealtime =  "http://127.0.0.1:2200/"
// "apiconnection": "http://192.168.115.130:1800/"

let datacontroller = protocolo+'://' + host + '/datacontroller'
let apiconnection = protocolo+'://' + host + '/apiconnectionrt'
let apirealtime = protocolo+'://' + host + '/apirealtimert'
let apirundb = protocolo+'://' + host + '/apirundb'

// let datacontroller = 'http://' + host + ':1900/'
// let apiconnection = 'http://' + host + ':1800/'
// let apirealtime = 'http://' + host + ':2200/'

// let datacontroller = 'https://metricas.syncbox.cloud/datacontroller'
// let apiconnection = 'https://metricas.syncbox.cloud/apiconnectionrt'
// let apirealtime = 'https://metricas.syncbox.cloud/apirealtimert'

// let datacontroller = 'https://sw.syncbox.cloud/datacontroller'
// let apiconnection = 'https://sw.syncbox.cloud/apiconnectionrt'
// let apirealtime = 'https://sw.syncbox.cloud/apirealtimert'

export {datacontroller, apirealtime, apiconnection, apirundb, InfoConfig,protocolo}


