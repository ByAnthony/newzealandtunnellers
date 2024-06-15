import {
  ArticleReferenceData,
  ImageData,
  SectionData,
} from "../../types/article";

export const getSections = (sections: SectionData[]) => {
  return sections.map((section: SectionData) => ({
    title: section.title,
    text: section.text,
  }));
};

export const getImages = (images: ImageData[]) => {
  return images.map((image: ImageData) => ({
    file: image.file,
    title: image.title,
    photographer: image.photographer,
    reference: image.reference,
    alt: image.alt,
  }));
};

export const getNextChapter = (
  chapter: number,
  articles: ArticleReferenceData[],
) => {
  const index = articles.findIndex(
    (article: ArticleReferenceData) => article.chapter === chapter,
  );

  if (index !== -1 && index + 1 < articles.length) {
    const nextArticle = articles[index + 1];
    return {
      url: nextArticle.id,
      chapter: nextArticle.chapter,
      title: nextArticle.title,
    };
  }

  return null;
};

export const formatText = (text: string) => {
  const paragraphs = text.split("\\n\\n");

  let segmentKey: number = 0;

  return paragraphs.map((paragraph) => {
    const segments = paragraph
      .replace(/--/g, "\u00A0")
      .split(/(\*.+?\*)|(\[.+?\))/g);

    const formattedSegments = segments.map((segment) => {
      segmentKey += 1;
      if (segment && segment.startsWith("*") && segment.endsWith("*")) {
        const italicText = segment.slice(1, -1);
        return <em key={segmentKey}>{italicText}</em>;
      }
      if (segment && segment.startsWith("[") && segment.endsWith(")")) {
        const linkText = segment.slice(1, -1);

        const [label, url] = linkText.split("](");

        if (url.includes("footnote")) {
          return (
            <a key={segmentKey} href={url} id={`reference_${label}`}>
              {`[${label}]`}
            </a>
          );
        }
        if (url.includes("reference")) {
          return (
            <a
              key={segmentKey}
              href={url}
              id={`footnote_${label.slice(0, -1)}`}
            >
              {label}
            </a>
          );
        }
        return (
          <a key={segmentKey} href={url}>
            {label}
          </a>
        );
      }
      return <span key={segmentKey}>{segment}</span>;
    });

    return <p key={paragraphs.indexOf(paragraph)}>{formattedSegments}</p>;
  });
};
