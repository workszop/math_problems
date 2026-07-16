const problemsPl = [
  {
    id: "fence",
    emoji: "🎨",
    title: "Dylemat z płotem",
    tag: "brakujący pomiar",
    teaser: "Trzeba pomalować 32-metrowy płot, ale brakuje jednego ważnego pomiaru.",
    scenario: "Płot ma 32 metry długości. Chcesz oszacować, ile farby potrzeba na jedną stronę, ale nikt nie zmierzył jego wysokości.",
    gapQuestion: "Który brakujący pomiar może sprawić, że dwie rozsądne odpowiedzi będą bardzo różne?",
    nudge: "Wyobraź sobie niski płotek ogrodowy i wysoki płot zapewniający prywatność. Czy potrzeba na nie tyle samo farby?",
    planQuestion: "Jak możesz zdobyć, oszacować albo bezpiecznie uwzględnić brakującą informację?",
    testQuestion: "Sprawdź dwie wiarygodne wysokości płotu. Jaką powierzchnię do pomalowania daje każdy model?",
    reflectQuestion: "Co teraz zalecasz i co trzeba sprawdzić przed zakupem farby?",
    gapWords: ["wysokość", "wysoki", "metr", "zmier"]
  },
  {
    id: "road-trip",
    emoji: "🚗",
    title: "Czas podróży",
    tag: "zmienne warunki",
    teaser: "Sama odległość nie wystarczy, aby dokładnie przewidzieć godzinę przyjazdu.",
    scenario: "Twoja rodzina zna długość trasy. Musisz przewidzieć godzinę przyjazdu, ale natężenie ruchu, prędkość i przerwy na przekąski są niepewne.",
    gapQuestion: "Od czego oprócz długości trasy zależy czas podróży?",
    nudge: "Wyobraź sobie tę samą podróż w niedzielę rano i w piątkowych godzinach szczytu. Co się zmienia?",
    planQuestion: "Które niewiadome zmierzysz, sprawdzisz lub zastąpisz rozsądnymi założeniami?",
    testQuestion: "Zbuduj model płynnej podróży i model wolniejszej podróży. Jak bardzo różnią się godziny przyjazdu?",
    reflectQuestion: "Jak uczciwie podasz przedział czasu przyjazdu zamiast jednej dokładnej godziny?",
    gapWords: ["prędkość", "ruch", "przerw", "postój", "czas"]
  },
  {
    id: "farm",
    emoji: "🐔",
    title: "Ile nóg na farmie?",
    tag: "wiele kombinacji",
    teaser: "Tę samą sumę może tworzyć wiele różnych grup zwierząt.",
    scenario: "Kury, kozy i owce na farmie mają razem 100 nóg. Znajdź możliwe grupy zwierząt pasujące do tej informacji.",
    gapQuestion: "Dlaczego łączna liczba nóg nie pozwala ustalić jednej dokładnej liczby zwierząt każdego gatunku?",
    nudge: "Kozy i owce mają tyle samo nóg. Jaka dodatkowa informacja pomogłaby je rozróżnić?",
    planQuestion: "Jak utworzysz i zapiszesz różne możliwości, nie udając, że istnieje tylko jedna?",
    testQuestion: "Znajdź dwie naprawdę różne grupy, które mają łącznie po 100 nóg.",
    reflectQuestion: "Jaka dodatkowa wskazówka najbardziej ograniczyłaby liczbę możliwości i dlaczego?",
    gapWords: ["tyle samo", "koz", "owiec", "liczb", "razem", "wiele"]
  },
  {
    id: "odd-shape",
    emoji: "📐",
    title: "Pomiar nietypowej przestrzeni",
    tag: "modelowanie kształtu",
    teaser: "Prawdziwy pokój lub ogród rzadko jest idealnym prostokątem z podręcznika.",
    scenario: "Musisz obliczyć powierzchnię pokoju lub podwórka o nietypowym kształcie. Jego obrys ma załamania i ukośne krawędzie zamiast jednego prostokąta.",
    gapQuestion: "Co musisz zobaczyć lub zmierzyć, zanim obliczenie pola będzie miało sens?",
    nudge: "Czy dwa zupełnie różne obrysy można nazwać „nietypowymi”? Co powinien pokazywać użyteczny szkic?",
    planQuestion: "Jak uprościsz kształt, aby Twoje oszacowanie nadal było użyteczne?",
    testQuestion: "Wypróbuj dwa modele, na przykład podział na figury i siatkę kwadratów. Czy dają podobne oszacowania?",
    reflectQuestion: "Gdzie Twój model jest najmniej dokładny i czy ma to znaczenie przy podejmowaniu decyzji?",
    gapWords: ["kształt", "długość", "bok", "zmier", "szkic", "wymiar"]
  },
  {
    id: "fundraiser",
    emoji: "🍉",
    title: "Poczęstunek na zbiórce",
    tag: "określanie sukcesu",
    teaser: "Szybka kolejka zależy od liczby osób, miejsca i znaczenia słowa „szybko”.",
    scenario: "Rozstawiasz ciastka, kubeczki z owocami i lemoniadę podczas zbiórki. Chcesz, aby każdy mógł szybko wziąć poczęstunek.",
    gapQuestion: "Co trzeba wiedzieć, zanim uznasz jedno ustawienie za lepsze od drugiego?",
    nudge: "Porównaj pięciu gości z pięćdziesięcioma oraz mały stolik z całym korytarzem.",
    planQuestion: "Co policzysz, zmierzysz w czasie lub założysz, aby dało się sprawdzić, co znaczy „szybko”?",
    testQuestion: "Porównaj dwa ustawienia podczas spokojnej chwili i dużego tłoku. Gdzie powstaje zator?",
    reflectQuestion: "Które ustawienie wybierasz i przy jakiej liczbie osób lub dostępnej przestrzeni?",
    gapWords: ["osób", "gości", "miejsce", "stolik", "czas", "szyb", "kolejk"]
  },
  {
    id: "snack-budget",
    emoji: "🛒",
    title: "Budżet 30 dolarów na przekąski",
    tag: "potrzeby i kompromisy",
    teaser: "Znamy ceny, ale nie liczbę uczestników ani ich upodobań.",
    scenario: "Twoja klasa ma 30 dolarów na przyjęcie. Chipsy kosztują 3 dolary, napój gazowany 2, ciastka 4, a woda 1. Nie wiesz dokładnie, kto przyjdzie ani co lubi.",
    gapQuestion: "Które niewiadome mogą zmienić dobrą listę zakupów w złą?",
    nudge: "Tani plan może zawieść, jeśli nie wystarczy dla wszystkich albo nikt nie zechce tego, co kupisz.",
    planQuestion: "Jak Twój plan pogodzi różnorodność, sprawiedliwy podział, koszt i niepewność?",
    testQuestion: "Sprawdź listę zakupów dla dwóch różnych założeń o liczbie lub upodobaniach gości. Czego zabraknie?",
    reflectQuestion: "Co kupisz teraz i jaka informacja skłoniłaby Cię do zmiany listy?",
    gapWords: ["osób", "koleż", "przyjd", "lubi", "upodob", "wystarcz", "ile"]
  },
  {
    id: "carnival",
    emoji: "🎟️",
    title: "Cena gry na festynie",
    tag: "równowaga systemu",
    teaser: "Cena gry, jej trudność i zapas nagród wpływają na siebie nawzajem.",
    scenario: "Ustalasz cenę gry festynowej z małymi zabawkami jako nagrodami. Chcesz, aby nagrody nie skończyły się zbyt wcześnie, ale też aby nie zostało ich zbyt wiele.",
    gapQuestion: "Jakich faktów o graczach, nagrodach i grze brakuje do podjęcia decyzji?",
    nudge: "Liczba grających nie jest tym samym co liczba zwycięzców. Co wpływa na obie te liczby?",
    planQuestion: "Jak ustalisz początkową regułę i będziesz ją poprawiać, gdy pojawią się prawdziwi gracze?",
    testQuestion: "Sprawdź wariant z dużą liczbą graczy i częstymi wygranymi oraz spokojny wariant z rzadkimi wygranymi. Co dzieje się z nagrodami?",
    reflectQuestion: "Jaką cenę lub regułę początkową potrafisz uzasadnić i kiedy należy ją zmienić?",
    gapWords: ["gracz", "dzieci", "nagród", "wygra", "szans", "zabawk", "trudność"]
  },
  {
    id: "birdhouse",
    emoji: "🐦",
    title: "Projekt budki dla ptaków",
    tag: "od 2D do 3D",
    teaser: "Widok z przodu nie określa każdego elementu trójwymiarowego przedmiotu.",
    scenario: "Rysunek podaje wysokość i szerokość budki dla ptaków. Musisz zdecydować, jak przyciąć każdy kawałek drewna potrzebny do jej zbudowania.",
    gapQuestion: "Jakie wymiary i szczegóły konstrukcji są ukryte na płaskim rysunku?",
    nudge: "Czy wysokość i szerokość mówią cokolwiek o głębokości, wystającym dachu, grubości drewna lub sposobie łączenia części?",
    planQuestion: "Jaki rysunek, pomiar lub mały model pomoże uniknąć kosztownych błędów przy cięciu?",
    testQuestion: "Porównaj dwie możliwe głębokości lub konstrukcje dachu. Jak każda z nich zmienia listę elementów?",
    reflectQuestion: "Które decyzje można bezpiecznie podjąć teraz, a które wymagają nowego pomiaru?",
    gapWords: ["głębokość", "dach", "grubo", "łącz", "bok", "pomiar"]
  },
  {
    id: "cookies",
    emoji: "🍪",
    title: "Etykieta na słoiku z ciastkami",
    tag: "uważne czytanie",
    teaser: "Proporcja wygląda na dokładną, dopóki nie zauważysz, czego etykieta nie mówi.",
    scenario: "Na etykiecie słoika napisano: „24 ciastka. Ciastek czekoladowych jest dwa razy więcej niż owsianych”. Nie podano, czy w słoiku są tylko te dwa rodzaje.",
    gapQuestion: "Jakie niewypowiedziane założenie prowadzi do znajomej, zgrabnej odpowiedzi?",
    nudge: "Czy etykieta nadal może mówić prawdę, jeśli cztery ciastka są imbirowe? Uważnie sprawdź sumy.",
    planQuestion: "Jak oddzielisz to, co etykieta gwarantuje, od tego, co tylko zakładasz?",
    testQuestion: "Zbuduj model z dwoma rodzajami ciastek oraz model z dodatkowym rodzajem. Czy oba pasują do słów na etykiecie?",
    reflectQuestion: "Jakiej odpowiedzi lub zakresu odpowiedzi możesz bronić bez wymyślania dodatkowych faktów?",
    gapWords: ["tylko", "rodzaj", "inne", "trzeci", "zakład", "założ"]
  },
  {
    id: "garden",
    emoji: "🌼",
    title: "Geometria ogrodu",
    tag: "niejednoznaczny opis",
    teaser: "„Okrągła rabata w rogu” może opisywać więcej niż jeden kształt.",
    scenario: "W rogu prostokątnego ogrodu znajduje się okrągła rabata kwiatowa. Oszacuj, ile miejsca pozostaje na warzywa.",
    gapQuestion: "Jakie pomiary oraz jakie znaczenie słów „w rogu” trzeba wyjaśnić?",
    nudge: "Czy rabata ma kształt koła dotykającego rogu, ćwiartki koła wyciętej w rogu, czy jeszcze innej figury?",
    planQuestion: "Jaki rysunek i założenia sprawią, że Twój sposób obliczania powierzchni będzie zrozumiały dla innej osoby?",
    testQuestion: "Użyj tych samych wymiarów ogrodu i dwóch interpretacji rabaty. Porównaj pozostałą powierzchnię.",
    reflectQuestion: "Który wynik podasz i jak zaznaczysz założenia, od których zależy?",
    gapWords: ["długość", "szerokość", "promień", "koło", "ćwiart", "kształt", "zmier"]
  },
  {
    id: "faucet",
    emoji: "💧",
    title: "Kropla po kropli",
    tag: "pomiar i skalowanie",
    teaser: "Krótka obserwacja pozwala oszacować całą dobę, ale tempo może się zmieniać.",
    scenario: "Kran kapie przez cały dzień. Za pomocą zwykłych domowych przedmiotów oszacuj, ile wody marnuje się w ciągu 24 godzin.",
    gapQuestion: "Jaki krótki pomiar może zastąpić całodzienne obserwowanie każdej kropli?",
    nudge: "Możesz mierzyć liczbę kropli, czas albo zebraną objętość. Które połączenie pozwoli obliczyć tempo?",
    planQuestion: "Jak długo będziesz obserwować i jak uwzględnisz nierówne tempo kapania?",
    testQuestion: "Na podstawie wolniejszego i szybszego zmierzonego tempa oblicz ilość wody dla całej doby. Jak szeroki jest przedział oszacowania?",
    reflectQuestion: "Jak dokładne powinno być Twoje stwierdzenie i co jutro może zmienić wynik?",
    gapWords: ["czas", "objętość", "kubek", "tempo", "zmier", "kropl", "zbier"]
  },
  {
    id: "buses",
    emoji: "🚌",
    title: "Tajemnica autobusów",
    tag: "za mało danych",
    teaser: "Trzy pełne autobusy i łączna liczba uczniów nadal dopuszczają wiele pojemności.",
    scenario: "Trzy szkolne autobusy różnej wielkości są pełne. Łącznie jadą nimi 150 uczniów. Oszacuj, ilu uczniów jest w każdym autobusie.",
    gapQuestion: "Dlaczego informacje „różnej wielkości”, „pełne” i suma 150 nadal nie wyznaczają trzech dokładnych liczb?",
    nudge: "Ile trójek różnych dodatnich liczb może dawać w sumie 150? Jaki zakres jest wiarygodny w prawdziwym świecie?",
    planQuestion: "Jakich prawdziwych informacji o autobusach lub rozsądnych ograniczeń użyjesz, aby zawęzić możliwości?",
    testQuestion: "Znajdź dwa wiarygodne zestawy pojemności, które dają łącznie 150.",
    reflectQuestion: "Co możesz stwierdzić na pewno i jaka dodatkowa wskazówka byłaby najbardziej użyteczna?",
    gapWords: ["wiele", "pojemność", "wielkość", "liczb", "kombinac", "suma", "niewiad"]
  },
  {
    id: "candy",
    emoji: "🍬",
    title: "Szacowanie cukierków w słoiku",
    tag: "próbka i oszacowanie",
    teaser: "To, co widać przez szkło, może nie przedstawiać całej zawartości słoika.",
    scenario: "W słoiku jest 50 lizaków, czekoladek i żelków. Nie możesz liczyć ich pojedynczo, ale chcesz oszacować liczbę słodyczy każdego rodzaju.",
    gapQuestion: "Dlaczego cukierki widoczne z przodu mogą prowadzić do mylnego oszacowania?",
    nudge: "Duże słodycze, jaskrawe opakowania i cukierki przy szkle mogą wydawać się liczniejsze, niż są naprawdę.",
    planQuestion: "Jak pobierzesz uczciwą próbkę lub wykorzystasz inną mierzalną wskazówkę?",
    testQuestion: "Użyj dwóch różnych próbek lub sposobów oglądania. Jak bardzo zmieniają się Twoje oszacowania?",
    reflectQuestion: "Jaki zakres byłby uczciwy i jak bardzo ufasz swojemu oszacowaniu?",
    gapWords: ["przód", "wielkość", "próbk", "widoc", "miesz", "waga", "myl"]
  }
];

