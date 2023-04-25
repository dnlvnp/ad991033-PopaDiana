**TRAVAIL PRATIQUE 4**

**<u>Solicitation du Service de sécurité incendie de Montréal (SIM) dans les interventions criminelles depuis 2015</u>**


**1. Choix de la thématique et pertinence de l'application**

L'objectif principal de l'application est d'analyser les différents types d'intervention criminelle auxquels furent exposées les casernes du SIM depuis 2015 considérant que les pompiers font également partie des premiers répondants. Lors de la première consultation de l'application, toutes les interventions sont affichées automatiquement sur la carte. Les paramètres et boutons sont mis en place pour filtrer la donnée par année et par catégorie de crime. Ces manipulations de la donnée servirait à une meilleure gestion des casernes tout dépendamment de l'activité criminelles dans les différents secteurs.


**2. Processus de configuration de l'application**

<u>1.1. Données importées</u>

Les sources des interventions du SIM proviennent des publications sur ArcGIS Online lors du travail pratique 3. Le total des enregistrements disponibles à la sortie du TP2 et utilisés au TP3 est approximativement de 120 000. Parcontre, lors de la conversion du lien en WFS (avec l'ajout de l'extension /0/query?f=pgeojson&where=1=1&outFields=*), j'ai réalisé que la donnée n'était pas complète; il semblerait que ce type d'API fonctionne avec un système de pagination caché et sur la "première page", on n'a que 2000 enregistrements et c'est le maximum qui peut être importé d'un coup par document. En ajoutant l'extension "&resultOffset=" à la fin du lien, j'ai pu consulter les autres pages (il faut alors faire un choix de la page à insérer). Toutefois, ce n'était pas la meilleure manière de manipuler la donnée. Alors, afin d'ajouter un maximum d'enregistrements, j'ai créé des vues de la couche sur ArcGIS Online en ajoutant un filtre temporel pour chaque. Par conséquent, j'ai pu ajouter à l'application open source 9 couches de 2000 enregistrements chaque permettant de maximiser la donnée davantage.

Considérant ce souci du maximum d'enregistrements pouvant être importé, la couche des casernes (indexation hexagonale) ainsi que celle des unités d'évaluation foncière sont incomplètes également. J'aurais pu prendre la même avenue que pour les interventions, mais, considérant que ce n'était pas la donnée principale et que celles-ci étaient plutôt contextuelles, j'ai décidé de les conserver telles quelles et travailler la donnée disponible. La tuile vectorielle des territoires administratifs des casernes (découpage original) a été ajouté aussi, mais je n'ai pas réussi à résoudre le problème d'affichage.


<u>1.2. Librairies utilisées pour la manipulation des éléments</u>

La principale librairie utilisée pour cette application est celle de Maplibre avec laquelle j'ai importé le fond de carte, les fonctionnalités de zoom, l'angle d'inclinaison, l'échelle dynamique, la légende et bien évidemment, les données. La librairie Mapbox a permit une partie de la manipulation des fonctions javascript en cours de route et la librairie Bootstrap a été utilisée pour la configuration ainsi que la représentation des 4 boutons.


<u>1.3. Fonctionnalités ajoutées</u>

Les premières fonctionnalités ayant été ajoutées furent les boutons indiquant les années. L'objectif principal fut de filtrer les interventions du SIM en fonction des années. De la même manière qu'au travail pratique 3, le principe fut de voir l'évolution de l'activité criminelle au fil du temps afin de mieux redistribuer les ressources parmi les casernes. 

Le deuxième bouton affiche les types d'intervention dans le but de raffiner la recherche davantage une fois que les deux boutons étaient reliés.

Tout juste en dessous se trouve la case indiquant le total des interventions à l'écran. Dans le même principe que le TP3 où l'histogramme se mettait à jour en fonction des deux derniers filtres appliqués, ce compte dynamique devait être configuré de la même manière. Ce fut une bonne alternative à l'histogramme pour quantifier le total des enregistremenents à l'écran.

Finalement, le dernier bouton avait pour but de convertir les bâtiments (Unités d'évaluation foncière) à une dimension 2.5D. Ceux-ci auraient été intéressants à observer en basculant l'angle d'inclinaison.


**3. Problèmes rencontrés et objectifs pas atteints**

Un des principaux problèmes rencontrés lors de la configuration de l'application fut la gestion des erreurs concernant le fonctionnement des boutons. Malheureusement, les quatre boutons nommés précédemment ne fonctionnent pas. Je crois être en mesure de corriger mes erreurs en continuant le travail, mais cela n'a pas pu être effectué en respectant le délai de la remise du travail.

De plus, j'aurais bien aimé ajouter une fenêtre contextuelle aux données afin d'afficher les informations d'un enregistrement en cliquant dessus. 

À première vue, l'application porte également à confusion car, mis à part du titre, l'utilisateur ne sait pas ce qu'il regarde et comment interpréter la donnée. J'aurais aimé approfondir la légende afin d'expliquer la symbolisation des interventions (qui représente les catégories de crimes) et ainsi améliorer l'expérience UI/UX. Heureusement, je peux animer les couches grâce à la légende qui compensent pour les boutons de filtre temporels qui ne fonctionnent pas.
