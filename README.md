# TEXAS — Boufekrane

A responsive, single-page restaurant menu built with plain HTML, CSS, and JavaScript.

Run locally with `python3 -m http.server 3000`, then open http://localhost:3000.

Edit products, prices, descriptions and placeholder image URLs in `app.js`. The hero image is in `index.html`. Images are illustrative photos hosted on Unsplash and external food websites; replace them with actual food photographs before publishing.

Orders open WhatsApp at +212658943901 with the product, filling (for tacos only), multiple sauce selections, quantity, price, description and image URL. WhatsApp click-to-chat supports text and image links, not automatically attaching image files. Customers must send the prepared message themselves.

Tacos offer Kafta, Poulet, Merguez, Chicken crispy and Mix. Kafta is selected by default each time a tacos order opens. Sandwiches use their listed filling; only tacos offer a meat selector.

Sandwich Dinde is priced at 25 DH, carried over from the replaced Turkey Club. Sauces available for every product: Biggy, Mayonnaise, Ketchup, Sauce piquante and Algérienne. Selecting no sauces sends “Sans sauce”.

Replacement photo sources: fried chicken sandwich — https://www.talabat.com/egypt/steaks-nshakes ; chicken bowl — https://www.solin.stream/recipes/96946/grilled-chicken-and-steamed-rice-bowl ; crispy bowl — https://fuego13.com/ .

## Product photo review

Every product has an explicit image assignment in `app.js`, used consistently in the menu, order dialog, and WhatsApp message. The three tacos sizes share an illustrative grilled French tacos photo; it does not represent exact portion sizes. Other photos show each item's relevant meat and format. External image availability could not be verified from this environment.

| Product | Photo source |
| --- | --- |
| Tacos Large / XL / XXL | https://wolt.com/en/bgr/sofia/restaurant/french-tacos-factory |
| Cheese Steak | https://mymiamigrill.com/menu/ |
| Sandwich Dinde | https://comerbeber.com/bocadillos |
| Sandwich Fried Chicken | https://www.talabat.com/egypt/steaks-nshakes |
| Sandwich Merguez | https://www.ollca.com/paris/boutiques/boucherie-jerry-levy/99f2899c-5efa-4f8e-b654-4387067076c9 |
| Sandwich Mix | https://www.ubereats.com/fr/store/food-76-kebab/GjXomClQREGmUAi8EGHayA |
| Texas Beef | https://wiltoncoffee.com/products/make-your-own-beef-burger |
| Chicken Burger | https://www.burgeron16.com/ |
| Cheese Burger / hero | Unsplash photo-1568901346375-23c9450c58cd |
| Burger Fried Chicken | https://www.swiggy.com/restaurants/good-flippin-burgers-andheri-lokhandwala-mumbai-854251/dineout |
| Bowl Chicken | https://www.solin.stream/recipes/96946/grilled-chicken-and-steamed-rice-bowl |
| Bowl Crispy | https://fuego13.com/ |

## Image resilience

Each photo has a matching local SVG illustration in `assets/images/`. If an external photo fails to load, the menu card, order popup and hero automatically switch to the illustration. Failed hosts are remembered for the current page session. Order messages use the displayed image URL, resolved against the website address; local file URLs are omitted when opening the page directly from disk.

External photos remain dependent on their original hosts. The bundled illustrations are labelled and do not require network access. Replace photo URLs in `app.js` with your own hosted photos for permanent product photography.
