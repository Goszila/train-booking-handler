import dayjs from "dayjs";
import { getDates } from "../../utils/dayjs";
import { CheckAvailableService } from "./service";

interface TripResponse {
  tripId: string;
  tripDate: string;
  departureTime: string;
  arrivalTime: string;
  bogies: Array<{
    coachId: string;
    coachDesc: string;
    coachClassDescTh: string;
    coachSeatTypeTh: string;
    coachAirTypeTh: string;
    coachSeats: string;
    availableSeatCount: number;
  }>;
}


export default async function checkAvailable() {
  const nextThreeMonths = getDates([5, 6])
    .map(
      (date) => dayjs(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    )

  const checkAvailableService = new CheckAvailableService();
  await checkAvailableService.setCookie();

  const response: Array<TripResponse> = []
  const tripsPromises = nextThreeMonths.map(async (date) => {
    const trips = (await checkAvailableService.getTrip(date)).data.map((trip) => {
      return {
        tripId: trip.tripId,
        tripDate: dayjs(trip.tripDate).format('dddd, DD MMMM YYYY'),
        departureTime: trip.departureTime,
        arrivalTime: trip.arrivalTime,
      };
    });

    await Promise.all(trips.map(async (trip) => {
      const coaches = await checkAvailableService.getCoaches(trip.tripId);
      response.push({
        ...trip,
        bogies: coaches.data.results.filter(coach => coach.coachAirTypeEn === "Air Coach" && coach.availableSeatCount > 0)
          .map(coach => {
            return {
              coachId: coach.coachId,
              coachDesc: coach.coachDesc,
              coachClassDescTh: coach.coachClassDescTh,
              coachSeatTypeTh: coach.coachSeatTypeTh,
              coachAirTypeTh: coach.coachAirTypeTh,
              coachSeats: coach.coachSeats.map(seat => seat.seatTypNameTh).join(', '),
              availableSeatCount: coach.availableSeatCount
            }
          })
      });
    }));
  });

  await Promise.all(tripsPromises);
  return response
    .filter(trip => trip.bogies.length > 0)
    .sort((a, b) => dayjs(a.tripDate, 'dddd, DD MMMM YYYY').unix() - dayjs(b.tripDate, 'dddd, DD MMMM YYYY').unix());
}