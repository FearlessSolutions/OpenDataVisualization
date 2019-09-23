import React from 'react';

var year = new Date(). getFullYear();

function Footer() {
    return (
    <div className={'footer'}>
        <h4>Made with love by Fearless. Updated {year}</h4>
    </div>
    )
}
export default Footer;