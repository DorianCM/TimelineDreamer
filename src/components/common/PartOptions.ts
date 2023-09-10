import DreamerDate from "../../models/DreamerDate";

export interface PartOptions {
  start: DreamerDate;
  end: DreamerDate;
  orderPosition: number;
  isOnSameLine: boolean;
  isMerging: boolean;
  previousOrder: number;
}