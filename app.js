// Replace these image URLs with your own product photography whenever ready.
const images = {
  tacos: 'https://imageproxy.wolt.com/assets/682b8cf20c78421ac092b5e1',
  cheeseSteak: 'https://mymiamigrill.com/wp-content/uploads/2020/09/original-philly-cheesesteak.png.webp',
  turkeySandwich: 'https://comerbeber.com/archivos/imagen/2020/07/bodcadillo-fiambre-pavo-ensalada.jpg',
  friedSandwich: 'https://images.deliveryhero.io/image/talabat/MenuItems/Zinger_Sandwich638338494759218194.jpg',
  merguezSandwich: 'https://images.ollca.com/fit-in/544x408/ollca/shop/fba81123-54f8-4b49-81ca-abcc3aa6c362/99f2899c-5efa-4f8e-b654-4387067076c9/48209419-98a1-4ccf-8f9a-9ba6f6c7825a.png',
  mixSandwich: 'https://tb-static.uber.com/prod/image-proc/processed_images/7761a0b5e8b266b65f478643dbc6a902/70aa2a4db7f990373ca9c376323e3dea.jpeg',
  beefBurger: 'https://wiltoncoffee.com/cdn/shop/files/BURGERMAKEYOUROWN.jpg?v=1742278926&width=900',
  chickenBurger: 'https://www.burgeron16.com/assets/imgs/17.png',
  cheeseBurger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
  friedBurger: 'https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/v1710146024/71bbfcf50ac62c8a11bb44a89d86c21a.jpg',
  chickenBowl: 'https://res.cloudinary.com/solin-fitness/image/upload/c_scale%2Cw_500%2Cq_auto%2Cf_auto/single-meal-images/zdzgka11mzfkm3lmffrw',
  crispyBowl: 'https://fuego13.com/storage/253/Krousty-Classic.webp'
};
// Local, product-specific illustrations remain available when a photo host fails.
const imageFallbacks = new Map(Object.entries(images).map(([key, url]) => [url, `assets/images/${key}.svg`]));
const failedPhotos = new Set();
function productPhoto(product) {
  return failedPhotos.has(product.image) ? imageFallbacks.get(product.image) : product.image;
}
function recoverImage(img) {
  if (img.tagName !== 'IMG' || img.dataset.fallbackUsed) return;
  const original = img.getAttribute('src');
  const fallback = img.dataset.fallback || imageFallbacks.get(original);
  if (!fallback) return;
  failedPhotos.add(original);
  img.dataset.fallbackUsed = 'true';
  img.alt = img.alt.replace('Photo illustrative', 'Illustration');
  img.src = fallback;
  if (selected && original === selected.image) updateOrder();
}
document.addEventListener('error', event => recoverImage(event.target), true);

