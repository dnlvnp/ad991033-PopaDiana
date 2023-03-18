**Popa Diana (ad991033)**

**ÉTAPE 1 : IDENTIFIER LES ACTES CRIMINELS IMPLIQUANT LE SERVICE D’INCENDIE DE MONTRÉAL (SIM)**

1. **Add Reader :** Importation des shapefiles « actes criminels » (ac) et « interventions-sim » (sim) depuis leur URL (Données ouvertes Montréal).
1. **Reprojector :** Reprojeter les deux tables à EPSG : 3857.
1. **SubstringExtractor :** La table « interventions-sim » contient l’heure dans le champ de date, contrairement aux crimes. Pour effectuer la jointure attributaire dans les étapes à venir, l’heure sera supprimée afin que les deux couches soient compatibles.
1. **SubstringExtractor :** Suite à l’observation des données, on remarque qu’au même coin de rue et à la même date, les latitudes et longitudes concordent jusqu’à deux chiffres après la virgule. Pour les considérer comme étant un même événement, les lat/long sont reconfigurées en conséquence (les deux tables).
1. **FeatureMerger :** Fusion (attributs et géométrie) des deux couches en fonction des étapes précédentes.
1. **AttributeManager :** Nettoyage des attributs afin d’éviter les répétitions.
1. **GeometryValidator :** Validation de la géométrie pour la jointure spatiale avec les territoires administratifs des casernes.
1. **Add Reader :** Importation du shapefile « territoires administratifs des casernes » depuis son URL (Données ouvertes Montréal)
1. **Reprojector** : Reprojection à EPSG : 4326 (lat/long) pour que celle-ci soit compatible avec l’index H3.
1. **CoordinateExtractor** : Valider que c’est bien des lat/long car les coordonnées ne figuraient pas dans la table attributaire auparavant.
1. **GeometryExtractor** : Valider la géométrie.
1. **H3HexagonalIndexer** : Indexation hexagonale (résolution 9 semblait appropriée pour l’étendue du territoire).
1. **Reprojector** : Reprojection à EPSG : 3857 tel que demandé.
1. **PointOnAreaOverlayer** : Jointure spatiale entre les tendances ac/sim et les territoires des casernes reconfigurés en hexagones.
1. **AttributeManager** **(2)** : Nettoyer les couches sortantes (points et polygones).
1. **NullAttributeMapper** : Identifier les valeurs nulles sur la couche des tendances ac/sim.
1. **Add Writer (2)** : Writer PostGIS pour les deux résultats.

**ÉTAPE 2 : EXTRACTION DES COULEURS DU RASTER : IMAGE MONTRÉAL**

2\.1. **Add Reader** : Importation de l’image aérienne à partir d’un URL One Drive.

2\.2. **RasterBandPropertyExtractor** et **ListExploder** : Extraction des bandes rouge, vert, bleu.

2\.3. **Reprojector** : Reprojection à EPSG : 3857.

2\.4. **RasterPropertyExtractor** : Extraction des informations du raster qui seront nécessaires au rééchantillonnage afin de changer la résolution. À noter les valeurs des rangées et colonnes.

2\.5. **RasterResampler** : On divise les valeurs des rangées et colonnes par 5.

2\.6. **RasterCellCoercer** : Extraction des couleurs des pixels en fonction de la nouvelle résolution. 

2\.7. **AttributeCreator** : Création d’un nouvel attribut dans lequel on applique l’expression suivante afin de convertir les valeurs des bandes de couleurs FME en RGB :

@Evaluate(@Value(\_band{0}.value)/255),@Evaluate(@Value(\_band{1}.value)/255),@Evaluate(@Value(\_band{2}.value)/255)

2\.8. **ColorConverter** : Conversion des couleurs du Raster des couleurs FME (attribut « color\_rgb ») à RGB (attribut « output\_color »).

2\.9. **FeatureColorSetter** : Préparation à l’application des couleurs lors de la jointure spatiale (attribut « output\_color »).

2\.10. **Add writer :** Ajout d’un writer PostGIS Raster afin d’écrire l’image aérienne à nouvelle résolution dans la base de données.

