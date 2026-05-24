import React from 'react';
import { Card, CardBody, CardTitle, CardFooter, CardText } from 'reactstrap';
import './styles/reviewsStyles.css';

const Reviews = props => {
    const { review } = props;
    return (
        <Card>
            <CardBody className="cardBodyStyles">
                <div className="icon icon-primary">
                    <span>
                        <CardText className="text" style={{ fontSize: 18 }}>
                            <i className="fa fa-quote-left" style={{ fontSize: 20, color: '#34B18A' }} />
                            {'    '}{review.comment}{'    '}
                            <i className="fa fa-quote-right" style={{ fontSize: 20, color: '#34B18A' }} />
                        </CardText>
                    </span>
                </div>
                <CardFooter>
                    <CardTitle className="name"> {review.renterEmail}</CardTitle>
                </CardFooter>
            </CardBody>
        </Card>
    )
}

export default Reviews;
