export default function imageLoader({ src, width }: { src: any; width: any }) {
  return `https://nztunnellers.com/staging${src}?w=${width}`;
}
