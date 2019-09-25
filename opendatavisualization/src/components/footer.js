import React from 'react';

let year = new Date().getFullYear();

function Footer() {

    return (
    <div className={'footer'}>
        <h4 className={"center"}>Made with love by Fearless. Updated {year}</h4>
    </div>
    )
}
export default Footer;