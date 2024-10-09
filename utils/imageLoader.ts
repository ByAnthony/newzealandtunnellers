export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  if (process.env.NODE_ENV !== "production") {
    return `${src}?w=${width}&q=75`;
  }
  // prod testing on /staging
  // return `https://nztunnellers.com/staging${src}?w=${width}&q=75`;
  // live prod
  return `https://nztunnellers.com/${src}?w=${width}&q=75`;
}
