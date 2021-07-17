import { Image } from "./Thumn.styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const Thumb = ({image, movieId, clickable}) => (
    <>
        {clickable ? (
            <Link to={`/${movieId}`}>
                <Image src={image} alt='movie-thumb'/>
            </Link>
        ) : (
            <figure>
                <Image src={image} alt='movie-thumb'/>
            </figure>
        )
        }
    </>
)

Thumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool
}
export default Thumb;