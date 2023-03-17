import './BusinessImages.css'
const BusinessImages = ({ images }) => {
    if (!images || images.length === 0) {
        return null;
    }

    const previewImage = <img src={images[0].url} alt='house image' id='preview-image' />;
    const secondaryImages = images.slice(1, 5).map((image, index) => (
        <img src={image.url} alt='house image' className='secondary-image' key={index} />
    ));

    return (
        <div className='all-images'>
            <div className='preview-image'>{previewImage}</div>
            <div className='secondary-images'>
                {secondaryImages}
            </div>
        </div>
    );
};

export default BusinessImages;