const problemsEn = [
  {
    id: "fence",
    emoji: "🎨",
    title: "The Fence Dilemma",
    tag: "missing measurement",
    teaser: "A 32-metre fence needs paint, but one important measurement is missing.",
    scenario: "A fence is 32 metres long. You want to estimate how much paint is needed for one side, but nobody measured its height.",
    gapQuestion: "Which missing measurement could make two sensible answers very different?",
    nudge: "Picture a low garden fence and a tall privacy fence. Would they need the same amount of paint?",
    planQuestion: "How could you get, estimate, or safely allow for the missing information?",
    testQuestion: "Try two believable fence heights. What paint area does each model give?",
    reflectQuestion: "What would you recommend now, and what should be checked before buying paint?",
    gapWords: ["height", "tall", "metre", "meter"]
  },
  {
    id: "road-trip",
    emoji: "🚗",
    title: "Road Trip Time",
    tag: "changing conditions",
    teaser: "Distance alone cannot tell a family exactly when they will arrive.",
    scenario: "Your family knows the route distance. You need to predict the arrival time, but traffic, speed, and snack breaks are still uncertain.",
    gapQuestion: "What does the clock depend on besides the route distance?",
    nudge: "Imagine the same trip early on Sunday and during Friday rush hour. What changes?",
    planQuestion: "Which uncertainties will you measure, look up, or turn into reasonable assumptions?",
    testQuestion: "Build a smooth-trip model and a slower-trip model. How far apart are the arrival times?",
    reflectQuestion: "How would you report an honest arrival window instead of one exact time?",
    gapWords: ["speed", "traffic", "break", "stop", "time"]
  },
  {
    id: "farm",
    emoji: "🐔",
    title: "Farm Leg Count",
    tag: "many combinations",
    teaser: "One total can be made by many different groups of animals.",
    scenario: "Chickens, goats, and sheep on a farm have 100 legs altogether. Find possible groups of animals that fit the clue.",
    gapQuestion: "Why can the leg total not tell you one exact number of each animal?",
    nudge: "Goats and sheep contribute the same number of legs. What clue would help tell them apart?",
    planQuestion: "How will you generate possibilities and keep track without claiming there is only one?",
    testQuestion: "Find two genuinely different groups that both total 100 legs.",
    reflectQuestion: "What extra clue would narrow the possibilities most, and why?",
    gapWords: ["same", "goat", "sheep", "number", "total", "many"]
  },
  {
    id: "odd-shape",
    emoji: "📐",
    title: "Measuring an Odd Space",
    tag: "model the shape",
    teaser: "A real room or yard rarely matches a perfect textbook rectangle.",
    scenario: "You need the area of an oddly shaped room or backyard. It has bends and slanted edges rather than one neat rectangular outline.",
    gapQuestion: "What would you need to observe or measure before an area calculation means anything?",
    nudge: "Could two very different outlines both be described as “oddly shaped”? What would a useful sketch show?",
    planQuestion: "How will you simplify the shape while keeping your estimate useful?",
    testQuestion: "Try two models—for example, splitting shapes and using a grid. Do they give close estimates?",
    reflectQuestion: "Where is your model least accurate, and how much does that matter for the real decision?",
    gapWords: ["shape", "length", "side", "measure", "sketch", "dimension"]
  },
  {
    id: "fundraiser",
    emoji: "🍉",
    title: "Fundraiser Feast",
    tag: "define success",
    teaser: "A quick snack line depends on people, space, and what “quick” means.",
    scenario: "You are arranging cookies, fruit cups, and lemonade at a fundraiser so everyone can get a treat quickly.",
    gapQuestion: "What do you need to know before deciding that one arrangement is better?",
    nudge: "Think about five visitors versus fifty, and one small table versus a whole hallway.",
    planQuestion: "What will you count, time, or assume so that “quickly” becomes testable?",
    testQuestion: "Compare two layouts under a quiet moment and a busy rush. What bottleneck appears?",
    reflectQuestion: "Which layout would you choose, and under what crowd or space conditions?",
    gapWords: ["people", "visitor", "space", "table", "time", "quick", "line"]
  },
  {
    id: "snack-budget",
    emoji: "🛒",
    title: "$30 Snack Budget",
    tag: "needs and trade-offs",
    teaser: "Prices are known, but attendance and preferences are not.",
    scenario: "Your class has $30 for a party. Chips cost $3, soda $2, cookies $4, and water $1. You do not know exactly who will come or what they prefer.",
    gapQuestion: "Which unknowns could turn a good shopping list into a poor one?",
    nudge: "A cheap plan can still fail if there is not enough for everyone—or if nobody wants what you bought.",
    planQuestion: "How will your plan balance variety, fairness, cost, and uncertainty?",
    testQuestion: "Test your shopping list with two different attendance or preference guesses. What runs out?",
    reflectQuestion: "What should you buy now, and what fact would make you change the list?",
    gapWords: ["people", "friend", "attend", "like", "prefer", "enough", "how many"]
  },
  {
    id: "carnival",
    emoji: "🎟️",
    title: "Carnival Ticket Price",
    tag: "balance a system",
    teaser: "Ticket price, game difficulty, and prize supply affect one another.",
    scenario: "You are pricing a carnival game with small toy prizes. You want prizes to last without leaving a huge pile at the end.",
    gapQuestion: "What facts about players, prizes, and the game are missing from this decision?",
    nudge: "The number who play is not the same as the number who win. What controls both?",
    planQuestion: "How could you set a starting rule and adjust it as real players arrive?",
    testQuestion: "Try a busy/high-win scenario and a quiet/low-win scenario. What happens to the prizes?",
    reflectQuestion: "What starting price or rule is defensible, and when should it change?",
    gapWords: ["player", "kid", "prize", "win", "chance", "toy", "difficulty"]
  },
  {
    id: "birdhouse",
    emoji: "🐦",
    title: "Birdhouse Blueprint",
    tag: "2D to 3D",
    teaser: "A front-view picture does not specify every piece of a 3D object.",
    scenario: "A picture gives a birdhouse's height and width. You must decide how long to cut every piece of wood to build it.",
    gapQuestion: "What dimensions and construction details are hidden by the flat picture?",
    nudge: "Can height and width tell you the depth, roof overhang, wood thickness, or how pieces join?",
    planQuestion: "What drawing, measurements, or small model would prevent costly cuts?",
    testQuestion: "Compare two plausible depths or roof designs. How does each change the cut list?",
    reflectQuestion: "Which decisions are safe to make now, and which require a new measurement?",
    gapWords: ["depth", "roof", "thick", "join", "side", "measurement"]
  },
  {
    id: "cookies",
    emoji: "🍪",
    title: "The Cookie Label",
    tag: "question the wording",
    teaser: "A ratio looks exact—until you notice what the label never says.",
    scenario: "A jar label says: “24 cookies. Twice as many chocolate-chip as oatmeal.” It does not say whether those are the only flavours in the jar.",
    gapQuestion: "What unstated assumption produces the familiar neat answer?",
    nudge: "If four cookies were ginger, could the label still be truthful? Test the totals carefully.",
    planQuestion: "How will you separate what the label guarantees from what you are merely assuming?",
    testQuestion: "Make one model with only two flavours and another with an extra flavour. Can both fit the words?",
    reflectQuestion: "What answer—or range of answers—can you defend without inventing a fact?",
    gapWords: ["only", "flavour", "flavor", "other", "third", "assume"]
  },
  {
    id: "garden",
    emoji: "🌼",
    title: "Garden Geometry",
    tag: "ambiguous diagram",
    teaser: "“A round bed in a corner” can describe more than one shape.",
    scenario: "A rectangular garden has a round flower bed in one corner. Estimate how much space remains for vegetables.",
    gapQuestion: "Which measurements—and which meaning of “in one corner”—must be clarified?",
    nudge: "Is the flower bed a whole circle touching the corner, a quarter-circle cut from it, or something else?",
    planQuestion: "What diagram and assumptions will make your area model clear to another person?",
    testQuestion: "Use the same garden measurements with two interpretations of the flower bed. Compare the space left.",
    reflectQuestion: "Which result would you report, and how would you label its assumptions?",
    gapWords: ["length", "width", "radius", "circle", "quarter", "shape", "measure"]
  },
  {
    id: "faucet",
    emoji: "💧",
    title: "Drip, Drip, Waste",
    tag: "measure and scale",
    teaser: "A short observation can estimate a day—but the rate may change.",
    scenario: "A faucet drips all day. Estimate the water wasted in 24 hours using ordinary household tools.",
    gapQuestion: "What small measurement could stand in for watching every drip all day?",
    nudge: "You could measure drops, time, or collected volume. Which combination gives a rate?",
    planQuestion: "How long will you observe, and how will you account for an uneven drip rate?",
    testQuestion: "Scale up a slower measured rate and a faster one. How wide is your daily estimate?",
    reflectQuestion: "How precise should your claim be, and what could make tomorrow different?",
    gapWords: ["time", "volume", "cup", "rate", "measure", "drip", "collect"]
  },
  {
    id: "buses",
    emoji: "🚌",
    title: "Bus Stop Mystery",
    tag: "underdetermined total",
    teaser: "Three full buses and one student total still allow many capacities.",
    scenario: "Three school buses of different sizes are full. Together they carry 150 students. Estimate how many students are on each bus.",
    gapQuestion: "Why do “different sizes,” “full,” and a total of 150 still not fix three exact numbers?",
    nudge: "How many triples of different positive numbers can add to 150? What real-world range seems plausible?",
    planQuestion: "What real bus information or reasonable limits will you use to narrow the possibilities?",
    testQuestion: "Find two plausible capacity triples that both total 150.",
    reflectQuestion: "What can you conclude for sure, and what extra clue would be most useful?",
    gapWords: ["many", "capacity", "size", "number", "combination", "add", "unknown"]
  },
  {
    id: "candy",
    emoji: "🍬",
    title: "Candy Jar Estimate",
    tag: "sample and estimate",
    teaser: "What you can see through the glass may not represent the whole jar.",
    scenario: "A jar contains 50 lollipops, chocolates, and gummy bears. You cannot count them one by one, but you want to estimate how many of each type are inside.",
    gapQuestion: "Why might the candies visible at the front give a biased estimate?",
    nudge: "Large sweets, bright wrappers, and candies near the glass may look more common than they are.",
    planQuestion: "How could you take a fair sample or use another measurable clue?",
    testQuestion: "Use two different samples or viewing methods. How much do your estimates change?",
    reflectQuestion: "What range would be honest, and how confident are you in it?",
    gapWords: ["front", "size", "sample", "visible", "mix", "weight", "biased"]
  }
];

