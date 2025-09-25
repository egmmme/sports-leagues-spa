import {League} from "./league";

export interface SeasonBadge {
    strBadge: string;
    strSeason: string;
}

export interface SeasonBadgeDialogProps {
    league: League | null;
    seasonBadge: SeasonBadge | null;
    loading: boolean;
    onClose: () => void;
}