*\*L’extraction des couleurs n’a pas été éffectuée complétement; il y a des lacunes et elles se traduisent dans l’application des couleurs sur QGIS. Suite à la jointure avec les bâtiments, pour appliquer la couleur dans QGIS, on utilise le champ « output\_color » pour la symbolisation. Le choix du raster pour l’application des couleurs aux bâtiments ne fut pas la meilleure option considérant que les couleurs font souvent référence à la végétation; toutefois, il fut utile pour la manipulation du logiciel et l’apprentissage du processus.*











**ÉTAPE 3 : SIMPLIFICATION ET COMBINAISON DE DEUX NUAGES DE POINTS**

3\.1. **Add Reader (2)** : Importation des deux nuages de points par l’entremise de leur URL (Données ouvertes Montréal).

3\.2. **PointCloudThinner** (2) : Simplification individuelle des deux nuages de points à une intervalle de 30.

3\.3. **PointCloudCombiner** : Combinaison des deux nuages de points.

3\.4. **EsriReprojector** : Reprojection à EPSG : 3857.

3\.5. **PointCloudThinner** : Deuxième simplification à une intervalle de 5 pour alléger davantage le nuage de points.

3\.6. **PointCloudPropertyExtractor** : Extraction des propriétés, dont les valeurs Z qui seront appliquées sur les bâtiments qui intersectent le nuage de points (limite Ahuntsic/Montréal-Nord).

3\.7. **PointCloudCoercer :** Conversion des points LiDAR en vecteurs ponctuels en guise de préparation à la jointure spatiale.

3\.8. **GeometryValidator** et **GeometryExtractor:** La jointure entre les vecteurs du nuage de points et des bâtiments ne semble pas fonctionner, l’attribut « overlaps » est toujours à zéro malgré que les deux couches soient bien projetées et vérifiées avec les basemaps que celles-ci soient au bon endroit. 















**ÉTAPE 4 : ATTRIBUTION DES VALEURS Z AUX POLYGONES DE BÂTIMENTS (ÎLE DE MONTRÉAL)**

4\.1. **Add Reader (2)** : Importer les deux shapefiles; « Unités d’évaluation foncière » (UEF) depuis son URL (Données Québec) et « dmti\_building\_2021\_p\_point » (buildings) depuis un URL et connexion à un compte One Drive.

4\.2. **Reprojector** : Reprojection des deux couches à ESPG : 3857.

4\.3. **AttributeKeeper** : Nettoyage des attributs pour les buildings (points).

4\.4. **AttributeManager** : Nettoyage et reconfiguration des attributs en lettres minuscules.

4\.5. **PointOnAreaOverlayer** : Jointure spatiale afin d’attribuer les valeurs Z aux polygones. Il est à noter que la couche ayant la valeur Z d’origine ne couvre pas tous les bâtiments, alors certains polygones n’auront pas de valeur d’élévation.

4\.6. **PointOnAreaOverlayer** : Jointure spatiale entre le résultat de l’étape précédente et les couleurs extraites du Raster.

4\.7. **AttributeManager** : Nettoyage des attributs. 

4\.8. **PointOnAreaOverlayer** : Jointure spatiale entre le nuage de point (combiné) et les polygones des bâtiments avec les valeurs Z. Cette étape complétera la variable 3D pour la zone d’intérêt. 

4\.9. **ListSummer** : Calcul des sommes des valeurs Z qui intersectent chaque polygone (bâtiments).

4\.10. **AttributeManager** : Nettoyage des points, création d’un nouvel attribut et calcul de la moyenne des valeurs Z par bâtiment.

4\.11. **Add Writer** : Writer PostGIS avec la connexion à la base de données geo7630.

*\*La dernière jointure spatiale ne semble pas fonctionner (voir étape 3.8) et, par conséquent, le calcul de la somme des valeurs Z et leur moyenne ne donne aucun résultat. En fait, si le traitement roule jusqu’au calcul de la moyenne, des messages d’avertissements s’affichent dans le Translation Log indiquant que l’expression ne peut être effectuée car la somme ne peut être divisée par zéro (zéro étant les overlaps). De par ces messages, qui sont des centaines de milliers à cause du nombre de bâtiments à exporter et qui saturent le logiciel, le processus devient très lent et le traitement n’arrivent jamais à sa fin car il va manquer d’espace dans le workspace éventuellement pour logger ces erreurs (avec ou sans le caching activé, le traitement est tout aussi long et n’abouti pas au résultat désiré). Par conséquent, les bâtiments et les points LiDAR seront exportés individuellement dans la base de données PostGIS.*
