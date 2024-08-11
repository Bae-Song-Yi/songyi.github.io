import noImage from '../assets/img/no_img.png';

const onErrorImage: React.ReactEventHandler<HTMLImageElement> = (e) => {
  const target = e.target as HTMLImageElement;
  target.src = noImage;
};

const priceChange = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getCookieValue = (key: string) => {
  const cookieKey = `${key}=`;
  return document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(cookieKey))
    ?.substring(cookieKey.length) || '';
}

export { onErrorImage, priceChange, getCookieValue };
