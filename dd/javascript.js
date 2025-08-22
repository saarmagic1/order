window.onload = function(){
  window.orderList = document.getElementById('orderList');
  window.openMenu = 'bizkes';
  window.currentItem = '';
}

window.showMenu = function(menuId, btn){
  if(window.openMenu && window.openMenu !== menuId){
    document.getElementById(window.openMenu).style.display='none';
    document.querySelector('.category-btn.active').classList.remove('active');
  }
  document.getElementById(menuId).style.display='flex';
  btn.classList.add('active');
  window.openMenu = menuId;
}

window.openModal = function(item){
  window.currentItem = item;
  document.getElementById('modalTitle').innerText = item;
  document.getElementById('modal').style.display = 'block';
  
  const bunSelect = document.getElementById('modalBun');
  bunSelect.innerHTML = '';
  const buns = (item === "המבורגר") ? ["רגילה","חלבית"] : ["חלבית","רגילה"];
  buns.forEach(b => { let opt = document.createElement('option'); opt.value=b; opt.text=b; bunSelect.add(opt); });
  bunSelect.value = buns[0];

  const ingredients = ['lettuce','onion','pickles','cheese','sauce'];
  const extras = ['lettuceExtra','onionExtra','picklesExtra','cheeseExtra','sauceExtra'];

  ingredients.forEach((id,i)=>{
    const el = document.getElementById(id);
    const ex = document.getElementById(extras[i]);
    if(item==="המבורגר"){ el.checked = false; } else { el.checked = true; }
    ex.checked = false;
    el.onchange = function(){ if(el.checked) ex.disabled=false; };
    ex.onchange = function(){ if(ex.checked) el.checked=false; };
  });
}

window.closeModal = function(){ document.getElementById('modal').style.display='none'; }

window.addModalOrder = function(){
  let selected = [];
  const extrasMap = {
    lettuceExtra:"אקסטרה חסה",
    onionExtra:"אקסטרה בצל",
    picklesExtra:"אקסטרה מלפפון",
    cheeseExtra:"אקסטרה גבינה",
    sauceExtra:"אקסטרה רוטב",
    ketchup:"קטשופ",
    mayo:"מיונז",
    bbq:"רוטב ברביקיו",
    mustard:"חרדל",
    sriracha:"סרירצה"
  };
  if(document.getElementById('lettuce').checked) selected.push("חסה");
  if(document.getElementById('onion').checked) selected.push("בצל");
  if(document.getElementById('pickles').checked) selected.push("מלפפון חמוץ");
  if(document.getElementById('cheese').checked) selected.push("גבינה");
  if(document.getElementById('sauce').checked) selected.push("רוטב סודי");
  for(const id in extrasMap){ if(document.getElementById(id).checked) selected.push(extrasMap[id]); }
  if(selected.length===0) selected.push("ללא מרכיבים");
  const details=`מנה: ${window.currentItem}, לחמנייה: ${document.getElementById('modalBun').value}, מרכיבים: ${selected.join(", ")}`;
  const li=document.createElement('li'); li.textContent=details; window.orderList.appendChild(li);
  window.closeModal();
}

window.addToOrder = function(item){
  const li=document.createElement('li'); li.textContent=item; window.orderList.appendChild(li);
}

window.sendOrder = function(){
  if(window.orderList.children.length===0){ alert("לא נבחרו פריטים"); return; }
  let msg = Array.from(window.orderList.children).map(li=>li.textContent).join("\n");
  const phone = "0532320017";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}
