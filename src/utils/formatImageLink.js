export default function imageLink(image) {
  return image == null
    ? "https://via.placeholder.com/370x556/000000/FFFFFF/?text=No%20Image%20Found"
    : "https://image.tmdb.org/t/p/w370_and_h556_bestv2" + image;
}
