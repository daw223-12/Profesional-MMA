import Card from '../../../components/card/Card'
import './Home.css'

function Home() {

  return (
    <>
      <Card date={new Date()} />
      <Card date={new Date()} image={"./assets/ruby.webp"} />
      <Card date={new Date()} image={"./assets/ruby.webp"} />
      <Card date={new Date()} image={"./assets/ruby.webp"} />
      <Card date={new Date()} image={"./assets/ruby.webp"} />
    </>
  )
}

export default Home