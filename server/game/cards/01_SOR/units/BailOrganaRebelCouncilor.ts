import { NonLeaderUnitCard } from '../../../core/card/NonLeaderUnitCard';
import { RelativePlayer, WildcardCardType } from '../../../core/Constants';
import AbilityHelper from '../../../AbilityHelper';
import { abilityResourceCost } from '../../../costs/CostLibrary';

export default class BailOrganaRebelCouncilor extends NonLeaderUnitCard {
    protected override getImplementationId () {
        return {
            id: '2554951775',
            internalName: 'bail-organa#rebel-councilor'
        };
    }

    public override setupCardAbilities () {
        this.addActionAbility({
            title: 'Give an Experience token to another friendly unit',
            cost: AbilityHelper.costs.exhaustSelf(),
            targetResolver: {
                cardTypeFilter: WildcardCardType.Unit,
                controller: RelativePlayer.Self,
                cardCondition: (card) => card !== this,
                immediateEffect: AbilityHelper.immediateEffects.giveExperience()
            },
        });
    }
}

BailOrganaRebelCouncilor.implemented = true;
