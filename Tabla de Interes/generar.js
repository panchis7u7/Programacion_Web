function generate(boton){
  let initDep = parseFloat(boton.form.elements['depInicial'].value);
  let tasaInt = parseFloat(boton.form.elements['tasaInteres'].value);
  let crec = boton.form.elements['crecimiento'].value;
  let tabla = document.getElementById('res');
  let startingVal = initDep;
  let tasa = parseFloat(tasaInt / 100);
  tabla.style.display = 'block';
  for (var i = 1; i <= crec; i++) {
    let fila = tabla.insertRow(i);
    fila.insertCell(0).innerHTML = i;
    fila.insertCell(1).innerHTML = '$' + startingVal;
    fila.insertCell(2).innerHTML = '$' + (startingVal * tasa);
    fila.insertCell(3).innerHTML = '$' + (startingVal += startingVal * tasa);
  }
}
