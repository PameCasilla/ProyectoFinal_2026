import React from 'react';
import { Col } from 'reactstrap';
import StarIcon from './StarIcon';

export default function RatingIcon(props) {
    const {
        index,
        rating,
        hoverRating,
        onMouseEnter,
        onMouseLeave,
        onSaveRating,
    } = props;
    const fill = React.useMemo(() => {
        if (hoverRating >= index) {
            return '#FCCC00';
        } else if (!hoverRating && rating >= index) {
            return '#FCCC00';
        }
        return 'none';
    }, [rating, hoverRating, index]);
    return (
        <Col
            className="cursor-pointer"
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave()}
            onClick={() => onSaveRating(index)}>
            <StarIcon fill={fill} />
        </Col>
    )
}