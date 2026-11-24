const formulario = document.getElementById('formulario-notas');
const resultado = document.getElementById('resultado');
const mensajeError = document.getElementById('mensaje-error');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mensajeError.textContent = '';

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const camposNotas = [...document.querySelectorAll('.nota')];

  if (camposNotas.some(campo => campo.value.trim() === '')) {
    mensajeError.textContent = 'Debes ingresar las cinco notas para continuar.';
    return;
  }

  const notas = camposNotas.map(campo => Number(campo.value));
  if (notas.some(nota => !Number.isFinite(nota) || nota < 0 || nota > 5)) {
    mensajeError.textContent = 'Las notas deben estar dentro de la escala de 0.0 a 5.0.';
    return;
  }

  const sumaNotas = notas.reduce((suma, nota) => suma + nota, 0);
  const promedio = sumaNotas / 5;
  const aprobado = promedio >= 3.0;

  document.getElementById('resumen-estudiante').textContent = `${nombre} ${apellido}`;
  document.getElementById('resumen-correo').textContent = correo;
  document.getElementById('promedio').textContent = promedio.toFixed(2);

  const estado = document.getElementById('estado');
  estado.textContent = aprobado ? 'Aprobado' : 'Desaprobado';
  estado.className = `estado ${aprobado ? 'aprobado' : 'desaprobado'}`;

  resultado.classList.remove('oculto');
  resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.getElementById('nuevo-calculo').addEventListener('click', () => {
  formulario.reset();
  resultado.classList.add('oculto');
  mensajeError.textContent = '';
  document.getElementById('nombre').focus();
});
