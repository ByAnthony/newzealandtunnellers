import { TunnellerImage } from '../../../types/tunneller';

import STYLES from './TunnellersImages.module.scss';

type Props = {
    images: TunnellerImage[]
  }

export function TunnellersImages({ images }: Props) {
  return (
    <div className={STYLES['grid-container']}>
      {images.map((image) => (
        <div className={STYLES['grid-item']}><img src={`/images/roll/tunnellers/${image.image}`} alt="tba" /></div>
      ))}
    </div>
  );
}
