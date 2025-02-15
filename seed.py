from app import create_app, db
from models import Exhibition, MediaStation, MediaType, Interaction, Visualization
import random

app = create_app()

with app.app_context():
    db.create_all()

    # Create media types, interactions, and visualizations
    text = MediaType(name='Text')
    image = MediaType(name='Bild')
    audio = MediaType(name='Audio')
    video = MediaType(name='Video')
    object = MediaType(name='3D Objekt')

    zoom = Interaction(name='Vergrößern')
    compare = Interaction(name='Vergleichen')
    focus = Interaction(name='Fokussieren')
    connect = Interaction(name='Verknüpfen')
    move = Interaction(name='Bewegen')

    map = Visualization(name='Karte')
    timeline = Visualization(name='Zeitstrahl')
    book = Visualization(name='Buch')
    tiles = Visualization(name='Kacheln')
    

    db.session.add_all([text, image, audio, video, object, zoom, compare, focus, connect, move, map, timeline, book, tiles])


    exhibition_0 = Exhibition(
        title='Kinderbiennale "PLANET UTOPIA"',
        start_date='2024-06-01',
        end_date='2025-03-30',
        location='Japanisches Palais',
        trailer='Willkommen auf PLANET UTOPIA … einem Ort, der zum Mitmachen und Entdecken anregt, phantastische Universen eröffnet und uns durch Raum und Zeit reisen lässt. Wiwollen wir unsere Zukunft gestalten? Wie können wir diese Welt, in der wir leben, zu einem besseren Ort machen? Kaum etwas scheinen wir derzeit dringender zu benötigen als Utopien – Ideen, Träume und Visionen.'
    )
    exhibition_archiv = Exhibition(
        title='Archiv der Träume. Ein surrealistischer Impuls',
        start_date='2024-05-05',
        end_date='2024-09-01',
        location='Blockhaus',
        trailer='In seiner ersten Ausstellung verwandelt sich das Archiv der Avantgarden in das Archiv der Träume. Es ist ein Raum der Träume und unheimlichen Visionen, die archiviert, aktiviert, wiederentdeckt, untersucht, ausgestellt und aufgeführt werden. Es ist ein Archiv und gleichzeitig ein Büro, eine Ausstellung, ein aktiver und diskursiver Ort. Es ist ein Labyrinth von Visionen, Ideen, kreativer Prozesse, historischer Zeugnisse und ein Ort der Entfaltung alter Mythen in avantgardistischen Praktiken. Das Archiv der Träume ist ein Ort, an dem ein surrealistischer Impuls des 20. Jahrhunderts erforscht wird. Es hebt die Arbeit der Surrealisten als erste Künstlergruppe hervor, die das Archivieren als avantgardistische Geste entwickelten. Vor einhundert Jahren, im Jahr 1924, veröffentlichte André Breton das Manifest des Surrealismus und im selben Jahr gründete die surrealistische Gruppe das Bureau des Recherches Surréalistes (dt. das Büro für Surrealistische Forschung), um Traumzeugnisse in jeder Form zu sammeln, zu archivieren und zu untersuchen. Die Ausstellung präsentiert avantgardistische Praktiken, die die Grenzen zwischen Realität und Traum, passivem Archiv und aktiven Revolutionen, Vergangenheit, Gegenwart und möglicher Zukunft verwischen. Über 300 Werke, bestehend aus Objekten, Collagen, Zeichnungen, Bücher und Zeitschriften, Fotomontagen und Filmen verdeutlichen die Arbeitsweisen der Surrealistischen Künstlergruppierungen. Ihre Themen verschmolzen mit Ethnologie, Anthropologie, Soziologie und politischem Aktivismus und gaben gleichzeitig Impulse für andere experimentelle Avantgarde-Strömungen der Nachkriegszeit, wie Art Brut, Cobra, Pop Art und Fluxus.'
    )
    exhibition_stillleben = Exhibition(
        title='Zeitlose Schönheit. Eine Geschichte des Stilllebens',
        start_date='2023-11-17',
        end_date='2024-09-01',
        location='Zwinger',
        trailer='Im Winckelmann-Forum des Semperbaus präsentiert die Gemäldegalerie Alte Meister etwa 80 Werke aus dem eigenem Bestand in der Ausstellung „Zeitlose Schönheit. Eine Geschichte des Stilllebens“. Die breit gefächerte Schau – mit Meisterwerken von Malerinnen und Malern wie Frans Snyders, Balthasar van der Ast, Jan Davidsz. de Heem, Adriaen van Utrecht, Willem Claesz. Heda, Abraham Mignon oder Rachel Ruysch – beleuchtet umfassend die Gattung „Stillleben“: Seit wann gibt es sie? Was genau macht ein Stillleben aus? Welche Bedeutung, welchen Inhalt und welche Funktion hatten und haben sie heute noch? Welche Allegorien und Symbole verbergen sich in diesen Motiven?'
    )
    exhibition_caspar = Exhibition(
        title='Caspar David Friedrich — Der Zeichner: Caspar David Friedrich. Wo alles begann',
        start_date='2024-08-24',
        end_date='2024-11-17',
        location='Residenzschloss',
        trailer='Das Kupferstich-Kabinett im Dresdner Residenzschloss lenkt den Blick auf Caspar David Friedrichs künstlerischen Prozess. Friedrichs Zeichnungen sind von großer Einfühlsamkeit und gleichzeitig Genauigkeit geprägt. Sie entstanden auf Wanderungen durch die nähere und weitere landschaftliche Umgebung Dresdens, aber auch während seiner Reisen in die Heimat nach Greifswald und Rügen oder ins Riesengebirge. Wandern und Zeichnen gehören bei Friedrich eng zusammen. Noch heute ist spürbar, wie konzentriert und voller Hingabe Friedrich die Natur in seinen Zeichnungen erfasste. Seine radikale Subjektivität und zugleich hohe Genauigkeit in der Darstellung wirken unvermindert. Die Präsenz seiner Kunst wird vor allem vor den Originalen selbst erfahrbar. Seine Wanderwege werden in der Ausstellung sichtbar und regen dazu an, seinen Pfaden auf eigenen Wanderungen zu folgen.'
    )
    exhibition_1 = Exhibition(
        title='Anselmi bis Zuccari. Meisterzeichnungen der Sammlung Hoesch zu Gast.',
        start_date='2022-03-03',
        end_date='2023-03-03',
        location='Residenzschloss',
        trailer='Sammeln verbindet: Wer sammelt, bringt Dinge zusammen, genießt die unmittelbare Begegnung mit den eigenen Schätzen und kann die Freude mit Gleichgesinnten teilen. Getreu diesem Motto bietet das Kupferstich-Kabinett der Staatlichen Kunstsammlungen Dresden (SKD) mit der Ausstellung „Anselmi bis Zuccari. Meisterzeichnungen der Sammlung Hoesch zu Gast“ vom 10. Juni bis zum 11. September 2022 die Gelegenheit, hochkarätige sowie bisher kaum öffentlich gezeigte Altmeisterzeichnungen aus der Sammlung des Winzers und Historikers Dr. Henning Hoesch kennenzulernen. Ausgewählte Blätter aus dem eigenen Bestand gesellen sich zu den Zeichnungen aus der Sammlung Hoesch und regen neue Verbindungen an. Insgesamt sind 111 Werke ausgestellt, davon 79 Zeichnungen aus der Sammlung Hoesch, einem seit über vier Jahrzehnten mit Leidenschaft und einem kundigen Auge zusammengetragenem Bestand. Italienische Arbeiten auf Papier aus der Renaissance und dem Barock bilden den Schwerpunkt und zeugen von der schöpferischen Kraft der Zeichenkunst, die damals einen besonderen Höhepunkt erlebte. Faszinierende und doch bislang wenig bekannte Künstler wie Michelangelo Anselmi sind ebenso vertreten wie gefeierte Namen, beispielsweise Andrea Boscoli, Annibale, Agostino und Ludovico Carracci, Giovanni Francesco Barbieri, genannt Guercino, Claude Lorrain, Pier Francesco Mola, Jacopo Palma il Giovane, Giovanni Battista Tiepolo und Taddeo Zuccari. Ihnen und vielen anderen kann man gleichsam über die Schulter schauen, wie sie mit Stift, Feder oder Pinsel die eigenen Ideen – seien es Figuren, Bilderzählungen oder Landschaften – mal flüchtig skizzieren, mal sorgsam durcharbeiten. Wie kaum ein anderes Medium ermöglichen es Zeichnungen, kreatives Schaffen aus allernächster Nähe zu erleben – ein Dialog über Jahrhunderte hinweg. Henning Hoesch, Sammler: „Ich freue mich sehr über die Möglichkeit, eine repräsentative Auswahl meiner in über 40 Jahren zusammengetragenen Sammlung mit der Öffentlichkeit zu teilen. Die Zeichnungen alter Meister geben Einblick in deren Bemühungen und individuelle Fähigkeiten, die Wirklichkeit zu beobachten und festzuhalten — oft naturgetreuer als auf dem gemalten Bild. Im Zentrum steht dabei der Blick auf die Zeichnung als Ursprung aller Kunst und als ein Raum der künstlerischen Auseinandersetzung mit sich selbst. Durch die Unmittelbarkeit des Mediums sind wir eingeladen, diese suchenden Prozesse nachzuvollziehen und zu erkunden. Das Dresdner Kupferstich-Kabinett mit seiner langen Tradition einerseits und der innovativen Arbeit in der Forschung andererseits ist dafür ein idealer Ort.“ Deutlich wird, dass auch Sammeln ein kreativer Prozess ist und die entstehende Sammlung Hoesch kein abgeschlossener Organismus: Stets kommen neue Werke hinzu, andere werden wiederum weitergegeben. Von diesem lebendigen Charakter des Bestands zeugen auch die jüngsten Neuzugänge, darunter eine Interpretation Battista Francos nach einem Idealbildnis von der Hand Michelangelos aus der Gruppe der sogenannten “Teste Divine” (Göttliche Köpfe). Stephanie Buck, Direktorin des Kupferstich-Kabinetts: „In Dresden freuen wir uns außerordentlich, Henning Hoeschs auf dem internationalen Markt über viele Jahre mit Kenntnis und Liebe zusammengetragene Zeichnungssammlung erstmals der Öffentlichkeit zeigen zu können, und zwar im Dialog mit Werken des Kupferstich-Kabinetts. Die vom Blick des privaten Sammlers mitgeprägte Ausstellung ist Ausdruck einer über mehrere Jahre gewachsenen vertrauensvollen Freundschaft, für die ich der Familie Henning Hoesch herzlich danke. Sie fällt in eine Zeit, in der wir im Kupferstich-Kabinett mit einer Gruppe junger Wissenschaftler*innen intensiv zu Renaissance-Zeichnungen forschen und dabei innovative Wege beschreiten. Die Vielfalt der Perspektiven gehört hier wesentlich dazu.“ Am Kupferstich-Kabinett läuft derzeit ein Katalogisierungsprojekt zu den italienischen Zeichnungen des 16. Jahrhunderts, das seit 2018 durch die Getty Foundation im Rahmen der Initiative „The Paper Project. Prints and Drawing Curatorship in the 21th Century“ gefördert wird. Einzelne Blätter aus dieser Bestandsgruppe werden der Präsentation der Sammlung Hoesch zur Seite gestellt und ihr aktueller Forschungsstand besprochen. Ein erster wissenschaftlicher Katalog über die Sammlung Hoesch erschien 2017 im Michael Imhof Verlag unter dem Titel „Galleria Portatile“. Der zweite Band, herausgegeben von Dr. Henning Hoesch und Dr. Heiko Damm, erscheint während der Ausstellungslaufzeit.'
    )
    # Create an exhibition
    exhibition_2 = Exhibition(
        title='„Das schönste Pastell, das man je gesehen hat.“ Das Schokoladenmädchen von Jean-Étienne Liotard',
        start_date='2018-09-28',
        end_date='2019-06-01',
        location='Zwinger',
        trailer='Im Zentrum der Ausstellung steht eines der berühmtesten Werke der Dresdner Gemäldegalerie, das Schokoladenmädchen des Genfer Künstlers Jean-Étienne Liotard (1702–1789). Bereits zu seinen Lebzeiten waren seine Pastellmalerei und das Bild hochgeschätzt. So pries die bekannteste Pastellmalerin Rosalba Carriera das Schokoladenmädchen als „schönstes Pastell“. Dem Kunsthändler Algarotti, der die „Chocolatière“ 1745 direkt vom Künstler für das Dresdner Pastellkabinett ankaufte, war es zu verdanken, dass nun in der Galerie auch Werke zeitgenössischer Künstler präsentiert wurden. Ganz dem Geschmack des Rokoko entsprach das Malen mit der Pastellkreide, das sich für lebensechte, brillante Porträts anbot: Liotard schuf makellose, porzellanhaft glatte Oberflächen. Der große Bekanntheitsgrad des Bildes aber beruht auf der Darstellung eines einfachen, unbekannten Stubenmädchens, einem bis dahin äußerst seltenen Motiv. Die „Chocolatière“ serviert einer unbekannten Empfängerin zum Frühstück heißen Kakao: In dieser Form war das teure, exotische Genussmittel im 18. Jahrhundert insbesondere an den europäischen Höfen äußerst beliebt. Seine Exklusivität äußerte sich nicht zuletzt in den wertvollen Porzellanen mit silbernen und goldenen Untertassen, in denen das Getränk serviert wurde. Liotard nahm mit seiner präzisen Beobachtung die Kunst der Aufklärung und den Realismus des 19. Jahrhunderts vorweg. Sowohl die vielen Kopien, die bereits seit dem 18. Jahrhundert in Pastell oder Öl angefertigt wurden, als auch die zahlreichen grafischen und fotografischen Reproduktionen förderten die weite Verbreitung und internationale Rezeption. Das Schokoladenmädchen war zudem seit dem 19. Jahrhundert in der Volkskunst und Werbung sehr beliebt. Die Ausstellung ermöglicht erstmals, das Schokoladenmädchen als Teil von Liotards Gesamtwerk zu erfahren. Über 100 herausragende Werke, darunter etwa 40 Leihgaben aus großen, internationalen Sammlungen, aus Privatbesitz sowie aus zehn Museen der Staatlichen Kunstsammlungen Dresden zeigen die Kunst Liotards. Über 40 Pastelle, Ölgemälde, Zeichnungen und Grafiken geben einen Einblick in das vielfältige Schaffen des Künstlers, das neben Porträts in Pastell, Genreszenen und Stillleben in Öl auch Miniaturen, Figuren und Kostümstudien, sowie Kupferstiche umfasst. Auch der Künstler selbst, der sich, inspiriert von seinen Reisen durch das Osmanische Reich und das Fürstentum Moldau, mit langem Bart und Pelzmütze als selbsternannter „türkischer Maler“ inszenierte und so auch porträtierte, wird in der Ausstellung vorgestellt. Während seines erfolgreichen Aufenthalts in Wien 1743–45 am Hofe Maria Theresias malte er nicht nur das Schokoladenmädchen, sondern kam auch in engen persönlichen Kontakt mit der Monarchin und konnte sie mehrfach porträtieren, auch in türkischen Kostümen.'
    )
    exhibition_3 = Exhibition(
        title='1 Million Rosen für Angela Davis',
        start_date='2020-10-10',
        end_date='2021-05-30',
        location='Kunsthalle im Lipsiusbau',
        trailer='Im September 1972 empfingen jubelnde DDR-Bürger*innen die US-amerikanische Kommunistin Angela Davis (*1944) in Ost-Berlin. Hunderttausende von ihnen hatten sich zuvor an der von offizieller Stelle geleiteten Postkarten-Kampagne Eine Million Rosen für Angela beteiligt, die dazu beigetragen hatte, dass die junge Black Power-Aktivistin und Philosophieprofessorin in einem Terrorismus-Prozess in den USA freigesprochen und aus der Haft entlassen wurde. Als „Heldin des anderen Amerikas“ stilisierte man sie in der DDR, in Osteuropa und linken Kreisen weltweit in den 1970er-Jahren zur Ikone der Revolution. Angela Davis wiederum hoffte auf eine große internationalistische Bewegung für eine sozialistische, feministische und nicht-rassistische Demokratie als Gegenpol zu ihren Erfahrungen der Gewalt und Unterdrückung als Schwarze Frau in den USA. Diese Momente der politischen Projektion, aber auch der Hoffnung sind historische Ausgangspunkte für die Ausstellung, die ab dem 10. Oktober 2020 in der Kunsthalle im Lipsiusbau zu sehen ist. Internationale zeitgenössische Kunstwerke thematisieren die noch immer dringlichen Anliegen der inzwischen emeritierten Professorin und eröffnen eine Diskussion um die Hintergründe, die Fehlstellen und das uneingelöste Potential dieser ungewöhnlichen Verbindung zwischen Angela Davis und der DDR. In den Fotografien, Videos, Skulpturen, Klanginstallationen und Konzeptarbeiten der Ausstellung nimmt eine junge Künstler*innengeneration Davis’ bis heute anhaltendes Engagement für soziale Gerechtigkeit, ihren Kampf gegen Rassismus und Sexismus ebenso in den Blick wie die Einschreibung ihres ikonischen Bildes in eine globale Geschichte des Widerstands. Im Dialog mit umfangreichen Archivmaterialien sowie Werken von Künstler*innen aus der DDR entsteht ein experimenteller Raum der Begegnung von Vergangenheit und Gegenwart, der einen Bogen vom sozialistischen Internationalismus der DDR zur weltweiten Black Lives Matter-Bewegung schlägt. Präsentiert werden insgesamt 52 Kunstwerke und umfangreiches Archivmaterial. Hierzu gehören eine Auswahl der Postkarten der Solidaritätsaktion aus einer US-amerikanischen Privatsammlung und Gemälde von Willi Sitte (1921–2013), Bernhard Franke (*1922) und Christoph Wetzel (*1947). Vor allem aber befragen in der Ausstellung medienübergreifende Arbeiten von Gegenwartskünstler*innen den Kult um Angela Davis einerseits und stellen andererseits ihr Wirken als Aktivistin und Philosophin in den Fokus politischen Kunstschaffens: Die US-amerikanische Konzeptkünstlerin Sadie Barnette (*1984) verfolgt beispielsweise Strategien der Wiederaneignung von Schwarzer Geschichte. Sie kreiert eine Installation aus FBI-Überwachungsakten zu ihrem Vater, der Mitglied der sozialistisch-revolutionären Gruppe der Black Panther Party for Self-Defense sowie zeitweise Angela Davis‘ Leibwächter war. Gabriele Stötzers (*1953) Video-Performance, in der sie ihre Inhaftierung während der DDR-Zeit verarbeitet, schlägt den inhaltlichen Bogen zu Davis‘ eigener Freiheitsstrafe und ihren Untersuchungen zum amerikanischen gefängnisindustriellen System. Gleichzeitig thematisiert sie den zentralen Widerspruch der DDR-Politik: wie ein Staat mithilfe der hoffnungsvollen Empathie seiner Jugend die politische Gefangene Angela Davis bei ihrem Schauprozess umfangreich unterstütze, gleichzeitig jedoch Reformbestrebungen im eigenen Land selbst gewaltsam unterdrückte und es lediglich bei Lippenbekenntnissen zum Anti-Rassismus blieb. Vier Neuproduktionen internationaler Künstler*innen (Steffani Jemison & Justin Hicks, Ângela Ferreira, Elske Rosenfeld, Lewis Watts) sowie ein für die Schau entstandener Interviewfilm mit Angela Davis beleuchten die nach wie vor große Bedeutung und den Einfluss der politischen Arbeit der Aktivistin auf das zeitgenössische Kunstschaffen. Im Foyer des Lipsiusbaus lädt ein Leseraum von Contemporary And (C&) – einem Magazin, das den Blick auf zeitgenössische Kunst aus Afrika und aus der afrikanischen Diaspora wirft – ein, sich dem Thema literarisch anzunähern. Das Vermittlungsprogramm für Jugendliche legt einen speziellen Fokus auf Begriffsklärungen rund um das Thema Rassismus. Die Begleitveranstaltungen stellen afro-deutsche Aktivistinnen vor und eine Black Power-Filmnacht in Kooperation mit ARTE und dem Filmtheater Schauburg zeigt Dokumentationen zum Thema.'
    )
    exhibition_4 = Exhibition(
        title='Ernst Barlach zum 150. Geburtstag',
        start_date='2020-08-08',
        end_date='2021-01-10',
        location='Albertinum',
        trailer='Ernst Barlach (1870–1938) besitzt zweifelsfrei eine Popularität wie kaum ein zweiter Künstler des 20. Jahrhunderts in Deutschland. Seine Bedeutung als Bildhauer verdankt er dabei vor allem seinen Holzskulpturen. Gleichzeitig war der Vielfachbegabte aber auch in anderen Medien tätig: Barlach war Zeichner, Grafiker, Autor zahlreicher Dramen und Prosawerke und ein ausdrucksstarker Briefschreiber. Im Mittelpunkt der Ausstellung, die als Gemeinschaftsprojekt mit dem Ernst Barlach Haus – Stiftung Hermann F. Reemtsma Hamburg und in Kooperation mit der Ernst Barlach Stiftung Güstrow stattfindet, stehen Barlachs Skizzenbücher, Zeichnungen und Holzskulpturen. Beleuchtet werden aber auch alle anderen Facetten seines umfangreichen Schaffens. Zudem werden Barlachs Studienzeit in Dresden und sein Frühwerk, die nachfolgenden Stationen seines Lebensweges mit bedeutenden Werken und Werkgruppen, die Verfemung während der Zeit des Nationalsozialismus sowie seine Rezeption und hohe Anerkennung in beiden deutschen Staaten nach 1945 thematisiert. Zum 150. Geburtstag wird die erste umfangreiche Retrospektive dieses Ausnahmekünstlers in Dresden gezeigt, für den Kunst „eine Sache allertiefster Menschlichkeit“ gewesen ist. Die in der Präsentation vertretene Holzskulptur Frierendes Mädchen von 1917 aus dem Ernst Barlach Haus in Hamburg hat eine besondere historische Verbindung zu den SKD. Sie wurde 1920 für die Skulpturensammlung im Albertinum erworben und gehörte 1937 zu eben jenen durch die Nationalsozialisten beschlagnahmten Werken. Nach über 80 Jahren findet sie als Leihgabe nun erstmals ihren Weg zurück nach Dresden.'
    )
    exhibition_5 = Exhibition(
        title='A.R. Penck „Ich aber komme aus Dresden (check it out man, check it out)."',
        start_date='2019-05-10',
        end_date='2020-01-12',
        location='Albertinum',
        trailer='Alles begann in Dresden. Mit einem Akt künstlerischer Selbstbehauptung: Ausgeschlossen von Akademie und offiziellem Kunstbetrieb in der DDR erklärte sich Ralf Winkler (1939—2017), der später als A.R. Penck weltbekannt werden sollte, eigenmächtig zum Künstler. Er besetzte den „Untergrund“ und entwickelte ein ebenso produktives wie vielseitiges künstlerisches Werk als Maler und Zeichner, Bildhauer und Grafiker, Super-8-Filmer, Musiker und Autor. In seiner Lebens- und Kunstpraxis verband er analytisches und bildnerisches Denken. Ideen aus Philosophie, Naturwissenschaft, Informationstheorie und Technik fusionierte er mit alten und neuen Strategien des Bildermachens sowie einem Gespür für gesellschaftliche und künstlerische Problemlagen zu einer multimedialen Konzeption des „Visuellen Denkens“ – eines Denkens in Bildern. Anhand ausgewählter Werke durchstreift die Ausstellung Pencks Dresdner Zeit bis zu seiner Ausreise 1980. Von der frühen Auseinandersetzung mit Rembrandt und Picasso über die von der deutschen Teilung motivierten Welt- und Systembilder, die universelle Zeichensprache seines Standart- Konzepts mit der typischen Strichfigur bis zum „Ende im Osten“. Pencks Entwicklung ist zudem nicht denkbar ohne den Austausch mit anderen Künstlern in selbstorganisierten Gruppen und Aktionen. In den 1950er Jahren bot ihm der Kreis junger Kunstinteressierter um Jürgen Böttcher erste Orientierung und Ermutigung. 1971 formierte sich die Künstlergruppe „Lücke“ mit gemeinschaftlicher Arbeits- und Ausstellungspraxis und 1978 gehörte Penck zu den Gründungsmitgliedern der Dresdner Obergrabenpresse.'
    )
        
    db.session.add_all([exhibition_0, exhibition_archiv, exhibition_stillleben, exhibition_caspar, exhibition_1, exhibition_2, exhibition_3, exhibition_4, exhibition_5 ])
    db.session.commit()


    # Create media stations
    media_station_0 = MediaStation(
        title='Dresden - Utopia - Dystopia',
        description='Der Canaletto-Blick ist die wohl berühmteste Stadtansicht Dresdens. Wie er in Zukunft aussehen wird, ist freilich ungewiss. Aktuell lässt sich bei einem Besuch der Kinderbiennale »PLANET UTOPIA« im Japanischen Palais und auch hier auf voices erproben, wie sich die künstliche Intelligenz die Zukunft der berühmten Stadtansicht vorstellt. Dafür hat ein Team von Studierenden der TU Dresden ein Format entwickelt, mit dem wir dem Zukunftstraum der KI eine Richtung geben können.',
        image_urls=['planet-utopia-dystopia-1.jpeg', 'planet-utopia-dystopia-2.jpeg', 'planet-utopia-dystopia-3.jpeg'],
        path_to_exec='https://applications.skd.museum/voicesmedia/kinderbienale/utopia/index_fullscreen.html',
        exhibition_id=exhibition_0.id,
        media_types=[image],
        interactions=[compare, connect],
        visualizations=[tiles]
    )
    media_station_avantgard = MediaStation(
        title='Surrealismus rund um die Welt',
        description='Bereits in den 1920er-Jahren bildeten verschiedene surrealistische Gruppen ein globales Netzwerk, das durch einen lebhaften Austausch von Druckwerken gekennzeichnet war. In der Zeitschrift Minotaure (1937, Nr. 10, Umschlag von Réne Magritte) wurden Aktivitäten des internationalen Surrealismus in Form von drei Collagen visualisiert. Viele der dort abgebildeten Bücher, Zeitschriften und Flugblätter sind Teil der Sammlung des Archivs der Avantgarden – und in dieser Interaktiven Museumsinstallation digital zusammengestellt.',
        image_urls=['archiv-der-avantgarden-00.jpeg', 'archiv-der-avantgarden-01.jpeg', 'archiv-der-avantgarden-02.jpeg', 'archiv-der-avantgarden-03.jpeg'],
        path_to_exec='https://applications.skd.museum/voicesmedia/interactive_ada_minotaure/index_container.html',
        exhibition_id=exhibition_archiv.id,
        media_types=[image, text],
        interactions=[zoom, move],
        visualizations=[book]
    )
    media_station_memento = MediaStation(
        title='Memento Mori - Ein Totenkopf neben einem Blumenstrauß',
        description='Die Medienstation zu Jan Davidsz. de Heems „Memento mori. Ein Totenkopf neben einem Blumenstrauß“ (um 1655/60) ermöglicht es Besucherinnen, das Stillleben interaktiv zu erkunden. Durch Tippen auf markierte Bilddetails werden die dargestellten Tiere und Pflanzen benannt und ihre Bedeutung im Kontext von Vergänglichkeit und Sinnbildhaftigkeit erläutert. Die digitalen Informationspunkte veranschaulichen damit die komplexen Allegorien und Symbole, die dieses Vanitas-Gemälde so faszinierend machen.',
        image_urls=['memento-mori-0.jpeg', 'memento-mori-1.jpeg', 'memento-mori-2.jpeg', 'memento-mori-3.jpeg'],
        path_to_exec='https://applications.skd.museum/voicesmedia/interactive_mementomori/index_container.html',
        exhibition_id=exhibition_stillleben.id,
        media_types=[image, text],
        interactions=[zoom, move, focus],
        visualizations=[tiles, map]
    )
    media_station_caspar = MediaStation(
        title='Caspar David Friedrich - Karlsruher Skizzenbuch',
        description='Das Karlsruher Skizzenbuch ist ein 184 x 118 mm großes Büchlein, in dem Caspar David Friedrich zwischen April und Juni 1804 Motive aus der Dresdner Umgebung festgehalten hat. Einige davon hat er später in einigen seiner heute berühmtesten Gemälde weiterverarbeitet. Für diese interaktive Medieninstallation wurden Animationen erstellt, welche die Verbindung der Motive des Skizzenbuchs zu den Gemälden aufzeigen. Klicken Sie auf die Ansicht des Skizzenbuchs und warten einen kurzen Moment, um das Skizzenbuch durchstöbern zu können.',
        image_urls=['caspar-ksb-0.jpeg', 'caspar-ksb-1.jpeg', 'caspar-ksb-2.jpeg'],
        path_to_exec='https://applications.skd.museum/voicesmedia/interactive_kk_ksb/',
        exhibition_id=exhibition_caspar.id,
        media_types=[image, text, video],
        interactions=[zoom, move, focus, connect],
        visualizations=[book]
    )
    media_station_1 = MediaStation(
        title='Meisterzeichnungen Hoesch',
        description='Entdecken Sie die faszinierende Welt der Meisterzeichnungen mit unserer interaktiven Medienstation! Auf Tablets und PCs können Sie durch einen benutzerfreundlichen Slider die ausgestellten Werke der Sammlung Hoesch sowie ausgewählte Blätter des Kupferstich-Kabinetts erkunden. Jede Zeichnung wird von informativen Texten begleitet, die Einblicke in die Künstler und deren Schaffensprozess bieten. Tauchen Sie ein in die Kunst der Renaissance und des Barock und erleben Sie hautnah die kreative Kraft der Zeichenkunst. Nutzen Sie die Gelegenheit, Meisterwerke von Michelangelo Anselmi, Andrea Boscoli, Claude Lorrain und vielen anderen aus nächster Nähe zu betrachten.',
        image_urls=['prev-meisterzeichnungen.jpg', 'prev-karte-liotard.jpg'],
        path_to_exec='meisterzeichnungen.html',
        exhibition_id=exhibition_1.id,
        media_types=[text, image],
        interactions=[move],
        visualizations=[book]
    )

    media_station_2 = MediaStation(
        title='Jean-Étienne Liotard (1702-1789) Leben und Reisen',
        description='Die Medienstation bietet Informationen über die vielen Reisen, die Liotard durch Europa unternahm.',
        image_urls=['prev-karte-liotard.jpg', 'prev-meisterzeichnungen.jpg'],
        path_to_exec='/stations/touchscreen_gallery',
        exhibition_id=exhibition_2.id,
        media_types=[image, text],
        interactions=[move, zoom],
        visualizations=[map, book, timeline]
    )

    media_station_3 = MediaStation(
        title='Die Produktion von: "2550 Hellrosa"',
        description='Die Medienstation bietet Informationen über die Technik der Pastellmalerei, welche anhand von naturwissenschaftlichen Untersuchungsergebnissen am Schokoladenmädchen erläutert werden. Durch die Unterstützung der traditionsreichen Pariser Manufaktur „La Maison du Pastel“ kann die Fertigung der Pastellkreiden nachvollzogen werden.',
        image_urls=['prev-pastell-liotard.jpg'],
        path_to_exec='/stations/audio_guide',
        exhibition_id=exhibition_2.id,
        media_types=[image, text],
        interactions=[move],
        visualizations=[book]
    )
    
    media_station_4 = MediaStation(
        title='1 Million Rosen für Angela Davis',
        description='Diese interaktive Medienstation bietet Museumsgästen die Möglichkeit, sich umfassend über die Solidaritätskampagne "1 Million Rosen für Angela Davis" zu informieren. Durch eine Kombination verschiedener Medienformate – darunter Videos, Artikel und Fotografien – können Besucher*innen die historische Postkartenaktion und deren Bedeutung entdecken. Die Inhalte sind in einer übersichtlichen Zeitstrahl-Ansicht angeordnet, auf die per Klick oder Touch zugegriffen werden kann. So lassen sich die einzelnen Meilensteine dieser bewegenden Geschichte und die Verbindung zwischen Angela Davis und der DDR auf eine anschauliche und zugängliche Weise erkunden.',
        image_urls=['prev-angela-davis.jpg'],
        path_to_exec='/',
        exhibition_id=exhibition_3.id,
        media_types=[image, text, video],
        interactions=[move, focus],
        visualizations=[timeline]
    )
    media_station_5 = MediaStation(
        title='Skizzenbücher Ernst Barlach',
        description='Diese interaktive Medienstation bietet Museumsgästen die Möglichkeit, sich umfassend über die Solidaritätskampagne "1 Million Rosen für Angela Davis" zu informieren. Durch eine Kombination verschiedener Medienformate – darunter Videos, Artikel und Fotografien – können Besucher*innen die historische Postkartenaktion und deren Bedeutung entdecken. Die Inhalte sind in einer übersichtlichen Zeitstrahl-Ansicht angeordnet, auf die per Klick oder Touch zugegriffen werden kann. So lassen sich die einzelnen Meilensteine dieser bewegenden Geschichte und die Verbindung zwischen Angela Davis und der DDR auf eine anschauliche und zugängliche Weise erkunden.',
        image_urls=['prev-barlach.jpg'],
        path_to_exec='/',
        exhibition_id=exhibition_4.id,
        media_types=[image],
        interactions=[focus],
        visualizations=[book, timeline]
    )
    
    db.session.add_all([media_station_0, media_station_avantgard, media_station_memento, media_station_caspar, media_station_1, media_station_2, media_station_3, media_station_4, media_station_5])
    db.session.commit()
    
     # Define the list of media types, interactions, and visualizations
    media_types = [text, image, audio, video, object]
    interactions = [zoom, compare, focus, connect, move]
    visualizations = [map, timeline, book, tiles]
    
    for i in range(6, 22):
        media_station = MediaStation(
            title=f'Dummy Interactive Museum Installation {i}',
            description=f'This is a randomly generated description for Media Station {i}.',
            image_urls=[f'prev-dummy-{i-5}.jpg'],
            path_to_exec=f'/',
            exhibition_id=random.choice([1, 2, 3, 4, 5]),  # Assuming the exhibitions are already created
            media_types=random.sample(media_types, k=random.randint(1, 3)),  # Random selection of 1-4 media types
            interactions=random.sample(interactions, k=random.randint(1, 3)),  # Random selection of 1-4 interactions
            visualizations=random.sample(visualizations, k=random.randint(1, 2))  # Random selection of 1-3 visualizations
        )
        db.session.add(media_station)
        db.session.flush();
        
    db.session.commit()
    print("Database seeded!")
