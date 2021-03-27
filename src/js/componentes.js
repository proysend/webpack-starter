import '../css/componentes.css';

export const saludar = (nombre) => { //utilizando la sentencia "export" al iniciar la funcion, permite que pueda ser utilizada fuera de la clase js
    console.log('Creando Etiqueta h1, en el html');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${nombre}`;

    document.body.append(h1);
}