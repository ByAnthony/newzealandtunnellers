import { NextResponse } from "next/server";
import { armyExperienceQuery } from "../../../utils/database/queries/armyExperienceQuery";
import { companyEventsQuery } from "../../../utils/database/queries/companyEventsQuery";
import { imageSourceBookAuthorsQuery } from "../../../utils/database/queries/imageSourceBookAuthorsQuery";
import { londonGazetteQuery } from "../../../utils/database/queries/londonGazetteQuery";
import { medalsQuery } from "../../../utils/database/queries/medalsQuery";
import { mysqlConnection } from "../../../utils/database/mysqlConnection";
import { nzArchivesQuery } from "../../../utils/database/queries/nzArchivesQuery";
import { tunnellerEventsQuery } from "../../../utils/database/queries/tunnellerEventsQuery";
import { tunnellerQuery } from "../../../utils/database/queries/tunnellerQuery";
import {
  ArmyExperience,
  Author,
  DeathData,
  JoinEventData,
  LondonGazette,
  Medal,
  NzArchives,
  TunnellerProfile,
  ProfileData,
  SingleEventData,
} from "../../../../app/types/tunneller";
import { getDate, getYear, getAge } from "../../../utils/helpers/date";
import { getParent, getNzResident } from "../../../utils/helpers/origin";
import { getArmyExperience } from "../../../utils/helpers/preWarYears";
import {
  getAgeAtEnlistment,
  getDemobilization,
  getDischargedCountry,
  getEventEndDate,
  getEventStartDate,
  getFrontEvents,
  getJoinEvents,
  getTransferred,
  getTransport,
  getWarDeathEvents,
  isDeathWar,
  isDeserter,
} from "../../../utils/helpers/militaryYears";
import {
  getDeath,
  getDeathCause,
  getDeathPlace,
  isWarInjuriesDeathAfterWar,
  getCemetery,
} from "../../../utils/helpers/death";
import {
  getNzArchives,
  getAwmm,
  getNominalRoll,
  getLondonGazette,
} from "../../../utils/helpers/sources";
import {
  getImage,
  getImageSource,
  getImageSourceAucklandLibraries,
  getImageSourceArchives,
  getImageSourceFamily,
  getImageSourceNewspaper,
  getImageSourceBook,
  getImageSourceBookAuthors,
  getImageSourceBookPage,
} from "../../../utils/helpers/image";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const connection = await mysqlConnection();

  try {
    const profile: ProfileData = await tunnellerQuery(params.id, connection);
    const armyExperience: ArmyExperience[] = await armyExperienceQuery(
      params.id,
      connection,
    );
    const companyEvents: SingleEventData[] =
      await companyEventsQuery(connection);
    const tunnellerEvents: SingleEventData[] = await tunnellerEventsQuery(
      params.id,
      connection,
    );
    const medals: Medal[] = await medalsQuery(params.id, connection);
    const nzArchives: NzArchives[] = await nzArchivesQuery(
      params.id,
      connection,
    );
    const londonGazette: LondonGazette[] = await londonGazetteQuery(
      params.id,
      connection,
    );
    const bookAuthors: Author[] = await imageSourceBookAuthorsQuery(
      params.id,
      connection,
    );

    const transportUk: SingleEventData | null = profile.transport_uk_start
      ? {
          date: profile.transport_uk_start,
          event: `${profile.transport_uk_ref} ${profile.transport_uk_vessel}`,
          title: "Transfer to England",
          image: null,
        }
      : null;

    const transportNz: SingleEventData | null = profile.transport_nz_start
      ? {
          date: profile.transport_nz_start,
          event: `${profile.transport_nz_ref} ${profile.transport_nz_vessel}`,
          title: "Transfer to New Zealand",
          image: null,
        }
      : null;

    const transferred: SingleEventData | null =
      profile.transferred_to_date && profile.transferred_to_unit
        ? {
            date: profile.transferred_to_date,
            event: profile.transferred_to_unit,
            title: "Transferred",
            image: null,
          }
        : null;

    const dischargeUk: SingleEventData | null =
      profile.demobilization_date && profile.discharge_uk === 1
        ? {
            date: profile.demobilization_date,
            event: "End of Service in the United Kingdom",
            title: "Demobilization",
            image: null,
          }
        : null;

    const deserter: SingleEventData | null =
      profile.demobilization_date && profile.has_deserted === 1
        ? {
            date: profile.demobilization_date,
            event: "End of Service as deserter",
            title: "Demobilization",
            image: null,
          }
        : null;

    const demobilization: SingleEventData | null =
      profile.demobilization_date &&
      (profile.discharge_uk !== 1 || profile.has_deserted !== 1)
        ? {
            date: profile.demobilization_date,
            event: "Demobilization",
            title: "End of Service",
            image: null,
          }
        : null;

    const enlistment: JoinEventData = {
      enlistmentDate: profile.enlistment_date,
      trainingStart: profile.training_start,
      trainingLocation: profile.training_location,
      embarkationUnit: profile.embarkation_unit,
    };

    const posted: JoinEventData = {
      enlistmentDate: profile.posted_date,
      trainingStart: profile.training_start,
      trainingLocation: profile.training_location,
      embarkationUnit: profile.embarkation_unit,
    };

    const death: DeathData = {
      deathType: profile.death_type,
      deathDate: profile.death_date,
      deathLocation: profile.death_location,
      deathTown: profile.death_town,
      deathCountry: profile.death_country,
      deathCause: profile.death_cause,
      deathCircumstances: profile.death_circumstances,
      cemetery: profile.cemetery,
      cemteryTown: profile.cemetery_town,
      cemeteryCountry: profile.cemetery_country,
      grave: profile.grave,
    };

    const additionalTunnellerEvents: SingleEventData[] = [
      transportUk,
      transportNz,
      transferred,
      dischargeUk,
      deserter,
      demobilization,
    ]
      .concat(tunnellerEvents, getWarDeathEvents(death))
      .filter((event): event is SingleEventData => {
        return event !== null;
      });

    const selectedCompanyEvents: SingleEventData[] = companyEvents.filter(
      (event) => {
        if (
          event.event !== "Marched in to the Company Training Camp, Falmouth" &&
          getEventStartDate(additionalTunnellerEvents) <= event.date &&
          event.date <= getEventEndDate(additionalTunnellerEvents)
        ) {
          return true;
        }

        if (
          event.event === "Marched in to the Company Training Camp, Falmouth" &&
          (profile.embarkation_unit === "Main Body" ||
            profile.embarkation_unit === "1st Reinforcements")
        ) {
          return true;
        }

        return false;
      },
    );

    const tunneller: TunnellerProfile = {
      id: profile.id,
      summary: {
        serial: profile.serial,
        name: {
          forename: profile.forename,
          surname: profile.surname,
        },
        birth: profile.birth_date ? getYear(profile.birth_date) : null,
        death: profile.death_date ? getYear(profile.death_date) : null,
      },
      origins: {
        birth: {
          date: profile.birth_date ? getDate(profile.birth_date) : null,
          country: profile.birth_country,
        },
        parents: {
          mother: getParent(profile.mother_name, profile.mother_origin),
          father: getParent(profile.father_name, profile.father_origin),
        },
        inNzLength: getNzResident(
          profile.nz_resident_in_month,
          profile.enlistment_date,
          profile.posted_date,
        ),
      },
      preWarYears: {
        armyExperience: getArmyExperience(armyExperience),
        employment: {
          occupation: profile.occupation,
          employer: profile.employer,
        },
        residence: profile.residence,
        maritalStatus: profile.marital_status,
        wife: profile.wife_name,
      },
      militaryYears: {
        enlistment: {
          serial: profile.serial,
          rank: profile.rank,
          date: profile.enlistment_date
            ? getDate(profile.enlistment_date)
            : null,
          district: profile.district,
          alias: profile.aka,
          transferredToTunnellers: getTransferred(
            profile.posted_date,
            profile.posted_from_corps,
          ),
          ageAtEnlistment: getAgeAtEnlistment(
            profile.enlistment_date,
            profile.posted_date,
            profile.birth_date,
          ),
        },
        embarkationUnit: {
          detachment: profile.embarkation_unit,
          training: {
            date: getDate(profile.training_start),
            location: profile.training_location,
            locationType: profile.training_location_type,
          },
          section: profile.section,
          attachedCorps: profile.attached_corps,
        },
        transportUk: getTransport(
          profile.transport_uk_ref,
          profile.transport_uk_vessel,
          getDate(profile.transport_uk_start),
        ),
        frontEvents: getFrontEvents(
          selectedCompanyEvents,
          additionalTunnellerEvents,
          getJoinEvents(enlistment),
          getJoinEvents(posted),
        ),
        endOfService: {
          deserter: isDeserter(profile.has_deserted),
          transferred: getTransferred(
            profile.transferred_to_date,
            profile.transferred_to_unit,
          ),
          deathWar: isDeathWar(profile.death_type),
          transportNz: getTransport(
            profile.transport_nz_ref,
            profile.transport_nz_vessel,
            profile.transport_nz_start
              ? getDate(profile.transport_nz_start)
              : null,
          ),
          demobilization: getDemobilization(
            profile.demobilization_date
              ? getDate(profile.demobilization_date)
              : null,
            getDischargedCountry(profile.discharge_uk),
          ),
        },
        medals: medals,
      },
      death: getDeath(
        isWarInjuriesDeathAfterWar(profile.death_type),
        profile.death_type,
        profile.death_date ? getDate(profile.death_date) : null,
        getDeathPlace(
          profile.death_location,
          profile.death_town,
          profile.death_country,
        ),
        getDeathCause(profile.death_cause, profile.death_circumstances),
        getCemetery(
          profile.cemetery,
          profile.cemetery_town,
          profile.cemetery_country,
          profile.grave,
        ),
        getAge(profile.birth_date, profile.death_date),
      ),
      sources: {
        nzArchives: getNzArchives(nzArchives),
        awmmCenotaph: getAwmm(profile.awmm_cenotaph),
        nominalRoll: getNominalRoll(
          profile.nominal_roll_volume,
          profile.nominal_roll_number,
          profile.nominal_roll_page,
        ),
        londonGazette: getLondonGazette(londonGazette),
      },
      image: getImage(
        profile.image,
        getImageSource(
          getImageSourceAucklandLibraries(
            profile.image_source_auckland_libraries,
          ),
          getImageSourceArchives(profile.archives_name, profile.archives_ref),
          getImageSourceFamily(profile.family_name),
          getImageSourceNewspaper(
            profile.newspaper_name,
            profile.newspaper_date ? getDate(profile.newspaper_date) : null,
          ),
          getImageSourceBook(
            getImageSourceBookAuthors(bookAuthors),
            profile.book_title,
            profile.book_town,
            profile.book_publisher,
            profile.book_year,
            getImageSourceBookPage(profile.book_page),
          ),
        ),
      ),
    };

    return NextResponse.json(tunneller);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 },
    );
  }
}
