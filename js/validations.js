export function valida (input){
    const tipoDeInput = input.dataset.type;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError (tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El nombre es obligatorio",
    }, 
    email: {
        valueMissing: "El email es obligatorio",
        typeMismatch: "El email debe ser válido",
    },
    password: {
        valueMissing: "El password es obligatorio",
        patternMismatch: "Mínimo 6 caracteres, máximo 18. Debe contener una letra mayúscula, mínimo un número y un carácter especial (@$!%*#?&)"
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento es obligatoria",
        customError: "Debes ser mayor de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El número debe tener 10 dígitos",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Verifica que la dirección sea correcta",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Verifica que la ciudad sea correcta",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Verifica que el estado sea correcto",
    },

}; 

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError (tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach (error =>{
        if (input.validity[error]){

            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento (input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (! mayorDeEdad(fechaCliente)){
        mensaje = "Debes ser mayor de edad";
    }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getFullYear() + 18,
        fecha.getMonth(),
        fecha.getDate()
    );
  return diferenciaFechas <= fechaActual;
}

    


