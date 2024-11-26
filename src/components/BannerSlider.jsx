import React from 'react';
import Carousel from 'react-material-ui-carousel'
import imageAmoEvent from "../assets/events/amo-beauty-and-the-beast.png"
import imageQuangHungEvent from "../assets/events/quang-hung-fmt-3.webp"

export default function BannerSlider(props)
{

    return (
        <Carousel>
            <img style={{width: "100%", height: "500px", objectFit: "cover"}} src={imageQuangHungEvent} alt="Quang Hùng MasterD - The 1st Fan Meeting in Vietnam 2024"/>
            <img style={{width: "100%", height: "500px", objectFit: "cover"}} src={imageAmoEvent} alt='[HCM] Family show: "Beauty and the Beast" | THE UK PANTO'/>
        </Carousel>
    )
}

// function Item(props)
// {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }