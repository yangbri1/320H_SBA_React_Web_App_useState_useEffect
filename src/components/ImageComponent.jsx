import React, { useRef, useState } from 'react';

const ImageComponent = ({src}) => {
    const image = useRef(null);
    const [valid, setValid] = useState(true);

    const checkValid = () => {
        if (!image.current.complete || image.current.naturalWidth < 1 || image.current.naturalHeight < 1) setValid(false);
    }

    if (valid) {
        return (
            <img
                src={src}
                onLoad={checkValid}
                onError={() => setValid(false)}
                ref={image} 
            />
        );
    }

    return(
        <>
            {/* <div>Image not valid</div>; */}
            <div className="column">
                <img src={"https://tenor.com/view/pato-caminando-cheli-gif-24693863"} id="duck" name="duck" alt="duck" />
            </div>
        </> 
    )
};