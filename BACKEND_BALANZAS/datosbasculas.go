package main

import (
	"fmt"

	"github.com/go-redis/redis"
)

func RedisConnect(dbNew int) *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "192.168.25.52:6379",
		Password: "",
		DB:       dbNew,
	})

	return client
}

func SetInfoBascula(ip, info string) {
	fmt.Println(ip, info)
	red := RedisConnect(0)
	defer red.Close()
	red.HSet("infowg", ip, info)
}

func GetInfoBascula(ip string) string {
	red := RedisConnect(0)
	defer red.Close()
	return red.HGet("infowg", ip).Val()
}
