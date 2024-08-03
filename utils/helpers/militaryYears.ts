import {
  SingleEventData,
  JoinEventData,
  DateObj,
  Event,
  EventDetail,
  DeathData,
} from "@/types/tunneller";
import { getAge, getDate, getDayMonth, getYear } from "@/utils/helpers/date";

export const getTransferred = (date: string | null, unit: string | null) => {
  return date && unit ? { date: getDate(date), unit } : null;
};

export const getAgeAtEnlistment = (
  enlistmentDate: string | null,
  postedDate: string | null,
  birthDate: string | null,
) => {
  if (enlistmentDate && birthDate) {
    return getAge(birthDate, enlistmentDate);
  }
  if (postedDate && birthDate) {
    return getAge(birthDate, postedDate);
  }
  return null;
};

export const getEventStartDate = (tunnellerEvents: SingleEventData[]) => {
  return tunnellerEvents.reduce((minDate, event) => {
    return event.date < minDate ? event.date : minDate;
  }, tunnellerEvents[0].date);
};

export const getEventEndDate = (tunnellerEvents: SingleEventData[]) => {
  return tunnellerEvents.reduce((maxDate, event) => {
    return event.date > maxDate ? event.date : maxDate;
  }, tunnellerEvents[0].date);
};

export const getJoinEvents = (join: JoinEventData | null) => {
  const joinEvents: SingleEventData[] = [];

  if (join && join.date && join.date < join.trainingStart) {
    joinEvents.push(
      {
        date: join.date,
        event: join.embarkationUnit,
        title: join.isEnlisted ? "Enlisted" : "Posted",
        image: null,
      },
      {
        date: join.trainingStart,
        event: join.trainingLocation,
        title: "Trained",
        image: null,
      },
    );
  }

  if (join && join.date && join.date >= join.trainingStart) {
    joinEvents.push(
      {
        date: join.date,
        event: join.embarkationUnit,
        title: join.isEnlisted ? "Enlisted" : "Posted",
        image: null,
      },
      {
        date: join.date,
        event: join.trainingLocation,
        title: "Trained",
        image: null,
      },
    );
  }

  return joinEvents;
};

export const getWarDeathEvents = (death: DeathData) => {
  const deathEvents: SingleEventData[] = [];

  if (death.deathDate) {
    if (death.deathType === "War") {
      if (
        (death.deathCause === "Killed in action" ||
          death.deathCause === "Died of wounds") &&
        death.deathCircumstances
      ) {
        deathEvents.push({
          date: death.deathDate,
          event: death.deathCircumstances,
          title: death.deathCause,
          image: null,
        });
      }

      if (death.deathCause === "Died of disease") {
        deathEvents.push({
          date: death.deathDate,
          event: `${death.deathLocation}, ${death.deathTown}`,
          title: death.deathCause,
          image: null,
        });
      }

      if (death.deathCause === "Died of accident" && death.deathLocation) {
        deathEvents.push({
          date: death.deathDate,
          event: death.deathLocation,
          title: death.deathCause,
          image: null,
        });
      }

      if (death.grave) {
        deathEvents.push(
          {
            date: death.deathDate,
            event: `${death.cemetery}, ${death.cemteryTown}`,
            title: "Buried",
            image: null,
          },
          {
            date: death.deathDate,
            event: death.grave,
            title: "Grave reference",
            image: null,
          },
        );
      }
    }

    if (
      death.deathType === "War injuries" &&
      death.deathCause === "Died of disease" &&
      death.deathCircumstances
    ) {
      deathEvents.push({
        date: death.deathDate,
        event: death.deathCircumstances,
        title: death.deathCause,
        image: null,
      });
    }
  }

  return deathEvents;
};

export const getGroupedEventsByDate = (events: Event[]) => {
  return events.reduce((acc: Event[], current: Event) => {
    const existingEntry = acc.find(
      (entry: Event) =>
        entry.date.year === current.date.year &&
        entry.date.dayMonth === current.date.dayMonth,
    );

    if (existingEntry) {
      existingEntry.event.push(...current.event);
    } else {
      acc.push({
        date: {
          year: current.date.year,
          dayMonth: current.date.dayMonth,
        },
        event: [...current.event],
      });
    }

    return acc;
  }, []);
};

export const getGroupedEventsByYear = (events: Event[]) => {
  return events.reduce((acc: { [year: string]: Event[] }, current: Event) => {
    const year = current.date.year;

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push({
      date: current.date,
      event: current.event,
    });

    return acc;
  }, {});
};

export const getFrontEvents = (
  companyEvents: SingleEventData[],
  tunnellerEvents: SingleEventData[],
  enlistmentEvents: SingleEventData[] | [],
  postedEvents: SingleEventData[] | [],
) => {
  const fullTunnellerEvents: Event[] = tunnellerEvents
    .concat(enlistmentEvents, postedEvents, companyEvents)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((event: SingleEventData) => {
      const dateObj: DateObj = {
        year: getYear(event.date),
        dayMonth: getDayMonth(event.date),
      };

      const eventDetail: EventDetail = {
        description: event.event,
        title: event.title,
        image: event.image,
      };

      return { date: dateObj, event: [eventDetail] };
    });

  const groupEventsByDate: Event[] =
    getGroupedEventsByDate(fullTunnellerEvents);

  const groupEventsByYear: Record<string, Event[]> =
    getGroupedEventsByYear(groupEventsByDate);

  return groupEventsByYear;
};

export const isDeserter = (isDeserter: number | null) => {
  return isDeserter === 1 ? true : false;
};

export const isDeathWar = (isDeathWar: string | null) => {
  return isDeathWar === "War" ? true : false;
};

export const getTransport = (
  reference: string | null,
  vessel: string | null,
  departureDate: DateObj | null,
) => {
  return reference && vessel && departureDate
    ? { reference, vessel, departureDate }
    : null;
};

export const getDemobilizationSummaryInfo = (
  date: DateObj | null,
  country: string | null,
) => {
  return date && country ? { date, country } : null;
};

export const getDemobilization = (
  date: string | null,
  dischargeUk: number | null,
  deserted: number | null,
) => {
  if (date && dischargeUk === 1) {
    return {
      date: date,
      event: "End of Service in the United Kingdom",
      title: "Demobilization",
      image: null,
    };
  }

  if (date && deserted === 1) {
    return {
      date: date,
      event: "End of Service as deserter",
      title: "Demobilization",
      image: null,
    };
  }

  if (date) {
    return {
      date: date,
      event: "Demobilization",
      title: "End of Service",
      image: null,
    };
  }

  return null;
};

export const getDischargedCountry = (isDischargedUk: number | null) => {
  return isDischargedUk ? "United Kingdom" : "New Zealand";
};
