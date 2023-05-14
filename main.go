package main

import (
	"bytes"
	"encoding/json"
	"fmt"
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
	http.HandleFunc("/romanised.js", handleJS)
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
        <style>
            #search-results {
                font-family: 'Mukta';
            }
        </style>
    </head>

    <body>
        <form>
            <input class="searchInput" type="text" name="searchquery" />
        </form>

        <p class="summary"></p>
        <section id="search-results"></section>
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


        searchInput.addEventListener("keyup", (e) => {
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
<span>You searched: guithe</span>
<ul>
    <li>
        <p>Word: Aa</p>
        <p> Definitions: </p>
        <ul>
            <li>
                <p>Grammar: na</p>
                <ul>
                    <p> Senses: </p>
                    <li>1 </li>
                    <li>2 </li>
                    <li>3 </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
`

func handleSearch(list []string, o []obj) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		query := r.URL.Query().Get("searchquery")
		if query == "" {
			return
		}
		b := &bytes.Buffer{}
		fmt.Fprintf(b, "<p>You searched: %s<p>", query)
		matches := fuzzy.RankFind(query, list)
		if len(matches) == 0 {
			fmt.Fprintln(w, "No results")
			return
		}
		sort.Sort(matches)

		if len(matches) > 25 {
			matches = matches[:25]
		}
		for _, match := range matches {
			m := o[match.OriginalIndex]
			fmt.Fprint(w, m)
			fmt.Fprintf(w, "\n-------------\n")
		}

		end := time.Now()
		elapsed := end.Sub(start)
		log.Printf("search for %s took %s", query, elapsed)
	}
}

func handleJS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "text/javascript")
	f, err := os.Open("romanised.js")
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}
	io.Copy(w, f)
}
