Angularjs Map & Directions Independant
=====

Angularjs Google Maps & Directions Directives (Independant)

Its identical to [**ngmapsdirect**](https://github.com/davidchase/ngmapdirect) except
with this concept you can use one directive for just the map and the other one for directions.

This allows you to have the map in one location on the page and the directions inputs somewhere else.

Ex: `<map>` inside a `<header>` tag and `<directions>` inside a `<article>` tag.


**Required Dependencies for Component:**
+ **Angularjs**

  Stable: ` <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>`
  
  --or--
  
  Unstable: `<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>`
  
  Please refer to the following [**url**](http://goo.gl/zNXqU) for version(stability) discrepancies.
  
  You can still use the "unstable" version for the latest animate and other ng directives.
  
+ **Google Maps Api v3**

  `<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>`


**Optional Dependencies:**
+ **Zurb Foundation**

   Used in simple styling of map and directions.

  `<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/foundation/4.1.6/css/foundation.min.css"  />`
