import React, { useEffect, useState } from 'react';
import { Giphy_Services } from './Giphy.Services';

const Giphy_HomePage = () => {
    const [data, setdata] = useState([]);
    const [offset, setOffset] = useState(12);
    const [imagePreview, setimagePreview] = useState(null);

    useEffect(() => {
        Promise.all([Giphy_Services.getTrending(offset, 'g')]).then(result => {
            setdata(result[0].data);
        });
    }, []);

    const handleLoadMore = () => {
        Promise.all([Giphy_Services.loadMoreTrending(12, 'g', offset)]).then(result => {
            const newData = [...data, ...result[0].data];
            setdata(newData);
            setOffset(os => os + 12);
        });
    };

    const showModal = e => {
        const source = e.target.getAttribute('source');
        const modal = document.getElementById('previewModal');
        setimagePreview(source);
        modal.style.display = 'block';
    };

    const handleClose = () => {
        const modal = document.getElementById('previewModal');
        modal.style.display = 'none';
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Giphy Trending</h1>
            <div>
                {!!data && data.length > 0 ?
                    data.map(gif => (
                        <div className='gif-item' key={gif.slug}>
                            <img className='gif-image' onClick={showModal} alt={gif.title}
                                src={gif.images.preview_webp.url} source={gif.images.original.webp} />
                            <h4 className='gif-title' title={gif.title}>{gif.title}</h4>
                        </div>
                    ))
                    : null}
                <div className='button-loadmore' style={{ clear: 'both', textAlign: 'center' }}>
                    <button onClick={handleLoadMore}>Load More</button>
                </div>
                <div id='previewModal' className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={handleClose}>&times;</span>
                        <div className='image-preview'>
                            <img src={imagePreview}
                                width='100%'
                                height='100%'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Giphy_HomePage };
