
function toggleSection(section) {
    const content = document.getElementById(`section-${section}`);
    console.log(`Se está alternando la visibilidad de la sección: ${section}`);
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

let evolucionGuardada = false;
let diagnosticoGuardado = false;

function guardarEntrada(section) {
    console.log(`Guardando entrada para la sección: ${section}`);

    if (section === 'evoluciones') {
        const descripcion = quill.root.innerHTML;
        document.getElementById('evolucion_descripcion').value = descripcion;
        evolucionGuardada = true;
        console.log("Evolución guardada:", descripcion);
    } else if (section === 'diagnostico') {
        diagnosticoGuardado = true;
        console.log("Diagnóstico guardado.");
    }

    // Desactivar el botón de guardar correspondiente después de guardar
    const saveButton = document.querySelector(`#section-${section} .button-group button:first-child`);
    saveButton.disabled = true;

    // Habilitar el botón "Finalizar Atención" solo si Evolución y Diagnóstico están guardados
    const finalizarButton = document.getElementById('btn-finalizar-atencion');
    finalizarButton.disabled = !(evolucionGuardada && diagnosticoGuardado);

    
}

function cancelarEntrada(section) {
    console.log(`Cancelando entrada para la sección: ${section}`);
    if (section === 'evoluciones') {
        quill.root.innerHTML = '';
    } else {
        // Limpiar el contenido de otros campos de texto y áreas de texto
        const content = document.getElementById(`section-${section}`);
        const inputs = content.querySelectorAll('input, textarea');
        inputs.forEach(input => input.value = '');
        console.log(`Se limpiaron los campos de la sección: ${section}`);
    }

    // Volver a activar el botón de guardar en caso de que se quiera ingresar otro dato
    const saveButton = document.querySelector(`#section-${section} .button-group button:first-child`);
    saveButton.disabled = false;
    console.log(`Se habilitó el botón de guardar para la sección: ${section}`);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("El DOM está completamente cargado.");
    quill = new Quill('#editor-evolucion', {
        theme: 'snow'
    });
});
