package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	gosocketio "github.com/graarh/golang-socketio"
	"github.com/graarh/golang-socketio/transport"
)

var ChannelBasculas *gosocketio.Channel

var (
	routerx *mux.Router
	Server  *gosocketio.Server
)

func LoadSocket() {
	//println("ENTRO AL LOADSOCKET")
	Server.On(gosocketio.OnConnection, func(c *gosocketio.Channel) {
		c.Join("basculas")
		fmt.Println("connected:", c.Id())

		ChannelBasculas = c

		c.Emit("connection", `{"success":true}`)
	})

	// Server.On("get-bikes-state", func(c *gosocketio.Channel, message string) {
	// 	BikeStateMessageByGUI()
	// })

	Server.On(gosocketio.OnDisconnection, func(c *gosocketio.Channel) {
		fmt.Println("Disconnected", c.Id())
		c.Leave("basculas")
	})
}

func CreateRouter() {
	routerx = mux.NewRouter()
}

func InititalizeRoutes() {
	routerx.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Request-Headers, Access-Control-Request-Method, Connection, Host, Origin, User-Agent, Referer, Cache-Control, X-header")
	})
	routerx.Handle("/socket.io/", Server)
}

func StartServer() {
	fmt.Println("Server Started at http://localhost:3333")
	log.Fatal(http.ListenAndServe(":3333",
		handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Access-Control-Allow-Origin", "Content-Type", "Authorization"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}),
			handlers.AllowedOrigins([]string{""}))(routerx)))
}

func init() {
	Server = gosocketio.NewServer(transport.GetDefaultWebsocketTransport())
	fmt.Println("Socket Inititalize...")
}
