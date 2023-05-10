import '../styles/home.css'
export default function ImageHolder(props)
{
    return (
        <div className="imageDiv">
            <img className = "sbuImage"src = {props.imgSrc}></img>
            <span className="names">{props.name}</span>
            <span className="names">{props.email}</span>
        </div>
    )
}