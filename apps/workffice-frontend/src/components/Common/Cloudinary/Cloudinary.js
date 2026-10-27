import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import PropTypes from "prop-types";

const DEFAULT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IiNkZGQiLz48Y2lyY2xlIGN4PSI4IiBjeT0iNiIgcj0iMyIvPjxwYXRoIGQ9Ik0yIDE2YTYgNiAwIDAgMSAxMiAwIi8+PC9zdmc+';

export const Cloudinary = ({ publicId, width, height, cloudinaryProps, className }) => {
    const isPasswordHash = /^\$2[aby]\$\d{2}\$/.test(publicId || '');
    const imageSource = isPasswordHash ? DEFAULT_IMAGE : publicId || DEFAULT_IMAGE;

    if (imageSource.startsWith('data:image/')) {
        return <img src={imageSource} className={className} alt="" width={width} height={height} />;
    }

    return <CloudinaryContext cloudName="workffice" style={{display: 'flex', justifyContent: 'center'}}>
        <Image publicId={imageSource} className={className} width={width} height={height}>
            <Transformation height={height} width={width} {...cloudinaryProps} />
        </Image>
    </CloudinaryContext>
}


Cloudinary.propTypes = {
    publicId: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cloudinaryProps: PropTypes.object,
    className: PropTypes.string,
}