const stepsByLanguage = {
  pl: [{
    key: "understand",
    short: "Zrozum problem",
    title: "Zrozum problem",
    purpose: "Określ, czego dotyczy zadanie, co jest wiadome i jaki rezultat chcesz osiągnąć."
  },
  {
    key: "plan",
    short: "Opracuj plan",
    title: "Opracuj plan",
    purpose: "Wybierz sposób rozwiązania i rozważ możliwe podejścia."
  },
  {
    key: "try",
    short: "Wykonaj i sprawdź",
    title: "Wykonaj i sprawdź",
    purpose: "Zrealizuj plan, przetestuj wybrane podejścia i zweryfikuj wyniki."
  },
  {
    key: "reflect",
    short: "Przeanalizuj rozwiązanie",
    title: "Przeanalizuj rozwiązanie",
    purpose: "Oceń, jak zadanie zostało rozwiązane, czego można się z tego nauczyć i co dałoby się zrobić lepiej."
  }],
  en: [
    {
      key: "understand",
      short: "Understand",
      title: "Notice the gap",
      purpose: "Separate what the story tells you from what you still need. The missing detail is not a mistake—it is the heart of the problem."
    },
    {
      key: "plan",
      short: "Plan",
      title: "Choose how to handle it",
      purpose: "In real life you can ask, measure, estimate, or set a rule. Pick an approach and make your assumptions visible."
    },
    {
      key: "try",
      short: "Try",
      title: "Test more than one world",
      purpose: "A useful solution should survive uncertainty. Compare two believable versions of the missing information."
    },
    {
      key: "reflect",
      short: "Look back",
      title: "Make an honest claim",
      purpose: "Explain what your result means, when it works, and what new fact could change your mind."
    }
  ]
};

