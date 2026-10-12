# Laboratorium Problemów

Laboratorium Problemów to działająca w przeglądarce aplikacja, która pomaga dzieciom stosować metodę rozwiązywania problemów George'a Pólyi do celowo niepełnych sytuacji z prawdziwego życia.

W przeciwieństwie do typowej aplikacji z ćwiczeniami nie pokazuje gotowych rozwiązań ani nie sprawdza jednej poprawnej liczby. Uczeń:

1. rozpoznaje, co wiadomo, a czego nie podano;
2. decyduje, czy zapytać, zmierzyć, oszacować lub ustalić regułę;
3. sprawdza dwa rozsądne warianty brakującej informacji;
4. formułuje użyteczny wniosek, podając swoje założenia i ograniczenia.

## Uruchomienie lokalne

Otwórz plik `index.html` w przeglądarce albo uruchom dowolny serwer plików statycznych, na przykład:

```sh
python3 -m http.server 8000
```

Następnie otwórz `http://localhost:8000`.

Postęp jest zapisywany w pamięci lokalnej przeglądarki. Aplikacja nie wymaga budowania ani instalowania pakietów.

Interfejs jest dostępny po polsku i angielsku. Polski jest językiem domyślnym, a wybór `PL / EN` jest zapamiętywany w przeglądarce.

Skróty klawiszowe w widoku zadania: `←` / `→` zmiana etapu, `1`–`4` wybór etapu, `Esc` powrót do listy, `Ctrl+Enter` pytanie do trenera.

## Struktura

- `data.js` – treść zadań, etapów i interfejsu (PL i EN obok siebie w jednym obiekcie każdego zadania),
- `coach.js` – reguły trenera bez dostępu do DOM (dopasowanie rdzeni słów na początku wyrazu, więc działają polskie odmiany),
- `app.js` – renderowanie, zapis postępu i skróty; stan widoku publikuje w atrybutach `data-*` elementu `#app`.

## Testy

```sh
node --test tests/*.test.mjs
```

Testy nie wymagają instalowania pakietów i uruchamiają się w GitHub Actions przy każdym pushu.

Strona `guide.html` zawiera polski poradnik „Jak rozwiązywać trudne zadania matematyczne?” z praktycznymi strategiami i listą kroków pomocnych, gdy uczeń utknie.
