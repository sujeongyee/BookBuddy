import './main.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={process.env.PUBLIC_URL + '/imgs/loading.gif'} alt="loading" />
    </div>
  )
}
export default Loading