const products = [
  {name:'Tacos Large',image:images.tacos,category:'tacos',price:20,description:'Un tacos généreux avec la viande de votre choix.',custom:true,tag:'LE CLASSIQUE'},
  {name:'Tacos XL',image:images.tacos,category:'tacos',price:30,description:'Encore plus de gourmandise, avec la viande de votre choix.',custom:true,tag:'GRANDE FAIM'},
  {name:'Tacos XXL',image:images.tacos,category:'tacos',price:40,description:'Le format XXL pour les grandes envies. Choisissez votre viande.',custom:true,tag:'FORMAT XXL'},
  {name:'Cheese Steak',image:images.cheeseSteak,category:'sandwich',price:25,description:'Le sandwich spécial Texas au steak et au fromage.'},
  {name:'Sandwich Dinde',image:images.turkeySandwich,category:'sandwich',price:25,description:'Un sandwich gourmand à la dinde.',filling:'Dinde'},
  {name:'Fried Chicken',category:'sandwich',price:30,description:'Un sandwich au poulet frit, croustillant et généreux.',image:images.friedSandwich,filling:'Poulet crispy'},
  {name:'Sandwich Merguez',image:images.merguezSandwich,category:'sandwich',price:20,description:'Un sandwich gourmand à la merguez.'},
  {name:'Sandwich Mix',image:images.mixSandwich,category:'sandwich',price:25,description:'Steak, poulet et merguez : le trio Texas dans un sandwich.'},
  {name:'Texas Beef',image:images.beefBurger,category:'burger',price:35,description:'Le burger Texas au bœuf. Une bonne dose de gourmandise.',tag:'TEXAS FAVORITE'},
  {name:'Chicken Burger',category:'burger',price:35,description:'Un généreux burger au poulet.',image:images.chickenBurger},
  {name:'Cheese Burger',image:images.cheeseBurger,category:'burger',price:25,description:'Le classique burger au bœuf et au fromage.'},
  {name:'Fried Chicken',category:'burger',price:25,description:'Un burger au poulet frit pour les amateurs de croustillant.',image:images.friedBurger},
  {name:'Bowl Chicken',image:images.chickenBowl,category:'bowl',price:30,description:'Un bowl gourmand au poulet.'},
  {name:'Bowl Crispy',category:'bowl',price:35,description:'Un bowl généreux au poulet crispy.',image:images.crispyBowl,tag:'CRUNCH TIME'}
];
const labels = {tacos:'Tacos',sandwich:'Sandwich spécial Texas',burger:'Texas Burgers',bowl:'Bowls'};
const grid = document.querySelector('#menu-grid');
const dialog = document.querySelector('#order-dialog');
const quantity = document.querySelector('#quantity');
const filling = document.querySelector('#filling');
const sauceInputs = [...document.querySelectorAll('input[name="sauce"]')];
let selected;
let orderScrollPosition = 0;
document.querySelector('#product-count').textContent = products.length;
function render(filter='all') {
  grid.innerHTML = products.map((p,index) => ({...p,index})).filter(p => filter==='all'||p.category===filter).map(p => `<article class="food-card"><button class="food-image" data-product="${p.index}" aria-label="Commander ${p.name}, ${p.price} DH"><img src="${productPhoto(p)}" data-fallback="${imageFallbacks.get(p.image)}" alt="Photo illustrative : ${p.name}" loading="lazy" decoding="async" width="600" height="375">${p.tag?`<span class="card-tag">${p.tag}</span>`:''}<span class="image-arrow">↗</span></button><div class="card-body"><p class="card-category">${labels[p.category]}</p><div class="card-title"><h3>${p.name}</h3><strong>${p.price}<small> DH</small></strong></div><p class="description">${p.description}</p><button class="order-button" data-product="${p.index}">Choisir & commander <span>↗</span></button></div></article>`).join('');
}
function updateOrder() {
  const count = Math.max(1,Math.min(99,parseInt(quantity.value,10)||1));
  const sauces = sauceInputs.filter(input => input.checked).map(input => input.value);
  const photoUrl = new URL(productPhoto(selected), document.baseURI);
  const photoLine = photoUrl.protocol === 'file:' ? '' : `\nPhoto : ${photoUrl.href}`;
  const text = `Bonjour TEXAS ! Je souhaite commander :\n\n${count} × ${selected.name} (${labels[selected.category]})${selected.custom?'\nChoix de viande : '+filling.value:''}\nSauces : ${sauces.length ? sauces.join(', ') : 'Sans sauce'}\nPrix unitaire : ${selected.price} DH\nTotal : ${selected.price*count} DH\n\nDescription : ${selected.description}${photoLine}\n\nMerci de me confirmer la disponibilité et les détails de la commande.`;
  document.querySelector('#order-total').textContent = `${selected.price*count} DH`;
  document.querySelector('#send-order').href = `https://wa.me/212658943901?text=${encodeURIComponent(text)}`;
}
grid.addEventListener('click',e => {
  const button=e.target.closest('[data-product]'); if(!button)return;
  selected=products[Number(button.dataset.product)];
  document.querySelector('#order-title').textContent=selected.name;
  document.querySelector('#order-category').textContent=labels[selected.category];
  document.querySelector('#order-description').textContent=selected.description;
  const orderImage = document.querySelector('#order-image');
  delete orderImage.dataset.fallbackUsed;
  orderImage.dataset.fallback = imageFallbacks.get(selected.image);
  orderImage.src = productPhoto(selected);
  document.querySelector('#order-image').alt=`Photo illustrative : ${selected.name}`;
  document.querySelector('#filling-field').hidden=!selected.custom;
  sauceInputs.forEach(input => { input.checked = false; });
  filling.value = 'Kafta';
  quantity.value=1; updateOrder();
  orderScrollPosition = window.scrollY;
  document.body.style.top = `-${orderScrollPosition}px`;
  document.body.classList.add('order-open');
  dialog.showModal();
  dialog.scrollTop = 0;
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render(button.dataset.filter);
}));
quantity.addEventListener('input',updateOrder);
quantity.addEventListener('change',()=>{quantity.value=Math.max(1,Math.min(99,parseInt(quantity.value,10)||1));updateOrder();});
filling.addEventListener('change',updateOrder);
sauceInputs.forEach(input => input.addEventListener('change',updateOrder));
for(const [id,delta] of [['minus',-1],['plus',1]])document.querySelector('#'+id).addEventListener('click',()=>{quantity.value=Math.max(1,Math.min(99,(parseInt(quantity.value,10)||1)+delta));updateOrder();});
dialog.addEventListener('close', () => {
  document.body.classList.remove('order-open');
  document.body.style.top = '';
  window.scrollTo({top: orderScrollPosition, behavior: 'instant'});
});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
render();
document.querySelectorAll('img').forEach(img => {
  if (img.complete && img.naturalWidth === 0) recoverImage(img);
});
