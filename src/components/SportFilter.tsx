import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui';
import {SportFilterProps} from "./models";
import {SPORTS_PLACEHOLDER} from "../app.constants";

export function SportFilter({ selectedSport, onSportChange, sports }: SportFilterProps) {
  return (
    <Select value={selectedSport} onValueChange={onSportChange}>
      <SelectTrigger>
        <SelectValue placeholder={SPORTS_PLACEHOLDER} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Sports</SelectItem>
        {sports.map((sport) => (
          <SelectItem key={sport} value={sport}>
            {sport}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}