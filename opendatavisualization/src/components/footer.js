import React from 'react';

var year = new Date(). getFullYear();

function Footer() {
    return (
    <div className={'footer'}>
        <h1>Made with love by Fearless. Updated {year}</h1>
    </div>
    )
}
export default Footer;