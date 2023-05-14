package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"sort"
	"time"

	"github.com/lithammer/fuzzysearch/fuzzy"
)

type obj struct {
	Word        string       `json:"word"`
	Definitions []definition `json:"definitions"`
}

type definition struct {
	Grammar   string   `json:"grammar"`
	Etymology string   `json:"etymology"`
	Senses    []string `json:"senses"`
}

func main() {
	f, err := os.Open("sabdakosh.json")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	o := []obj{}
	if err := json.NewDecoder(f).Decode(&o); err != nil {
		log.Fatal(err)
	}

	list := make([]string, len(o))
	for i, object := range o {
		list[i] = object.Word
	}

	http.HandleFunc("/", handleHome)
	http.HandleFunc("/search", handleSearch(list, o))
	http.HandleFunc("/romanised.js", handleJS())
	log.Println("server running")
	http.ListenAndServe(":3000", nil)
}

const html = `<!DOCTYPE html>
<html>
    <head>
        <title>Sabdakosh</title>
        <script src="/romanised.js"></script>
        <link 
            href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&amp;display=swap"
            rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css">
        <style>
            #search-results {
                font-family: 'Mukta';
            }
        </style>
    </head>

    <body>
    <div class="container">
        <h1>Sabdakosh</h1>
        <form>
            <input class="searchInput" type="text" name="searchquery" />
        </form>

        <p class="summary"></p>
        <section id="search-results"></section>
        </div>
    </body>
    <script>
        const searchInput = document.querySelector(".searchInput");
        const summary = document.querySelector(".summary");
        const searchResults = document.querySelector("#search-results");

        console.assert(searchInput != null);
        console.assert(summary != null);
        console.assert(searchResults != null);

        const debounce = (cb, delay = 800) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                cb(...args);
                }, delay);
            }
        }

        const fetchResults = debounce(query => {
            fetch("/search?" + new URLSearchParams({
                searchquery: query,
            }))
            .then(res => res.text())
            .then(text => {
                searchResults.innerHTML = text;
            });
        });

        searchInput.addEventListener("input", (e) => {
            convertedText = convert(e.target.value);
            summary.innerText = "You searched: " + convertedText;
            fetchResults(convertedText);
        });
    </script>
</html>
`

func handleHome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, html)
}

const response = `
<div>
    {{ range . }}
    <div>
        <h3>{{ .Word }}</h3>
        <div  style="margin-left: 2rem">
        {{ range .Definitions }}
            <small> {{ .Grammar }} </small>
            <small style="margin-left: 1rem"> {{ .Etymology }} </small>
            {{ range .Senses }}
                <p> {{ . }} </p>
            {{ end }}
        {{ end }}
        </div>
    <div>
    {{ end }}
    <div>
</div>
`

func handleSearch(list []string, o []obj) http.HandlerFunc {
	tmpl := template.Must(template.New("matches").Parse(response))
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		query := r.URL.Query().Get("searchquery")
		if query == "" {
			return
		}
		matches := fuzzy.RankFind(query, list)
		if len(matches) == 0 {
			fmt.Fprintln(w, "No results")
			return
		}
		sort.Sort(matches)

		if len(matches) > 25 {
			matches = matches[:25]
		}
		data := make([]obj, len(matches))
		for i, match := range matches {
			data[i] = o[match.OriginalIndex]
		}
		tmpl.Execute(w, data)

		end := time.Now()
		elapsed := end.Sub(start)
		log.Printf("search for %s took %s", query, elapsed)
	}
}

func handleJS() http.HandlerFunc {
	f, err := os.Open("romanised.js")
	if err != nil {
		log.Println(err)
		return func(w http.ResponseWriter, r *http.Request) {
			http.Error(w, "internal server error", http.StatusInternalServerError)
		}
	}
	defer f.Close()
	b, err := io.ReadAll(f)
	if err != nil {
		log.Println(err)
		return func(w http.ResponseWriter, r *http.Request) {
			http.Error(w, "internal server error", http.StatusInternalServerError)
		}
	}
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("content-type", "text/javascript")
		w.Write(b)
	}
}
