export type Exercises = {
  name : string;
  series : SeriesDTO[]
  gif : string;
}

type SeriesDTO = {
  reps : number;
  series_number : number;
  weight : number
}