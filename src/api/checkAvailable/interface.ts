export interface ICheckAvailable {
  getTrip: (data: any) => Promise<ICheckTripResponse>;
  getCoaches: (data: any) => Promise<IGetBogyResponse>;
  setCookie: () => void;
}

export interface ICheckTripResponse {
  errorSource: any
  setCookie: () => void;
  errorMessage: any
  errorParams: any
  data: Daum[]
  viewStateHolder: string
  result: boolean
}

export interface Daum {
  createUser: any
  createDateTime: any
  updateUser: any
  updateDateTime: any
  tripId: string
  tripDate: string
  trainId: string
  trainNo: string
  tripType: string
  trainTypeId: string
  trainTypeNameTh: string
  trainTypeNameEn: string
  trainTypeCodeTh: string
  trainTypeCodeEn: string
  reserveFlag: any
  departureTime: string
  arrivalTime: string
  trainStationIdOrg: string
  trainStationIdDes: string
  routeId: string
  orgStationNameTh: any
  desStationNameTh: any
  orgStationNameEn: any
  desStationNameEn: any
  departureDate: string
  arrivalDate: string
}

export interface IGetBogyResponse {
  errorSource: any
  errorCode: string
  errorMessage: any
  errorParams: any
  data: Data
  viewStateHolder: string
  result: boolean
}

export interface Data {
  fareAmt: any
  trainFeeAmt: any
  results: Result[]
  waitingListEnabled: boolean
}

export interface Result {
  coachId: string
  coachNo: string
  coachDesc: string
  coachTypeId: string
  coachClass: string
  coachClassDescTh: string
  coachClassDescEn: string
  coachSeatType: string
  coachSeatTypeTh: string
  coachSeatTypeEn: string
  coachAirType: string
  coachAirTypeTh: string
  coachAirTypeEn: string
  coachLayoutId: string
  seatQty: string
  cabinQty: string
  coachFeeAmt: number
  coachSeats: CoachSeat[]
  coachImage: string
  fareAmt: number
  trainFeeAmt: number
  availableSeatCount: number
}

export interface CoachSeat {
  seatType?: string
  seatTypNameTh: string
  seatTypNameEn: string
  seatFeeAmt: number
}
