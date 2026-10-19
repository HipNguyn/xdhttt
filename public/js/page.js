const role=document.body.dataset.role;
if(App.guard(role)){
  const script=document.createElement('script');
  script.src=role==='admin'?'/js/admin/app.js':'/js/shipper/app.js';
  document.head.append(script);
}