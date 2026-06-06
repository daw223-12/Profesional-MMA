import './Login.css'

function Login() {
  return (
    <main>
      <div>
        <h2>Registrarse</h2>
        <form>
          <label>Email
            <input type="email" id="email" name="email" />
          </label>
          <label>Nombre
            <input type="text" id="name" name="name" />
          </label>
          <label>Contraseña
            <input type="password" id="password" name="password" />
          </label>
          <label>Confirmar contraseña
            <input type="password" id="confirmPassword" name="confirmPassword" />
          </label>
          <button type="submit">Registrarse</button>
        </form>
      </div>
      <div>
        <h2>Iniciar sesión</h2>
        <form>
          <label>Email
            <input type="email" id="email" name="email" />
          </label>
          <label>Contraseña
            <input type="password" id="password" name="password" />
          </label>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </main>
  )
}

export default Login