import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui';

export interface SportFilterProps {
    selectedSport: string;
    onSportChange: (sport: string) => void;
    sports: string[];
}

export default function SportFilter({ selectedSport, onSportChange, sports }: SportFilterProps) {
  return (
    <Select value={selectedSport} onValueChange={onSportChange}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by sport" />
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