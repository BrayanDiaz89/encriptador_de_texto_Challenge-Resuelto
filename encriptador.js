/*Variables*/

/*Funciones*/

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.textContent = texto;
    return;
}

function limpiarTextarea(){
    document.getElementById('img__encriptado').style.display = 'block';
    document.getElementById('subtitulo__encriptado').style.display = 'block';
    document.getElementById('texto_encriptado_provicional').style.display = 'block';
    document.getElementById('texto__encriptado').style.display = 'none';
    document.getElementById('copiar').style.display = 'none';
    document.getElementById('textoUsuario').value = '';
}

function ver_ElementosEncriptacion(){
    document.getElementById('texto__encriptado').style.display = 'block';
    document.getElementById('copiar').style.display = 'block';
}

function ocultarElementos(){
    document.getElementById('img__encriptado').style.display= 'none';
    document.getElementById('subtitulo__encriptado').style.display= 'none';
    document.getElementById('texto_encriptado_provicional').style.display= 'none';
    ver_ElementosEncriptacion();
}

function encriptarTexto(texto) {
    // Reglas de encriptación
    const reglasEncriptacion = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    // Reemplazar las letras según las reglas
    let textoEncriptado = texto.replace(/[eioua]/g, (letra) => reglasEncriptacion[letra]);

    return textoEncriptado;
}

function validarYEncriptar() {
    let textarea = document.getElementById("textoUsuario");
    let texto = textarea.value;

    // Verificar si el textarea está vacío
    if (texto.trim() === "") {
        swal('Encriptar texto','Campo vacío. Ingrese un texto a encriptar.', 'warning');
        return;
    }

    // Verificar si hay mayúsculas o caracteres especiales
    let regex = /^[a-z0-9\s]+$/;
    if (!regex.test(texto)) {
        swal('Encriptar texto','El texto contiene mayúsculas o caracteres especiales. Por favor, corríjalo.', 'error');
        return;
    }

    // Verificar si el texto contiene al menos una vocal para poder encriptar
    let contieneVocal = /[eioua]/.test(texto);
    if (!contieneVocal) {
        swal('Encriptar texto','No es posible encriptar el texto, debe tener al menos una vocal.', 'warning');
        return;
    }

    // Encriptar el texto y asignarlo al elemento especificado
    let textoEncriptado = encriptarTexto(texto);
    ocultarElementos();
    asignarTextoElemento("#texto__encriptado", textoEncriptado);
}

function copiarTextoEncriptado() {
    // Obtener el elemento que contiene el texto encriptado
    const textoEncriptadoElement = document.getElementById("texto__encriptado");
    const textoEncriptado = textoEncriptadoElement.textContent;

    // Utilizar el API del portapapeles para copiar el texto
    navigator.clipboard.writeText(textoEncriptado).then(() => {
        swal('Copiar texto','Texto copiado al portapapeles', 'success');
        document.getElementById('pegar').removeAttribute('disabled');
    }).catch(err => {
        swal('Copiar texto','Hubo un problema al copiar el texto', 'error');
    });
}

// Función para pegar el texto del portapapeles en el textarea
function pegarTexto() {
    // Verificar si el navegador soporta el API del portapapeles
    if (!navigator.clipboard) {
        swal('Pegar texto','El navegador no soporta la API del portapapeles', 'error');
        return;
    }

    // Intentar leer el texto del portapapeles
    navigator.clipboard.readText().then(texto => {
        // Verificar si hay algo copiado en el portapapeles
        if (texto === "") {
            swal('Pegar texto','No hay nada copiado en el portapapeles','warning');
        } else {
            // Pegar el texto en el textarea con el id textoUsuario
            document.getElementById("textoUsuario").value = texto;
        }
    }).catch(err => {
        swal('Pegar texto', 'Hubo un problema al pegar el texto: ', 'error' + err);
    });
}

function desencriptarTexto(textoEncriptado) {
    // Reglas de desencriptación
    const reglasDesencriptacion = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    // Reemplazar las cadenas según las reglas
    let textoDesencriptado = textoEncriptado;
    for (const [encriptado, letra] of Object.entries(reglasDesencriptacion)) {
        const regex = new RegExp(encriptado, 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, letra);
    }

    return textoDesencriptado;
}

function desencriptarYMostrar() {
    // Obtener el texto encriptado del textarea
    let textoEncriptado = document.getElementById("textoUsuario").value.trim();

    // Verificar si el textarea está vacío
    if (textoEncriptado === "") {
        swal('Desencriptar texto', 'Campo vacío. Por favor, escriba algo o encripte un texto.', 'warning');
        return;
    }

    // Verificar si hay mayúsculas o caracteres especiales
    let regex = /^[a-z0-9\s]+$/;
    if (!regex.test(textoEncriptado)) {
        swal('Desencriptar texto','El texto contiene mayúsculas o caracteres especiales. Por favor, corríjalo.', 'error');
        return;
    }

    // Verificar si el texto en el textarea contiene alguna de las cadenas encriptadas
    const contieneCadenasEncriptadas = /enter|imes|ai|ober|ufat/.test(textoEncriptado);
    if (!contieneCadenasEncriptadas) {
        swal('Desencriptar texto', 'El texto ingresado no está encriptado, corrígelo.', 'warning');
        return;
    }

    try {
        // Desencriptar el texto del textarea
        let textoDesencriptado = desencriptarTexto(textoEncriptado);

        // Mostrar el texto desencriptado en el elemento con id "texto__encriptado"
        ocultarElementos();
        asignarTextoElemento("#texto__encriptado", textoDesencriptado);

    } catch (error) {
        swal('Desencriptar texto', 'Error al desencriptar el texto: ', 'error' + error.message); // Mostrar detalle del error
    }
}
















