# Laboratorium Problemów

Laboratorium Problemów to aplikacja w przeglądarce, w której dzieci rozwiązują metodą George'a Pólyi zadania z życia, celowo pozbawione części danych.

Aplikacja nie pokazuje gotowych rozwiązań i nie sprawdza jednej poprawnej liczby. Uczeń:

1. rozpoznaje, co wiadomo, a czego nie podano;
2. decyduje, czy zapytać, zmierzyć, oszacować lub ustalić regułę;
3. sprawdza dwa rozsądne warianty brakującej informacji;
4. pisze wniosek wraz z założeniami i ograniczeniami.

## Uruchomienie lokalne

Otwórz plik `index.html` w przeglądarce albo uruchom dowolny serwer plików statycznych, na przykład:

```sh
python3 -m http.server 8000
```

Następnie otwórz `http://localhost:8000`.

Postęp zapisuje się w pamięci lokalnej przeglądarki. Aplikacji nie trzeba budować ani instalować pakietów.

Interfejs jest po polsku (domyślnie) i po angielsku; przeglądarka zapamiętuje wybór `PL / EN`.

Skróty klawiszowe w widoku zadania: `←` / `→` zmiana etapu, `1`–`4` wybór etapu, `Esc` powrót do listy, `Ctrl+Enter` pytanie do trenera.

## Struktura

- `data.js` – treść zadań, etapów i interfejsu (PL i EN obok siebie w jednym obiekcie każdego zadania),
- `coach.js` – reguły trenera bez dostępu do DOM (dopasowanie rdzeni słów na początku wyrazu, więc działają polskie odmiany),
- `app.js` – renderowanie, zapis postępu i skróty; stan widoku publikuje w atrybutach `data-*` elementu `#app`,
- `tokens.css` – tokeny systemu edulab (kolory, czcionki, odstępy), `styles.css` – wygląd aplikacji zbudowany wyłącznie z tych tokenów.

## Testy

```sh
node --test tests/*.test.mjs
```

Testy nie potrzebują żadnych pakietów. GitHub Actions uruchamia je przy każdym pushu.

Strona `guide.html` zawiera polski poradnik „Jak rozwiązywać trudne zadania matematyczne?” z praktycznymi strategiami i listą kroków pomocnych, gdy uczeń utknie.
