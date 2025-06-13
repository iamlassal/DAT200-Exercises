package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	index, err := os.ReadFile("index.html")
	if err != nil {
		log.Fatalln(err)
	}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, err = w.Write(index)
		if err != nil {
			log.Fatalln(err)
		}
	})

	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.ListenAndServe(":8080", nil)
}
