package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"SyncBoxi40/libs"

	"github.com/gorilla/mux"
)

var address []string
var pesos map[string]string
var mapMutex = &sync.Mutex{}
var infoScale = make([]Scale, 0)
var infowebapp []Scale

type Scale struct {
	Ip         string `json:"ip"`
	Weight     string `json:"weight"`
	Message    string `json:"Message"`
	UnitWeight string `json:"unitWeight"`
	Product    string `json:"product"`
}

// type infoScale struct {
// 	addres     string
// 	unitWeight string

// }

func alive(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,  Authorization")
	if r.Method == "GET" {

		vars := mux.Vars(r)
		number := vars["number"]

		// if err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(pesos[number]))
		// } else {
		// 	w.WriteHeader(202)
		// 	w.Write([]byte(err.Error()))
		// }

	}
}

func getinfoScale(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,  Authorization")

	var result Scale

	if r.Method == "POST" {

		body, _ := ioutil.ReadAll(r.Body)

		println("v", string(body))

		// Decodificar el cuerpo del JSON
		var data struct {
			Number string `json:"number"`
		}

		json.Unmarshal(body, &data)

		println(data.Number)

		// Acceder a los campos del JSON
		domain := getDomain(data.Number)

		if domain != "99" {

			for _, v := range address {
				if strings.Contains(v, domain) {
					result.Ip = v
				}
			}

			for ip, v := range pesos {
				if result.Ip == ip {
					result.Weight = v
					//println("rrrrrr:", result.Weight)
				}
			}

			println("peso", result.Weight)

			if result.Weight == "" {
				result.Message = "INACTIVA"
				result.Weight = "0"
			} else {
				result.Message = "ACTIVA"
			}

		} else {
			result.Message = "¡La balascula no existe, por favor valide!"
			result.Ip = "---"
			result.Weight = "---"
		}

		jsondd, _ := json.Marshal(result)

		//fmt.Println(result)
		println(string(jsondd))

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(jsondd))

	}
}
func setUnitWeight(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,  Authorization")

	//var scale Scale
	var ip string

	if r.Method == "POST" {

		body, _ := ioutil.ReadAll(r.Body)

		// Decodificar el cuerpo del JSON
		var data struct {
			Bascula    string `json:"bascula"`
			PesoUnidad string `json:"peso_unidad"`
			Producto   string `json:"product"`
		}

		json.Unmarshal(body, &data)

		//println(data.Bascula)

		// Acceder a los campos del JSON
		domain := getDomain(data.Bascula)

		//fmt.Println(domain)

		for _, v := range address {
			if strings.Contains(v, domain) {
				//v.UnitWeight = data.PesoUnidad
				ip = v
				//fmt.Println("infoScale", ip)
			}
		}

		// scale.Message = "OK"
		// scale.Product = data.Producto
		// scale.UnitWeight = data.PesoUnidad

		// b, _ := json.Marshal(scale)

		// fmt.Println(string(b))

		SetInfoBascula(ip, string(body))

		//scale := info["bascula"]
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}
}

func getDomain(number string) string {
	var domain string

	if number == "1" {
		domain = "201"
	} else if number == "2" {
		domain = "202"
	} else if number == "3" {
		domain = "203"
	} else if number == "4" {
		domain = "204"
	} else if number == "5" {
		domain = "205"
	} else if number == "6" {
		domain = "206"
	} else if number == "7" {
		domain = "207"
	} else if number == "8" {
		domain = "208"
	} else if number == "9" {
		domain = "209"
	} else if number == "10" {
		domain = "210"
	} else if number == "11" {
		domain = "211"
	} else if number == "12" {
		domain = "212"
	} else {
		domain = "99"
	}

	return domain
}

func getConn() {
	content, err := ioutil.ReadFile("app.connect")
	// var configConnection dto.ConfigConnection

	connStr := libs.ConfigConnection{
		Addr:    "192.168.115.175:5432",
		Pass:    "",
		Db:      0,
		UserURL: "http://127.0.0.1:1705",
	}
	if err != nil {
		fileConfig, _ := json.Marshal(connStr)
		ioutil.WriteFile("app.connect", fileConfig, os.FileMode(777))
	} else {
		json.Unmarshal(content, &connStr)
	}
	fmt.Println(connStr)
	libs.StrConn = connStr

}

func main() {

	pesos = make(map[string]string)

	// infoScale = append(infoScale, Scale{Ip: "192.168.25.202:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.201:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.203:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.204:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.205:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.206:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.207:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.208:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.209:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.210:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.211:6432", Weight: "", Message: "", UnitWeight: ""})
	// infoScale = append(infoScale, Scale{Ip: "192.168.25.212:6432", Weight: "", Message: "", UnitWeight: ""})

	address = append(address, "192.168.25.201:6432")
	address = append(address, "192.168.25.202:6432")
	address = append(address, "192.168.25.203:6432")
	address = append(address, "192.168.25.204:6432")
	address = append(address, "192.168.25.205:6432")
	address = append(address, "192.168.25.206:6432")
	address = append(address, "192.168.25.207:6432")
	address = append(address, "192.168.25.208:6432")
	address = append(address, "192.168.25.209:6432")
	address = append(address, "192.168.25.210:6432")
	address = append(address, "192.168.25.211:6432")
	address = append(address, "192.168.25.212:6432")

	go func() {
		for {
			for _, v := range address {
				go initWebsocketClient(v)
			}
			time.Sleep(time.Millisecond * 100)
		}
	}()

	// for _, v : = range infoScale {
	// 	go initWebsocketClient(v.Ip, v.UnitWeight)
	// }

	//initSocketIO()
	LoadSocket()
	CreateRouter()
	InititalizeRoutes()
	go StartServer()

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/getvalues/{event}", alive)

	//{event} es el numero de la balanza en orden
	router.HandleFunc("/get-info-scale", getinfoScale)

	//{event} es el json recibido con el peso unitario y el producto
	router.HandleFunc("/set-unit-weight", setUnitWeight)

	http.ListenAndServe(":3334", router)

}
