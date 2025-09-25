import {League, SeasonBadge} from "../../types";

export interface SeasonBadgeDialogProps {
    league: League | null;
    seasonBadge: SeasonBadge | null;
    loading: boolean;
    onClose: () => void;
}
