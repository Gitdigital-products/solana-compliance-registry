package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/go/route-packet", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "Go backend routed packet successfully")
    })

    http.ListenAndServe(":8080", nil)
}
