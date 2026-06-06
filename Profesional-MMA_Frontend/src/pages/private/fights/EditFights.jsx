import './EditFights.css'

function EditFights() {

  return (
    <>
      <form>
        <div>
          <h2>Luchadores</h2>
          <div id="fighters">
            <label>
              Luchador esquina roja
              <input name="redFighter" type="text" placeholder='Nombre del luchador esquina roja' />
            </label>
            <label>
              Luchador esquina azul
              <input name="blueFighter" type="text" placeholder='Nombre del luchador esquina azul' />
            </label>
          </div>
        </div>
        <input name="fightDate" type="date" placeholder='Fecha del combate' />
        <div><h2>Ganador</h2>
          <label><input type="radio" name="result" value="red" /> Luchador esquina roja</label>
          <label><input type="radio" name="result" value="blue" /> Luchador esquina azul</label>
        </div>
      </form>
    </>
  )
}

export default EditFights