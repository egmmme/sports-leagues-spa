export interface SportFilterProps {
    selectedSport: string;
    onSportChange: (sport: string) => void;
    sports: string[];
}