import './EventCard.css'

function EventCard(
  {
    title = "Fight",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image,
    date
  }) {
  return (
    <div className="card">
      {(image || date != undefined) && (
        <div className="card-hero">
          {image != undefined && (
            <div className="card-image">
              <img src={image} alt={title} />
            </div>
          )}
          {date != undefined && (
            <div className="card-date">
              <p>{date && new Date(date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short'
                  })}
              </p>
            </div>
          )}
        </div>
      )}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default EventCard