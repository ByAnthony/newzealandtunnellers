export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  return `https://nztunnellers.com/staging${src}?w=${width}&q=75`;
}
