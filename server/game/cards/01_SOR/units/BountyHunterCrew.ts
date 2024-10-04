import AbilityHelper from '../../../AbilityHelper';
import { NonLeaderUnitCard } from '../../../core/card/NonLeaderUnitCard';
import { Location } from '../../../core/Constants';

export default class BountyHunterCrew extends NonLeaderUnitCard {
    protected override getImplementationId () {
        return {
            id: '3684950815',
            internalName: 'bounty-hunter-crew'
        };
    }

    public override setupCardAbilities () {
        this.addWhenPlayedAbility({
            title: 'Return an event from a discard pile',
            targetResolver: {
                optional: true,
                cardCondition: (card) => card.isEvent(),
                immediateEffect: AbilityHelper.immediateEffects.returnToHand({ locationFilter: Location.Discard })
            }
        });
    }
}

BountyHunterCrew.implemented = true;
