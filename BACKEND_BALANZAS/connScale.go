package main

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	gosocketio "github.com/graarh/golang-socketio"
	"github.com/graarh/golang-socketio/transport"
	"golang.org/x/net/websocket"
)

var messagestate string

func init() {
	messagestate = ""
	Server = gosocketio.NewServer(transport.GetDefaultWebsocketTransport())
	fmt.Println("Socket Inititalize...")
}

func ScaleMessage(b string) {

	//println(ChannelBasculas)
	if ChannelBasculas != nil {
		if ChannelBasculas.IsAlive() {
			for _, channel := range ChannelBasculas.List("basculas") {
				channel.Emit("get-basculas", b)
				// fmt.Println("ENVIADO POR ALGUN CAMBIO")
			}
		}
	} else {
		//fmt.Println("NO HAY CANALES PARA ENVIAR INFORMACION")
	}
}

func initWebsocketClient(ad string) {
	//fmt.Println("Entro")
	var info Scale

	//fmt.Println(ad)

	ws, err := websocket.Dial(fmt.Sprintf("ws://%s/ws", ad), "", fmt.Sprintf("http://%s/", ad))
	// fmt.Println(websocket.Dial(fmt.Sprintf("ws://%s/ws", ad), "", fmt.Sprintf("http://%s/", ad)))
	// fmt.Println("err:", err)
	// fmt.Println("ws:", ws)

	if err != nil {

	} else {
		incomingMessages := make(chan string)
		go readClientMessages(ws, incomingMessages, ad)
		// i := 0
		// for {
		select {

		case message := <-incomingMessages:

			info.Message = "INACTIVA"

			if message != "" {

				strpeso := strip(message)

				//fmt.Println("PESO:", strip(message))

				mapMutex.Lock()
				pesos[ad] = strpeso
				mapMutex.Unlock()

				info.Ip = ad
				info.Weight = strpeso
				info.UnitWeight = ""

				//fmt.Println(ad, pesos[ad])

				info.Message = "ACTIVA"
				//fmt.Println(info)

				infoUnitWeight := GetInfoBascula(ad)

				var data struct {
					Bascula    string `json:"bascula"`
					PesoUnidad string `json:"peso_unidad"`
					Producto   string `json:"product"`
				}

				json.Unmarshal([]byte(infoUnitWeight), &data)

				info.UnitWeight = data.PesoUnidad
				info.Product = data.Producto

				b, _ := json.Marshal(info)

				//ScaleMessage((string(b)))

				ScaleMessage(string(b))
				// fmt.Println("PESOS", string(b))
			}

		}

	}

	// }
}

func readClientMessages(ws *websocket.Conn, incomingMessages chan string, ad string) {

	// for {
	var message string
	// err := websocket.JSON.Receive(ws, &message)
	err := websocket.Message.Receive(ws, &message)
	// fmt.Println("err:", err)
	// fmt.Println("message:", message)
	if err != nil {

		// fmt.Printf("Error::: %s\n", err.Error())
		// fmt.Printf(message)
		// return
		time.Sleep(5 * time.Second)
		ws, _ = websocket.Dial(fmt.Sprintf("ws://%s/ws", ad), "", fmt.Sprintf("http://%s/", ad))
	} else {

	}
	incomingMessages <- strings.TrimSuffix(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(message, "ST,GS,", ""), "+", ""), "kg", ""), "=", ""), "\n")
	// fmt.Println(ad, strings.TrimSuffix(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(message, "ST,GS,", ""), "+", ""), "kg", ""), "=", ""), "\n"))
	// fmt.Println("--------------------------------------")
	// }
}

func strip(s string) string {
	//time.Sleep(1 * time.Second)
	var result strings.Builder
	for i := 0; i < len(s); i++ {
		b := s[i]
		if b == '.' ||
			('0' <= b && b <= '9') {
			result.WriteByte(b)
		}
	}
	return result.String()
}
