import React from "react"
import Editable from '../components/Editable';

const style = {
    img: {
        height: "100px",
        border: "1px solid red"
    }, additionalImg: {
        height: "50px",
        border: "1px solid red"
    },
    listWithoutDots: {
        listStyleType: "none"
    },
    boldText: {
        fontWeight: 700
    }
}

const createReactFromItem = (props) => {
    // product specific constants
    const title = <Editable><h1>{props.item.title}</h1></Editable>;
    const price_value = <Editable><span>{props.item.price.convertedFromValue}</span></Editable>;
    const price_currency = <Editable><span>{props.item.price.convertedFromCurrency}</span></Editable>
    const price = <p>{price_value} {price_currency}</p>
    const description = <Editable><p>{props.item.shortDescription}</p></Editable>
    const images = [props.item.image, ...props.item.additionalImages]
    const image = <img style={style.img} src={props.item.image.imageUrl} alt="" />;
    const additionalImages = props.item.additionalImages.map((image, i) => <li key={i}><img style={style.additionalImg} src={image.imageUrl} alt="" /></li>);
    const localizedAspects = props.item.localizedAspects.map((aspect, i) => <li key={i}><span style={style.boldText}>{aspect.name}:</span> <Editable><span>{aspect.value}</span></Editable></li>);
    const seller = props.item.seller;
    const imageSlideshow = images.map((image, i) => { return <span><dt tabindex={i}> <a href={`#img${i}`}><img src={image.imageUrl} /></a></dt><dd id={`img${i}`} style={{ opacity: "1 !important" }}><img src={image.imageUrl} /></dd></span> })

    return (
        // <span>
        //     {title}
        //     <div>
        //         {price}
        //     </div>
        //     {description}
        //     {image}
        //     <ul style={style.listWithoutDots}>{additionalImages}</ul>
        //     <ul style={style.listWithoutDots}>{localizedAspects}</ul>
        // </span>

        // )

        // <div>
        //     <head>
        //         <meta charset="utf-8" />
        //         <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slideshow.css" />
        //         <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/template_1.css" />
        //         <title>demIT eBay Description Generator</title>
        //     </head>

        //     <body>
        //         <div class="nav">
        //             <input type="checkbox" id="nav-check" />
        //             <div class="nav-header">
        //                 <div class="nav-title"> {seller.username} </div>
        //             </div>
        //             <div class="nav-btn">
        //                 <label for="nav-check">
        //                     <span></span>
        //                     <span></span>
        //                     <span></span>
        //                 </label>
        //             </div>
        //             <div class="nav-links">
        //                 <a href={`https://www.ebay.de/usr/${seller.username}`} target="_blank">Shop</a>
        //                 <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller.username}`} target="_blank">Bewertungen</a>
        //                 <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&requested=${seller.username}`} target="_blank">Kontakt</a>
        //             </div>
        //         </div>
        //         <div class="body-wrap">
        //             <div class="wrap">
        //                 <div class="column-wrapper container">
        //                     <div class="column more-top-padding-mobile">
        //                         <center>
        //                             {/* {image}
        //                             {additionalImages} */}
        //                             <dl id="simple-gallery">
        //                                 {/* {allImagesForSlideshow} */}
        //                                 {/* {primaryImageForSlideshow} */}
        //                                 {/* {imagesToDisplay} */}
        //                                 {imageSlideshow}
        //                             </dl>
        //                         </center>
        //                     </div>
        //                     <div class="column less-top-padding">
        //                         <div class="elem">
        //                             <h2 id="title">{title}</h2>
        //                         </div>
        //                         <div class="elem">
        //                             <h2 id="highlights">Beschreibung</h2>
        //                             {description}
        //                         </div>
        //                         <div class="elem">
        //                             <h2 id="highlights">Highlights</h2>
        //                             {localizedAspects}
        //                         </div>
        //                         <div class="column-wrapper-small elem">
        //                             <div class="column-small">
        //                                 <h2>{price}</h2>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </body >
        // </div>
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slider.css" />
            </head>
            <body>
                <div id="wrapper">
                    <div class="slider">
                        {images.map((image, i) => {
                            return (<input type="radio" name="slider" id={`slide${i}`} selected="false" />)
                        })}
                        <div class="slides">
                            {images.map((image, i) => {
                                return (<div class="slide">
                                    <img style={{ objectFit: "scale-down" }} height="400" width="600" src={image.imageUrl} />
                                </div>)
                            })}
                        </div>
                        <div class="nav">
                            {images.map((image, i) => {
                                return <label class="bottom" for={`slide${i}`}></label>
                            })}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}

export default createReactFromItem