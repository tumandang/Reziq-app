import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({
    className = '',
    inverted = false,
    ...props
}: ImgHTMLAttributes<HTMLImageElement> & { inverted?: boolean }) {
    const light = inverted ? '/img/RezeqiLogoWhite.png' : '/img/LogoRezeqi.png';
    const dark = inverted ? '/img/LogoRezeqi.png' : '/img/RezeqiLogoWhite.png';

    return (
        <>
            <img src={light} alt="Rezeqi" className={`block dark:hidden ${className}`} {...props} />
            <img src={dark} alt="Rezeqi" className={`hidden dark:block ${className}`} {...props} />
        </>
    );
}