const ui = {
  pl: {
    pageTitle: "Laboratorium Problemów — Myśl jak Pólya",
    brand: "Laboratorium Problemów",
    homeLabel: "Strona główna Laboratorium Problemów",
    headerNote: "Prawdziwe problemy. Rozsądne założenia. Wiele dobrych odpowiedzi.",
    languageLabel: "Wybór języka",
    heroEyebrow: "Laboratorium rozwiązywania problemów dla ciekawych świata dzieci",
    heroTitle: "A jeśli brakująca informacja jest właśnie sednem?",
    heroLead: "Szkolne ćwiczenia często podają wszystkie fakty i oczekują jednej odpowiedzi. Prawdziwe problemy są inne. Tutaj uczysz się zauważać niepewność, przyjmować przemyślane założenia, sprawdzać pomysły i wyjaśniać, od czego zależy Twoja odpowiedź.",
    loopTitle: "Jak to rozwiązać?",
    loopDescriptions: [
      "Określ, czego dotyczy zadanie, co jest wiadome i jaki rezultat chcesz osiągnąć.",
      "Wybierz sposób rozwiązania i rozważ możliwe podejścia.",
      "Zrealizuj plan, przetestuj wybrane podejścia i zweryfikuj wyniki.",
      "Oceń, jak zadanie zostało rozwiązane, czego można się z tego nauczyć i co dałoby się zrobić lepiej."
    ],
    noKeyTitle: "Nie ukrywa się tutaj żaden klucz odpowiedzi.",
    noKeyText: "Gdy utkniesz, trener zada pytanie pomocnicze, ale rozumowanie nadal należy do Ciebie.",
    chooseTitle: "Wybierz problem z niepełnymi danymi",
    chooseText: "W każdej historii brakuje czegoś ważnego. Wybierz tę, która budzi Twoją ciekawość.",
    saved: "Praca zapisana ✓",
    browserSave: "Twoje odpowiedzi są zapisywane tylko w tej przeglądarce.",
    allProblems: "← Wszystkie problemy",
    yourProblem: "Problem z niepełnymi danymi",
    phasesLabel: "Etapy rozwiązywania problemu metodą Pólyi",
    phaseCount: step => `Etap ${step} z 4 — metoda Pólyi`,
    clear: "Wyczyść ten problem",
    back: "Wstecz",
    next: "Następny etap",
    seeTrail: "Zobacz tok mojego rozumowania",
    coachFooter: "Trener sprawdza, czy Twoje rozumowanie staje się jaśniejsze — nie czy pasuje do ukrytej odpowiedzi.",
    noticeLabel: "Co zauważam",
    noticePlaceholder: "Wiem, że…  Nie wiem…  To ważne, ponieważ…",
    noticeNote: "Spróbuj podać zarówno znany fakt, jak i coś, czego opis Ci nie mówi.",
    askCoach: "Poproszę trenera o podpowiedź",
    gapLabel: "Jak poradzisz sobie z luką?",
    approachLabel: "Wybierz sposób działania",
    approaches: { ask: "Zapytam kogoś", measure: "Zmierzę to", estimate: "Oszacuję to", rule: "Ustalę sprawiedliwą regułę" },
    planLabel: "Mój plan i założenia",
    planPlaceholder: "Zamierzam…  Zakładam, że…  To wydaje się rozsądne, ponieważ…",
    planNote: "Założenie nie jest faktem. Wyjaśnij, skąd się wzięło, aby ktoś inny mógł je zakwestionować lub poprawić.",
    planNudge: "Czy możesz połączyć różne sposoby? Na przykład teraz przyjmij tymczasowe oszacowanie i napisz, co zmierzysz później.",
    assumptionA: "Jedno wiarygodne założenie",
    assumptionB: "Inne wiarygodne założenie",
    tryNote: "Pokaż obliczenia, szkice opisane słowami, listy lub obserwacje — wszystko, co pozwoli sprawdzić Twoje rozumowanie.",
    tryNudge: "Niech wariant B różni się na tyle, aby naprawdę sprawdzić Twój pomysł. Jeśli oba warianty prowadzą do tej samej decyzji, Twój wniosek będzie bardziej wiarygodny mimo brakujących danych.",
    askCompare: "Poproszę trenera o podpowiedź",
    conclusionLabel: "Mój użyteczny wniosek",
    conclusionPlaceholder: "Na podstawie moich założeń zrobię…  Jeśli… się zmieni, wtedy…  Aby mieć większą pewność…",
    conclusionNote: "Dobra odpowiedź na prawdziwy problem podaje swoje warunki. „To zależy” jest początkiem — wyjaśnij, od czego.",
    conclusionNudge: "Przeczytaj wniosek tak, jakby trzeba było według niego działać jutro. Czy mówi, co zrobić, dlaczego i kiedy zalecenie może się zmienić?",
    coachAsks: "Pytanie trenera",
    needQuestion: "Poproszę o pytanie pomocnicze",
    hideQuestion: "Ukryj pytanie pomocnicze",
    wonder: "Pytanie pomocnicze:",
    possibleWorld: letter => `Możliwy wariant ${letter}`,
    assumption: "Założenie",
    follows: "Co z tego wynika?",
    workingPlaceholder: "Moje obliczenia i wynik…",
    summaryGap: "Zauważona przeze mnie luka",
    summaryPlan: "Mój plan",
    summaryWorld: letter => `Możliwy wariant ${letter}`,
    summaryConclusion: "Mój wniosek i jego warunki",
    trailEyebrow: "Nie klucz odpowiedzi, lecz zapis Twojego myślenia",
    trailTitle: "Tok mojego rozumowania",
    trailText: "Uzupełniasz brakujące informacje założeniami, porównujesz możliwości i zapisujesz wniosek tak, aby inna osoba mogła go sprawdzić.",
    notWritten: "Jeszcze nie zapisano",
    anotherProblem: "Spróbuj innego problemu z niepełnymi danymi",
    clearConfirm: "Usunąć wszystkie Twoje odpowiedzi do tego problemu?",
    coachNotices: "Podpowiedź trenera:",
    coachMessages: {
      understandShort: "Napisz trochę więcej. Podaj jeden fakt z opisu, a potem jedną rzecz, której opis nie rozstrzyga.",
      understandFound: "Udało Ci się wskazać ważną niewiadomą. Teraz zastanów się: czy zmiana tego szczegółu zmieniłaby również decyzję lub wynik?",
      understandMore: "To dobry początek. Czy potrafisz wskazać konkretny brakujący fakt, przez który dwie wiarygodne odpowiedzi mogłyby być różne?",
      planChoose: "Wybierz sposób poradzenia sobie z luką: zapytaj, zmierz, oszacuj lub ustal regułę. Potem wyjaśnij, dlaczego ten sposób pasuje.",
      planMore: approach => `Twój wybór to „${approach.toLowerCase()}”. Dodaj założenie, którego użyjesz, i wyjaśnij, dlaczego jest wiarygodne.`,
      planGood: "Jasno opisujesz plan i założenia — to ważny element rozwiązywania problemów. Jaki dowód lub pomiar może pomóc ulepszyć Twoje założenie?",
      tryMissing: "Mogę porównać warianty dopiero wtedy, gdy oba mają założenie i wynik. Uzupełnij brakującą część.",
      trySame: "Oba założenia wyglądają tak samo. Zmień wariant B na tyle, aby naprawdę poddać swój pomysł próbie.",
      tryCompare: "Teraz porównuj, nie tylko obliczaj: co pozostało takie samo, co się zmieniło i czy w obu wariantach podejmiesz tę samą decyzję?",
      reflectShort: "Zamień swoją pracę w poradę: napisz, co zrobisz, a potem podaj warunek, na którym opierasz tę decyzję.",
      reflectGood: "Twój wniosek zawiera warunki, więc nie udaje całkowitej pewności. Na koniec wskaż kolejną informację, którą warto zebrać.",
      reflectMore: "Twoje zalecenie może być użyteczne, ale jego granice są ukryte. Dodaj zdanie zaczynające się od „jeśli”, „gdy” lub „zakładając, że”."
    },
    conditionalWords: ["jeśli", "jeżeli", "gdy", "kiedy", "zależy", "zakłada", "zakres", "między", "przedział"]
  },
  en: {
    pageTitle: "Problem Lab — Think like Pólya",
    brand: "Problem Lab",
    homeLabel: "Problem Lab home",
    headerNote: "Real problems. Thoughtful guesses. Many good answers.",
    languageLabel: "Choose language",
    heroEyebrow: "A problem-solving studio for curious kids",
    heroTitle: "What if the missing clue is the point?",
    heroLead: "School exercises often give every fact and expect one answer. Real problems do not. Here, you learn to notice uncertainty, make careful assumptions, test ideas, and explain what your answer depends on.",
    loopTitle: "Pólya's thinking loop",
    loopDescriptions: ["Find the real question and the gap.", "Choose how to handle uncertainty.", "Test at least two possibilities.", "Make an honest, useful claim."],
    noKeyTitle: "No answer key is hiding here.",
    noKeyText: "The coach asks a smaller question when you are stuck, but your reasoning stays yours.",
    chooseTitle: "Choose a messy problem",
    chooseText: "Every story is missing something important. Pick one that makes you curious.",
    saved: "Work saved ✓",
    browserSave: "Your writing is saved only in this browser.",
    allProblems: "← All problems",
    yourProblem: "Your messy problem",
    phasesLabel: "Pólya problem-solving phases",
    phaseCount: step => `Pólya phase ${step} of 4`,
    clear: "Clear this problem",
    back: "Back",
    next: "Next phase",
    seeTrail: "See my reasoning trail",
    coachFooter: "The coach checks whether your reasoning is becoming clearer—not whether it matches a secret answer.",
    noticeLabel: "What I notice",
    noticePlaceholder: "I know…  I do not know…  This matters because…",
    noticeNote: "Try to name both a known fact and something the story does not tell you.",
    askCoach: "Ask the coach to respond",
    gapLabel: "How will you deal with the gap?",
    approachLabel: "Choose an approach",
    approaches: { ask: "Ask someone", measure: "Measure it", estimate: "Estimate it", rule: "Set a fair rule" },
    planLabel: "My plan and assumptions",
    planPlaceholder: "I will…  I am assuming…  That seems reasonable because…",
    planNote: "An assumption is not a fact. Say how you chose it so someone else can challenge or improve it.",
    planNudge: "Could you combine approaches? For example, make a temporary estimate now and say what you would measure later.",
    assumptionA: "One believable assumption",
    assumptionB: "A different believable assumption",
    tryNote: "Show calculations, sketches in words, lists, or observations—whatever makes your reasoning checkable.",
    tryNudge: "Make B different enough to test your idea. If both worlds produce the same decision, your solution may be robust.",
    askCompare: "Ask the coach to compare",
    conclusionLabel: "My useful conclusion",
    conclusionPlaceholder: "Based on my assumptions, I would…  If… changes, then…  To be more certain, I would…",
    conclusionNote: "A strong real-world answer includes its conditions. “It depends” is a beginning—explain what it depends on.",
    conclusionNudge: "Read your conclusion as if you had to act on it tomorrow. Does it say what to do, why, and when the advice might change?",
    coachAsks: "Pólya coach asks",
    needQuestion: "I need a smaller question",
    hideQuestion: "Hide the smaller question",
    wonder: "Try wondering:",
    possibleWorld: letter => `Possible world ${letter}`,
    assumption: "Assumption",
    follows: "What follows?",
    workingPlaceholder: "My working and result…",
    summaryGap: "The gap I noticed",
    summaryPlan: "My plan",
    summaryWorld: letter => `Possible world ${letter}`,
    summaryConclusion: "My conditional conclusion",
    trailEyebrow: "Not an answer key—a record of your thinking",
    trailTitle: "My reasoning trail",
    trailText: "You turned missing information into assumptions, compared possibilities, and made a claim someone else can inspect.",
    notWritten: "Not written yet",
    anotherProblem: "Try another messy problem",
    clearConfirm: "Clear all your writing for this problem?",
    coachNotices: "The coach notices:",
    coachMessages: {
      understandShort: "Give me a little more to think with. Name one fact from the story, then one thing the story leaves open.",
      understandFound: "You have found a useful uncertainty. Now ask: if that detail changed, would your decision or result change too?",
      understandMore: "That is a start. Can you name the particular missing fact that would make two believable answers different?",
      planChoose: "Choose how you will handle the gap: ask, measure, estimate, or set a rule. Then explain why that approach fits.",
      planMore: approach => `You chose to “${approach.toLowerCase()}.” Add the assumption you will use and why it is believable.`,
      planGood: "Your plan is visible rather than hidden—that is strong problem solving. What evidence could make your assumption better?",
      tryMissing: "I can compare only after both possible worlds have an assumption and a result. Complete the missing side.",
      trySame: "Your two assumptions look the same. Change world B enough to put your idea under a real test.",
      tryCompare: "Now compare, not just calculate: what stayed the same, what changed, and would you make the same decision in both worlds?",
      reflectShort: "Turn your work into advice: say what you would do, then name the condition that supports it.",
      reflectGood: "Your conclusion shows its conditions instead of pretending to be certain. Finish by naming the next fact you would collect.",
      reflectMore: "Your recommendation may be useful, but its limits are hidden. Add an “if,” “when,” or “assuming” statement."
    },
    conditionalWords: ["if", "when", "unless", "depend", "assuming", "range", "between"]
  }
};

