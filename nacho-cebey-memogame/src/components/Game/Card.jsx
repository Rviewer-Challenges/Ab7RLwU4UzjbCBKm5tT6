import PropTypes from 'prop-types';

const Card = ({ index, image, id, onClick, disabled, cardRef }) => {

    return (
        <div
            className={`card ${disabled ? "disabled" : ""}`}
            onClick={() => onClick(index, id)}
            ref={cardRef}
        >
            <div className="card-inner">
                <div className="card-front" />
                <div
                    className="card-back"
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                />
            </div>
        </div>
    );
};

Card.propTypes = {
    index: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    cardRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
};

export default Card;
