const productList = document.querySelector('#product-list');
  
  function RenderProduct(doc){
     let li = document.createElement('li');
     let name = document.createElement('span');
     let price = document.createElement('span');

     li.setAttribute('data-id',doc.id);
     name.textContent = doc.data().ProName;
     price.textContent = doc.data().price;
     li.appendChild(name)
     li.appendChild(price)

     productList.appendChild(li);
     
  }

  db.collection('product').get().then((snapshot)=>{
    
    snapshot.doc.forEach(doc=>{
       console.log(doc.data());
       RenderProduct(doc);
    })
  })