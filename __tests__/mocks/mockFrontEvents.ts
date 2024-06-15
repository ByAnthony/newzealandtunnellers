import { Date, Event, EventDetail } from "../../types/tunneller";

const mockDate = (year: string | null, dayMonth: string | null): Date => ({
  year,
  dayMonth,
});

export const mockEvent: EventDetail = {
  description: null,
  title: null,
  image: null,
};

export const mockEventCompany: EventDetail = {
  ...mockEvent,
  description: "Something happened that day for the Company",
  title: "The Company",
  image: "image.jpg",
};
export const mockEventDescription: EventDetail = {
  ...mockEvent,
  description: "Something happened that day",
};
export const mockEventEnlisted: EventDetail = {
  ...mockEvent,
  description: "Main Body",
  title: "Enlisted",
};
export const mockEventPosted: EventDetail = {
  ...mockEvent,
  description: "Reinforcement",
  title: "Posted",
};
export const mockEventTrained: EventDetail = {
  ...mockEvent,
  description: "Military Camp, Somewhere",
  title: "Trained",
};
export const mockEventTitleAndDescription: EventDetail = {
  ...mockEvent,
  description: "Something happened",
  title: "Major Event",
};

export const mockEventDiedOfDisease: EventDetail = {
  ...mockEvent,
  description: "Military Hospital",
  title: "Died of disease",
};
export const mockEventKilledInAction: EventDetail = {
  ...mockEvent,
  description: "Killed on the battlefield",
  title: "Killed in action",
};
export const mockEventDiedOfWounds: EventDetail = {
  ...mockEvent,
  description: "Wounded on the battlefield",
  title: "Died of wounds",
};
export const mockEventDiedOfAccident: EventDetail = {
  ...mockEvent,
  description: "Fatal accident",
  title: "Died of accident",
};
export const mockEventBuried: EventDetail = {
  ...mockEvent,
  description: "Cemetery, France",
  title: "Buried",
};
export const mockEventGrave: EventDetail = {
  ...mockEvent,
  description: "1 A 26",
  title: "Grave reference",
};

const mockDeathEvent = (deathEvent: EventDetail): Record<string, Event[]> => ({
  1916: [
    {
      date: mockDate("1916", "27 September"),
      event: [mockEventCompany],
    },
    {
      date: mockDate("1916", "19 November"),
      event: [mockEventDescription],
    },
  ],
  1917: [
    {
      date: mockDate("1917", "8 August"),
      event: [mockEventDescription],
    },
    {
      date: mockDate("1917", "8 August"),
      event: [deathEvent, mockEventBuried, mockEventGrave],
    },
  ],
});

export const mockFrontEventsWithDiedOfDisease: Record<string, Event[]> =
  mockDeathEvent(mockEventDiedOfDisease);

export const mockFrontEventsWithKilledInAction: Record<string, Event[]> =
  mockDeathEvent(mockEventKilledInAction);

export const mockFrontEventsWithDiedOfWounds: Record<string, Event[]> =
  mockDeathEvent(mockEventDiedOfWounds);

export const mockFrontEventsWithDiedOfAccident: Record<string, Event[]> =
  mockDeathEvent(mockEventDiedOfAccident);

export const mockFrontEvents: Record<string, Event[]> = {
  1915: [
    {
      date: mockDate("1915", "26 January"),
      event: [mockEventEnlisted],
    },
    {
      date: mockDate("1915", "14 February"),
      event: [mockEventTrained],
    },
    {
      date: mockDate("1915", "4 May"),
      event: [mockEventTitleAndDescription],
    },
  ],
  1916: [
    {
      date: mockDate("1916", "19 November"),
      event: [mockEventDescription],
    },
    {
      date: mockDate("1916", "12 December"),
      event: [mockEventCompany],
    },
  ],
  1917: [
    {
      date: mockDate("1917", "9 April"),
      event: [mockEventTitleAndDescription, mockEventCompany],
    },
    {
      date: mockDate("1917", "8 August"),
      event: [mockEventDescription],
    },
  ],
  1918: [
    {
      date: mockDate("1918", "3 March"),
      event: [mockEventTitleAndDescription],
    },
    {
      date: mockDate("1918", "13 October"),
      event: [mockEventDescription],
    },
  ],
  1919: [
    {
      date: mockDate("1919", "4 April"),
      event: [mockEventTitleAndDescription],
    },
    {
      date: mockDate("1919", "12 July"),
      event: [mockEventDescription],
    },
  ],
};
