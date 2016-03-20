# Lebensversicherungs-Check

Lebensversicherungen sind für den Laien komplizierte Finanzprodukte. Die Verträge enthalten normalerweise gleich mehrere Posten in der Kategorie "Kosten". Diese werden im Verkaufsgespräch selten direkt und ehrlich kommuniziert. In den Gesprächen denen ich beigewohnt habe, wurde immer auf die potentiellen Zinsgewinne dank Fondgebundenheit hingewiesen. Im selben Atemzug wird dann meistens auch auf die Garantie hingewiesen, dass das was man einzahlt auch *mindestens* wieder ausbezahlt wird.

Das entspricht zwar der Wahrheit, aber mir hat noch kein Versicherungsverkäufer dazu gesagt, dass das abzüglich aller Kosten gilt.

Da diese enorm sein können, zahlt es sich aus, mit den Zahlen herum zu spielen. 

Dieses Skript (und hoffentlich weitere) sind entstanden aus zwei Gründen:

* Der Notwendigkeit mit den Beitragszahlungen, Zinsen und Kosten zu spielen um sie auch richtig zu verstehen.
* Fehlendes Excel-Fu um hier ohne JS auszukommen.

## HDI Twotrust Selekt

Das erste Skript beschäftigt sich mit dem [TwoTrust Selekt-Produkt](https://www.hdi.de/multiselekt/) von HDI.

Die Grundidee ist nicht schlecht und läuft auf folgendes heraus:

* Es wird monatlich ein Beitrag bezahlt.
* Dieser Beitrag wird genutzt um einen Deckungsbeitrag zu zahlen. Der Rest wird in mehrere Index-Fonds (oder andere Fonds) investiert. Wird ein Gewinn erwirtschaftet bleibt der erhalten. Wird im nächsten Jahr nur ein Verlust erwirtschaftet, schlägt dieser nicht auf das eigene Guthaben (Summe der eingezahlten Beiträge) durch.

Schwer wird es wenn man versucht die Kostenstruktur heraus zu finden. In Online-Quellen und PDFs wird immer auf ein Beispiel verwiesen das ich nicht gefunden habe.

Daher habe ich hier die Kostenpunkte die ich in einem Vertragsvorschlag bekommen habe genommen.

Folgende Kosten fallen hier an:
* Von der Monatsrate fließen 5% an Verwaltungsgebühren ab.
* Zusätzlich bekommt der Versicherungsvertreter 6% Provision. (Diese werden in den ersten 5 Jahren bezahlt und schmälern da dementsprechend stark den gesparten Wert)
* Der Staat schneidet bei 3,86% Versicherungssteuer mit. 
* Zusätzlich wird jedes Monat noch ein Minimalzins ca. 0,041% des ersparten Guthabens abgenommen. 