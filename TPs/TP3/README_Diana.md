TRAVAIL PRATIQUE 3 – Web app ESRI

**SOLICITATION DU SERVICE DE SÉCURITÉ D'INCENDIE DE MONTRÉAL DANS LES ACTES CRIMINELS DEPUIS 2015**

**URL de l’application :**

<https://experience.arcgis.com/experience/2ad4b0073ffb424281188c066575c78a/>



**Intentions d’expérience usager :**

L’objectif principal de l’application web développée est de mieux connaître l’implication du Service de sécurité d’incendie de Montréal (SIM) dans les activités criminelles afin de mieux gérer les équipes des différentes casernes. En superposant les données des interventions des pompiers aux actes criminels qui ont eu lieu sur l’île de Montréal, nous observons que ces équipes sont sollicitées dans presque la moitié des crimes. Considérant qu’ils sont également des premiers répondeurs, tout comme les policiers et ambulanciers, ils sont souvent les premiers à arriver sur les lieux des événements. Toutefois, les casernes n’ont pas la charge de travail ni la même superficie à couvrir. Par conséquent, l’application web peut être un outil de gestion pertinent permettant d’étudier ces phénomènes sur le territoire administratif de chaque caserne et ainsi, mieux répartir les responsabilités de manière plus efficace.

L’application contient deux couches représentant les territoires des casernes. La première fut traitée sous forme d’indexation hexagonale afin d’avoir une mesure uniforme et démontrer le nombre de crime par hexagone (attribut point\_count). La deuxième dessine les contours des territoires et indique le numéro de la caserne concernée afin de les localiser plus facilement. Après plusieurs tests de représentation de ces données, j’ai opté pour une symbologie minimaliste et uniforme car, non seulement le nombre de casernes est trop grand pour les différencier avec des couleurs uniques, mais en les superposant au reste des données, l’agencement de couleurs n’aurait pas été visuellement agréable ou pratique.

Ensuite, le document des unités d’évaluation foncière fut également ajouté afin d’apporter un contexte aux territoires ainsi que le type d’activités ou immeubles qui s’y trouvent. Cette couche comporte la variable 2.5D. Le champ d’élévation avec la valeur réelle des bâtiments a fut importé en format *string* de par le format des chiffres (point au lieu de la virgule pour les décimales). Par conséquent, celui-ci n’a pas pu être pris en compte pour la représentation de l’altitude alors une élévation fictive fut attribuée à chaque catégorie de bâtiments. La correction de cette erreur est simple, mais pour l’objectif de cet exercice, une élévation fictive semblait appropriée afin d’éviter de complexifier le processus. Chaque type d’unité fut symbolisée avec une couleur unique et des tons foncés afin qu’ils se distinguent des données des crimes représentés avec des tons pastels.

La dernière couche importée représente la donnée principale de l’application, donc les interventions des pompiers dans les événements criminels. Sa visualisation nous permet de localiser les types de crimes ayant impliqué le SIM. La couleur unique de chaque type a été choisie en fonction de la lecture des données de l’utilisateur. L’objectif de l’application est de nature pratique alors celle-ci fut conçue en tenant compte de besoin des utilisateurs de localiser facilement et rapidement les phénomènes sur leur territoire. 


**Objectifs des widgets :**

Les principaux widgets incluent le choix d’activer et désactiver les couches ainsi que la consultation de la légende de celles-ci afin de faciliter l’expérience de l’utilisateur en lui permettant de se retrouver dans la donnée et avoir une flexibilité dans la gestion de l’information. Pour la visualisation de l’altitude des bâtiments, il y a également l’option de basculer en 3D.

Les deux types de widgets permettant de naviguer la couche des interventions des crimes plus en détails sont (1) les filtres et (2) le diagramme.

1. Les filtres permettent à l’utilisateur de choisir quel type (ou tous les types) d’intervention à visualiser à l’intérieur d’une année. Donc, considérant que les données furent récoltées depuis 2015, neuf filtres ont été ajoutés et chacun vise une année en particulier. En plus de filtrer à travers les types de crimes, l’utilisateur peut également trier l’information par caserne. Si un filtre est activé et aucune catégorie de crime ou caserne n’a été choisie, la couche affiche toutes les interventions ayant eu lieu dans l’année qui intéresse l’utilisateur.
1. Le diagramme permet de quantifier plus facilement l’information affichée sur la couche. Originalement, sans aucun filtre, le diagramme indique le total des interventions par caserne depuis le début de la collecte de l’information (2015). Si un des filtres mentionnés précédemment est activé, le diagramme se met automatiquement à jour et quantifie l’information en fonction de cette sélection. C’est une manière simple et rapide de quantifier les types d’interventions auxquels sont exposés les pompiers.


Il est à noter que la donnée matricielle n’a pas été oubliée. Toutefois, suite à des soucis d’incompatibilité avec la *Scene* d’ArcGIS Online, j’ai été dans l’obligation de la retirer du projet. J’ai fait plusieurs tentatives de reprojection et importation en différents formats (.kml, .tif, .png), mais sans succès.

Ceci étant dit, les options qu’offre ESRI et qui sont compatibles avec cette application peuvent différer des options des web app open source. Toutefois, le principal de l’information est manipulé et affiché tel que désiré et ce même objectif sera poursuivi et potentiellement atteint avec une application open source. La représentation de l’information peut changer complètement (par exemple, le diagramme peut être remplacé par d’autres options), mais l’objectif sera le même.
