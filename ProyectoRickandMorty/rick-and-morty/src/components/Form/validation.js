// Función de validación para el formulario
export function validateForm({ email, password }) {
  // Inicializa un objeto para almacenar los mensajes de error
  const errors = {};

  // Validar el email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!email) {
    errors.email = 'El campo no puede estar vacío.';
  } 
  if (!emailRegex.test(email)) {
    errors.email = 'El nombre de usuario debe ser un email válido.';
  }
  if (email.length >= 35) {
    errors.email = 'El nombre de usuario no puede tener más de 35 caracteres.';
  }

  // Validar la contraseña
  const passwordRegex = /^(?=.*\d).{6,10}$/;
  if (!password) {
    errors.password = 'El campo no puede estar vacío.';
  }
  if (!passwordRegex.test(password)) {
    errors.password = 'La contraseña debe tener al menos un número y una longitud entre 6 y 10 caracteres.';
  }

  // Devuelve el objeto de errores (si está vacío, significa que no hay errores)
  return errors;
}

