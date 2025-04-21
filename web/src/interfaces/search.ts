export interface Train {
  id: string;
  name: string;
  start_station: string;
  end_station: string;
  coach_no: number;
  departure_time: string;
  arrival_time: string;
  train_type: string | null;
  train_number: string;
  off_day: number;
  created_at: string;
}

export interface Seat {
  id: string;
  couch_id: string;
  seat_number: string;
  seat_index: number;
  is_booked: boolean;
  // Add more fields if needed
}
export interface Couch {
  train_id: string;
  name: string;
  schedule_id: string;
  date: string;
  couch_id: string;
  couch_type: string;
  total_seats: number;
  booked_seats: number;
  available_seats: number;
  seatspc: Seat[];
}
export interface ModCouch {
  details: Couch;
  available_seats: number;
}
export interface modTrainScheduleData {
  train: Train;
  sleeper: ModCouch;
  shovon: ModCouch;
  snigdha: ModCouch;
}
export interface TrainScheduleData {
  train: Train;
  sleeper: Couch[];
  shovon: Couch[];
  snighdha: Couch[];
}

export interface TrainData {
  id: string;
  name: string;
  start_station: string;
  end_station: string;
  departure_time: string;
  arrival_time: string;
  train_number: string;
  train_type: string | null;
  off_day: number;
  created_at: string;
}
