import AbilityHelper from '../../../AbilityHelper';
import { NonLeaderUnitCard } from '../../../core/card/NonLeaderUnitCard';
import { KeywordName, WildcardLocation } from '../../../core/Constants';

export default class HunterOfTheHaxionBrood extends NonLeaderUnitCard {
    protected override getImplementationId() {
        return {
            id: '6939947927',
            internalName: 'hunter-of-the-haxion-brood',
        };
    }

    public override setupCardAbilities() {
        this.addConstantAbility({
            title: 'While an enemy unit has a Bounty, this unit gains Shielded',
            condition: (context) => context.source.controller.opponent.getUnitsInPlay(WildcardLocation.AnyArena, (card) => card.hasSomeKeyword(KeywordName.Bounty)).length > 0,
            ongoingEffect: AbilityHelper.ongoingEffects.gainKeyword(KeywordName.Shielded),
        });
    }
}

HunterOfTheHaxionBrood.implemented = true;