const app = document.getElementById("app");
const homeLink = document.getElementById("homeLink");
const storageKey = "problem-lab-progress-v1";
const languageKey = "problem-lab-language";
let language = localStorage.getItem(languageKey) === "en" ? "en" : "pl";
let state = loadState();

function t(key) {
  return ui[language][key];
}

function getProblems() {
  return language === "pl" ? problemsPl : problemsEn;
}

function getSteps() {
  return stepsByLanguage[language];
}

function approachLabel(approach) {
  return t("approaches")[approach] || approach;
}

function updateLanguageChrome() {
  document.documentElement.lang = language;
  document.getElementById("brandName").textContent = t("brand");
  homeLink.setAttribute("aria-label", t("homeLabel"));
  document.getElementById("headerNote").textContent = t("headerNote");
  const switcher = document.getElementById("languageSwitch");
  switcher.setAttribute("aria-label", t("languageLabel"));
  switcher.querySelectorAll("[data-language]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved && typeof saved === "object"
      ? { activeProblem: null, activeStep: 0, work: {}, ...saved }
      : { activeProblem: null, activeStep: 0, work: {} };
  } catch {
    return { activeProblem: null, activeStep: 0, work: {} };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function problemWork(id) {
  const existing = state.work[id] || {};
  const approachIds = {
    "Ask someone": "ask",
    "Measure it": "measure",
    "Estimate it": "estimate",
    "Set a fair rule": "rule",
    "Zapytam kogoś": "ask",
    "Zmierzę to": "measure",
    "Oszacuję to": "estimate",
    "Ustalę sprawiedliwą regułę": "rule"
  };
  state.work[id] = {
    understand: existing.understand || "",
    approach: approachIds[existing.approach] || existing.approach || "",
    plan: existing.plan || "",
    scenarioA: { assumption: "", result: "", ...existing.scenarioA },
    scenarioB: { assumption: "", result: "", ...existing.scenarioB },
    reflect: existing.reflect || ""
  };
  return state.work[id];
}

function hasSavedWork(id) {
  const work = state.work[id];
  if (!work) return false;
  return [
    work.understand,
    work.approach,
    work.plan,
    work.scenarioA?.assumption,
    work.scenarioA?.result,
    work.scenarioB?.assumption,
    work.scenarioB?.result,
    work.reflect
  ].some(value => typeof value === "string" && value.trim());
}

function renderHome() {
  state.activeProblem = null;
  state.activeStep = 0;
  saveState();
  document.title = t("pageTitle");
  const steps = getSteps();
  const problems = getProblems();
  app.className = "shell";
  app.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${t("heroEyebrow")}</p>
        <h1>${t("heroTitle")}</h1>
        <p class="hero-lead">${t("heroLead")}</p>
      </div>
      <aside class="method-card" aria-labelledby="methodTitle">
        <h2 id="methodTitle">${t("loopTitle")}</h2>
        <ol class="method-list">
          ${steps.map((step, index) => `<li><span>${index + 1}</span><div><strong>${step.short}</strong><small>${t("loopDescriptions")[index]}</small></div></li>`).join("")}
        </ol>
      </aside>
    </section>

    <div class="intro-strip">
      <span class="spark" aria-hidden="true">✦</span>
      <div><strong>${t("noKeyTitle")}</strong><p>${t("noKeyText")}</p></div>
    </div>

    <section aria-labelledby="chooseTitle">
      <div class="section-heading">
        <h2 id="chooseTitle">${t("chooseTitle")}</h2>
        <p>${t("chooseText")}</p>
      </div>
      <div class="problem-grid">
        ${problems.map(problem => `
          <button class="problem-card" type="button" data-problem="${problem.id}">
            <span class="emoji" aria-hidden="true">${problem.emoji}</span>
            <h3>${problem.title}</h3>
            <p>${problem.teaser}</p>
            <footer><span class="tag">${problem.tag}</span>${hasSavedWork(problem.id) ? `<span class="saved">${t("saved")}</span>` : ""}</footer>
          </button>
        `).join("")}
      </div>
    </section>
    <p class="footer-note">${t("browserSave")}</p>
  `;

  app.querySelectorAll("[data-problem]").forEach(button => {
    button.addEventListener("click", () => openProblem(button.dataset.problem));
  });
}

function openProblem(id) {
  const problem = getProblems().find(item => item.id === id);
  if (!problem) return renderHome();
  state.activeProblem = id;
  saveState();
  renderWorkspace();
  app.focus();
}

function stepComplete(work, index) {
  if (index === 0) return work.understand.trim().length >= 20;
  if (index === 1) return Boolean(work.approach) && work.plan.trim().length >= 20;
  if (index === 2) return [work.scenarioA.assumption, work.scenarioA.result, work.scenarioB.assumption, work.scenarioB.result].every(value => value.trim().length >= 3);
  return work.reflect.trim().length >= 20;
}

function renderWorkspace() {
  const problem = getProblems().find(item => item.id === state.activeProblem);
  if (!problem) return renderHome();
  const work = problemWork(problem.id);
  const steps = getSteps();
  const step = steps[state.activeStep];
  document.title = `${problem.title} — ${t("brand")}`;
  app.className = "shell shell--work";
  app.innerHTML = `
    <button class="back-button" type="button" id="backHome">${t("allProblems")}</button>
    <section class="problem-banner" aria-labelledby="problemTitle">
      <span class="emoji" aria-hidden="true">${problem.emoji}</span>
      <div><p class="eyebrow">${t("yourProblem")}</p><h1 id="problemTitle">${problem.title}</h1><p>${problem.scenario}</p></div>
    </section>

    <nav class="steps" role="tablist" aria-label="${t("phasesLabel")}">
      ${steps.map((item, index) => `
        <button class="step-tab ${stepComplete(work, index) ? "is-done" : ""}" type="button" role="tab" aria-selected="${index === state.activeStep}" data-step="${index}">${index + 1}. ${item.short}</button>
      `).join("")}
    </nav>

    <section class="panel" aria-labelledby="stepTitle">
      <div class="step-kicker"><span class="step-number">${state.activeStep + 1}</span> ${t("phaseCount")(state.activeStep + 1)}</div>
      <h2 id="stepTitle">${step.title}</h2>
      <p class="step-purpose">${step.purpose}</p>
      ${renderStep(problem, work)}
      <div class="panel-actions">
        <button class="text-button" type="button" id="clearProblem">${t("clear")}</button>
        <div class="action-group">
          <button class="secondary-button" type="button" id="previousStep" ${state.activeStep === 0 ? "disabled" : ""}>${t("back")}</button>
          <button class="primary-button" type="button" id="nextStep">${state.activeStep === 3 ? t("seeTrail") : t("next")}</button>
        </div>
      </div>
    </section>
    ${state.activeStep === 3 ? renderSummary(problem, work) : ""}
    <p class="footer-note">${t("coachFooter")}</p>
  `;

  bindWorkspace(problem, work);
}

function renderStep(problem, work) {
  if (state.activeStep === 0) {
    return `
      ${coachQuestion(problem.gapQuestion)}
      <label for="understandAnswer">${t("noticeLabel")}</label>
      <textarea id="understandAnswer" data-field="understand" placeholder="${t("noticePlaceholder")}">${escapeHtml(work.understand)}</textarea>
      <p class="field-note">${t("noticeNote")}</p>
      ${nudgeBlock(problem.nudge)}
      <button class="secondary-button coach-check" type="button" data-check="understand">${t("askCoach")}</button>
      <div id="coachResponse" aria-live="polite"></div>
    `;
  }

  if (state.activeStep === 1) {
    return `
      ${coachQuestion(problem.planQuestion)}
      <label>${t("gapLabel")}</label>
      <div class="approach-grid" role="group" aria-label="${t("approachLabel")}">
        ${Object.entries(t("approaches")).map(([id, label]) => `
          <button type="button" class="approach-button ${work.approach === id ? "is-selected" : ""}" data-approach="${id}" aria-pressed="${work.approach === id}">${label}</button>
        `).join("")}
      </div>
      <label for="planAnswer">${t("planLabel")}</label>
      <textarea id="planAnswer" data-field="plan" placeholder="${t("planPlaceholder")}">${escapeHtml(work.plan)}</textarea>
      <p class="field-note">${t("planNote")}</p>
      ${nudgeBlock(t("planNudge"))}
      <button class="secondary-button coach-check" type="button" data-check="plan">${t("askCoach")}</button>
      <div id="coachResponse" aria-live="polite"></div>
    `;
  }

  if (state.activeStep === 2) {
    return `
      ${coachQuestion(problem.testQuestion)}
      <div class="scenario-grid">
        ${scenarioCard("A", work.scenarioA, t("assumptionA"))}
        ${scenarioCard("B", work.scenarioB, t("assumptionB"))}
      </div>
      <p class="field-note">${t("tryNote")}</p>
      ${nudgeBlock(t("tryNudge"))}
      <button class="secondary-button coach-check" type="button" data-check="try">${t("askCompare")}</button>
      <div id="coachResponse" aria-live="polite"></div>
    `;
  }

  return `
    ${coachQuestion(problem.reflectQuestion)}
    <label for="reflectAnswer">${t("conclusionLabel")}</label>
    <textarea id="reflectAnswer" data-field="reflect" placeholder="${t("conclusionPlaceholder")}">${escapeHtml(work.reflect)}</textarea>
    <p class="field-note">${t("conclusionNote")}</p>
    ${nudgeBlock(t("conclusionNudge"))}
    <button class="secondary-button coach-check" type="button" data-check="reflect">${t("askCoach")}</button>
    <div id="coachResponse" aria-live="polite"></div>
  `;
}

function coachQuestion(question) {
  return `<div class="coach-card"><p class="coach-label">${t("coachAsks")}</p><p class="coach-question">${question}</p></div>`;
}

function nudgeBlock(text) {
  return `<button class="text-button nudge-toggle" type="button" aria-expanded="false">${t("needQuestion")}</button><div class="nudge" hidden><strong>${t("wonder")}</strong> ${text}</div>`;
}

function scenarioCard(letter, scenario, placeholder) {
  const key = letter === "A" ? "scenarioA" : "scenarioB";
  return `
    <div class="scenario-card">
      <h3><span class="scenario-letter">${letter}</span> ${t("possibleWorld")(letter)}</h3>
      <label for="${key}Assumption">${t("assumption")}</label>
      <input id="${key}Assumption" type="text" data-scenario="${key}" data-part="assumption" value="${escapeHtml(scenario.assumption)}" placeholder="${placeholder}">
      <label for="${key}Result">${t("follows")}</label>
      <textarea id="${key}Result" data-scenario="${key}" data-part="result" placeholder="${t("workingPlaceholder")}">${escapeHtml(scenario.result)}</textarea>
    </div>
  `;
}

function renderSummary(problem, work) {
  const items = [
    ["understand", t("summaryGap"), work.understand],
    ["plan", `${t("summaryPlan")}${work.approach ? ` — ${approachLabel(work.approach)}` : ""}`, work.plan],
    ["scenario-a", t("summaryWorld")("A"), `${work.scenarioA.assumption}\n${work.scenarioA.result}`.trim()],
    ["scenario-b", t("summaryWorld")("B"), `${work.scenarioB.assumption}\n${work.scenarioB.result}`.trim()],
    ["reflect", t("summaryConclusion"), work.reflect]
  ];
  return `
    <section class="summary-card" id="reasoningTrail" aria-labelledby="summaryTitle">
      <p class="eyebrow">${t("trailEyebrow")}</p>
      <h2 id="summaryTitle">${t("trailTitle")}</h2>
      <p>${t("trailText")}</p>
      <div class="reasoning-trail">
        ${items.map(([key, title, value]) => `<div class="trail-item"><strong>${title}</strong><p data-summary="${key}" class="${value ? "" : "empty-answer"}">${value ? escapeHtml(value) : t("notWritten")}</p></div>`).join("")}
      </div>
      <button class="secondary-button" type="button" id="chooseAnother">${t("anotherProblem")}</button>
    </section>
  `;
}

function bindWorkspace(problem, work) {
  document.getElementById("backHome").addEventListener("click", renderHome);
  document.getElementById("previousStep").addEventListener("click", () => changeStep(state.activeStep - 1));
  document.getElementById("nextStep").addEventListener("click", () => {
    if (state.activeStep < 3) changeStep(state.activeStep + 1);
    else document.getElementById("reasoningTrail").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("clearProblem").addEventListener("click", () => {
    if (window.confirm(t("clearConfirm"))) {
      delete state.work[problem.id];
      state.activeStep = 0;
      saveState();
      renderWorkspace();
    }
  });

  app.querySelectorAll("[data-step]").forEach(button => button.addEventListener("click", () => changeStep(Number(button.dataset.step))));
  app.querySelectorAll("[data-field]").forEach(field => field.addEventListener("input", event => {
    const fieldName = event.target.dataset.field;
    work[fieldName] = event.target.value;
    saveState();
    const summary = app.querySelector(`[data-summary="${fieldName}"]`);
    if (summary) {
      summary.textContent = event.target.value.trim() || t("notWritten");
      summary.classList.toggle("empty-answer", !event.target.value.trim());
    }
    refreshCompletionTabs(work);
  }));
  app.querySelectorAll("[data-scenario]").forEach(field => field.addEventListener("input", event => {
    work[event.target.dataset.scenario][event.target.dataset.part] = event.target.value;
    saveState();
    refreshCompletionTabs(work);
  }));
  app.querySelectorAll("[data-approach]").forEach(button => button.addEventListener("click", () => {
    work.approach = button.dataset.approach;
    saveState();
    app.querySelectorAll("[data-approach]").forEach(item => {
      const selected = item.dataset.approach === work.approach;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    refreshCompletionTabs(work);
  }));
  app.querySelectorAll(".nudge-toggle").forEach(button => button.addEventListener("click", () => {
    const nudge = button.nextElementSibling;
    const opening = nudge.hidden;
    nudge.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
    button.textContent = opening ? t("hideQuestion") : t("needQuestion");
  }));
  app.querySelectorAll("[data-check]").forEach(button => button.addEventListener("click", () => respondAsCoach(problem, work, button.dataset.check)));
  document.getElementById("chooseAnother")?.addEventListener("click", renderHome);
}

function refreshCompletionTabs(work) {
  app.querySelectorAll("[data-step]").forEach(button => {
    button.classList.toggle("is-done", stepComplete(work, Number(button.dataset.step)));
  });
}

function changeStep(nextStep) {
  state.activeStep = Math.max(0, Math.min(3, nextStep));
  saveState();
  renderWorkspace();
  app.focus();
}

function respondAsCoach(problem, work, phase) {
  const response = document.getElementById("coachResponse");
  const messages = t("coachMessages");
  let message;
  if (phase === "understand") {
    const answer = work.understand.trim();
    const foundGap = problem.gapWords.some(word => answer.toLowerCase().includes(word));
    message = answer.length < 20
      ? messages.understandShort
      : foundGap
        ? messages.understandFound
        : messages.understandMore;
  } else if (phase === "plan") {
    message = !work.approach
      ? messages.planChoose
      : work.plan.trim().length < 20
        ? messages.planMore(approachLabel(work.approach))
        : messages.planGood;
  } else if (phase === "try") {
    const a = `${work.scenarioA.assumption} ${work.scenarioA.result}`.trim();
    const b = `${work.scenarioB.assumption} ${work.scenarioB.result}`.trim();
    message = !a || !b
      ? messages.tryMissing
      : work.scenarioA.assumption.trim().toLowerCase() === work.scenarioB.assumption.trim().toLowerCase()
        ? messages.trySame
        : messages.tryCompare;
  } else {
    const answer = work.reflect.trim().toLowerCase();
    const conditional = t("conditionalWords").some(word => answer.includes(word));
    message = answer.length < 20
      ? messages.reflectShort
      : conditional
        ? messages.reflectGood
        : messages.reflectMore;
  }
  response.innerHTML = `<div class="coach-response"><strong>${t("coachNotices")}</strong>${message}</div>`;
}

homeLink.addEventListener("click", event => {
  event.preventDefault();
  renderHome();
  app.focus();
});

document.getElementById("languageSwitch").querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.language === language) return;
    language = button.dataset.language;
    localStorage.setItem(languageKey, language);
    updateLanguageChrome();
    if (state.activeProblem) renderWorkspace();
    else renderHome();
    app.focus();
  });
});

updateLanguageChrome();
if (state.activeProblem && getProblems().some(problem => problem.id === state.activeProblem)) renderWorkspace();
else renderHome();
