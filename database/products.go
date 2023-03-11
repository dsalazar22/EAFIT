package database

import (
	"SyncBoxi40/libs"
)

func GetProducts() (string, error) {

	return libs.sendDB()
}
