"use client";

import Image from "next/image";
import { EventDetail } from "../../../types/tunneller";

import STYLES from "../Timeline.module.scss";

type Props = {
  event: EventDetail[];
  place: () => string | null;
  disease: string | null | undefined;
  warInjuries: string | null | undefined;
  ageAtEnlistment: number | null;
};

export function TimelineEvent({
  event,
  place,
  disease,
  warInjuries,
  ageAtEnlistment,
}: Props) {
  return (
    <>
      {event.map((eventDetail: EventDetail) => {
        const { title } = eventDetail;

        const isTitleCompany = title === "The Company";
        const isTitleEnlisted = title === "Enlisted";
        const isTitlePosted = title === "Posted";
        const isTitleTrained = title === "Trained";
        const isTitleKilledInAction = title === "Killed in action";
        const isTitleDiedOfWounds = title === "Died of wounds";
        const isTitleDiedOfDisease = title === "Died of disease";
        const isTitleDiedOfAccident = title === "Died of accident";
        const isTitleBuried = title === "Buried";
        const isTitleGraveReference = title === "Grave reference";

        const titleWithAgeAtEnlistment = (age: number | null) => {
          if (age) {
            return `${title} at the age of ${age}`;
          }
          return title;
        };

        if (title) {
          if (isTitleCompany) {
            return (
              <div key={event.indexOf(eventDetail)}>
                <div className={STYLES["company-event"]}>
                  <Image
                    src={`/images/roll/${eventDetail.image}`}
                    alt=""
                    width={630}
                    height={473}
                    className={STYLES["event-image"]}
                  />
                  <p>{eventDetail.description}</p>
                </div>
              </div>
            );
          }

          if (isTitleEnlisted || isTitlePosted) {
            return (
              <div
                key={event.indexOf(eventDetail)}
                className={STYLES["main-event"]}
              >
                <p>{titleWithAgeAtEnlistment(ageAtEnlistment)}</p>
                <span>{eventDetail.description}</span>
              </div>
            );
          }

          if (isTitleTrained) {
            return (
              <div
                key={event.indexOf(eventDetail)}
                className={STYLES["tunneller-event-with-title"]}
              >
                <p>{title}</p>
                <span>{eventDetail.description}</span>
              </div>
            );
          }

          if (
            isTitleKilledInAction ||
            isTitleDiedOfWounds ||
            isTitleDiedOfDisease ||
            isTitleDiedOfAccident
          ) {
            return (
              <div
                key={event.indexOf(eventDetail)}
                className={STYLES["main-event"]}
              >
                <span>{title}</span>
                {isTitleDiedOfDisease && disease && place() && (
                  <>
                    <span className={STYLES.info}>{` (${disease})`}</span>
                    <span className={STYLES["info-block"]}>{place()}</span>
                  </>
                )}
                {isTitleDiedOfDisease && disease && !place() && (
                  <span className={STYLES.info}>{` (${disease})`}</span>
                )}
                {isTitleDiedOfDisease && warInjuries && (
                  <span className={STYLES["info-block"]}>{warInjuries}</span>
                )}
                {isTitleKilledInAction &&
                  eventDetail.description &&
                  place() && (
                    <>
                      <p className={STYLES["line-margin"]}>
                        {eventDetail.description}
                      </p>
                      <span className={STYLES["info-block-with-description"]}>
                        {place()}
                      </span>
                    </>
                  )}
                {isTitleKilledInAction &&
                  !eventDetail.description &&
                  place() && (
                    <span className={STYLES["info-block"]}>{place()}</span>
                  )}
                {isTitleKilledInAction &&
                  eventDetail.description &&
                  !place() && <p>{eventDetail.description}</p>}
                {isTitleDiedOfWounds && (
                  <span className={STYLES["info-block"]}>{place()}</span>
                )}
                {isTitleDiedOfAccident && (
                  <span className={STYLES["info-block-with-description"]}>
                    {eventDetail.description}
                  </span>
                )}
              </div>
            );
          }

          if (isTitleBuried || isTitleGraveReference) {
            return (
              <div
                key={event.indexOf(eventDetail)}
                className={STYLES["tunneller-event-with-title"]}
              >
                <p>{title}</p>
                <span>{eventDetail.description}</span>
              </div>
            );
          }

          return (
            <div
              key={event.indexOf(eventDetail)}
              className={STYLES["main-event"]}
            >
              <p>{title}</p>
              <span>{eventDetail.description}</span>
            </div>
          );
        }

        return (
          <div
            key={event.indexOf(eventDetail)}
            className={STYLES["tunneller-event"]}
          >
            <p>{eventDetail.description}</p>
          </div>
        );
      })}
    </>
  );
}
