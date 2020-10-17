// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const validacionEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', startApp);

    // Campos del FORM
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    // Reiniciar formulario
    btnReset.addEventListener('click', resetForm);
    
    // Enviar email
    btnEnviar.addEventListener('click', enviarEmail);
}

// Funciones
function startApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e){
    if (e.target.value.length > 0) {
        const borrarError =  document.querySelector('p.error');
        if (borrarError) {
            borrarError.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
    if (e.target.type === 'email') {        
        if (validacionEmailRegEx.test(e.target.value)) {
            const borrarError =  document.querySelector('p.error');
            if (borrarError) {
                borrarError.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500'); 
            mostrarError('El email no es válido');
        }
    }
    if (validacionEmailRegEx.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }else{
        mostrarError('Todos los campos son obligatorios');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mb-3', 'mt-0', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }
}

function enviarEmail(e){
    e.preventDefault();

    // Mostrar Spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Timer
    setTimeout(() => {
        spinner.style.display = 'none';

        const mensajeEmail = document.createElement('p');
        mensajeEmail.textContent = 'El mensaje se envió correctamente';
        mensajeEmail.classList.add('text-center', 'my-20', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Inserta el mensaje antes del spinner
        formulario.insertBefore(mensajeEmail, spinner);
        
        setTimeout(() => {
            mensajeEmail.remove();
            resetForm(e);
        }, 3500);
    }, 3000);
}

function resetForm(e) {
    e.preventDefault();
    formulario.reset();
    startApp();
    for (var i = 0; i < formulario.length; i++) {
        formulario[i].classList.remove("border-green-500");
        formulario[i].classList.remove("border-red-500");
    }
    const borrarError =  document.querySelector('p.error');
    if (borrarError) {
        borrarError.remove();
    }
}