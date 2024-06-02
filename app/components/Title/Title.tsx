'use client'

import { Name } from '@/app/types/rollTypes';

import STYLES from '@/app/components/Title/Title.module.scss';

type TwoLineTitleProps = {
  title: string | undefined;
  name: Name | undefined;
}

type SubTitleProps = {
  subTitle: number | string | undefined;
}

type Props = {
  title?: string;
  name?: Name;
  subTitle?: number | string;
}

function TwoLineTitle({ title, name }: TwoLineTitleProps) {
  const isTitle = (string: string) => {
    const split = string.split('\\');
    return split;
  };

  return (
    <h1>
      <span className={STYLES['title-line-1']}>{ title ? isTitle(title)[0] : name?.forename }</span>
      <span className={STYLES['title-line-2']}>{ title ? isTitle(title)[1] : name?.surname }</span>
    </h1>
  );
}

function SubTitle({ subTitle }: SubTitleProps) {
  if (subTitle) {
    return <h2 className={STYLES['title-line-3']}>{ typeof subTitle === 'string' ? subTitle : `Chapter ${subTitle}`}</h2>;
  }
  return null;
}

export function Title({ title, name, subTitle }: Props) {
  return (
    <>
      <div className={STYLES['main-title']}>
        <TwoLineTitle title={title} name={name} />
      </div>
      <SubTitle subTitle={subTitle} />
    </>
  );
}

Title.defaultProps = {
  title: null,
  name: null,
  subTitle: null,
};
