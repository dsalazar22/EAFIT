// let info = require('../../static/syncboxvars')
// import json from '../assets/vars.json'
import axios from 'axios'
var InfoConfig = {
    host: function()
    {
        let hst = window.location.hostname
        if (JSON.parse(localStorage.getItem('syncbox.cloud')) != null)
            axios.get('http://' + hst + '/datacontroller' + 'currentUser/' + 
                JSON.parse(localStorage.getItem('syncbox.cloud')).token).then(response =>{
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
        return `http://`+window.location.hostname+`/datacontrollerloginx/`
    }
}


let host = InfoConfig.host()

export {host, InfoConfig}


