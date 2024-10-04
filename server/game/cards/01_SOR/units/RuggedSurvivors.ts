import AbilityHelper from '../../../AbilityHelper';
import { NonLeaderUnitCard } from '../../../core/card/NonLeaderUnitCard';
import { WildcardLocation } from '../../../core/Constants';

export default class RuggedSurvivors extends NonLeaderUnitCard {
    protected override getImplementationId () {
        return {
            id: '4599464590',
            internalName: 'rugged-survivors'
        };
    }

    public override setupCardAbilities () {
        // valball : use addTriggeredAbility because addOnAttackAbility does not reference immediateEffect
        this.addTriggeredAbility({
            title: 'You may draw a card if you control a leader unit',
            optional: true,
            when: { onAttackDeclared: (event, context) => event.attack.attacker === context.source },
            immediateEffect: AbilityHelper.immediateEffects.conditional({
                condition: (context) => context.source.controller.getUnitsInPlay(WildcardLocation.AnyArena, (card) => card.isLeaderUnit()).length > 0,
                onTrue: AbilityHelper.immediateEffects.draw((context) => ({ target: context.source.controller })),
                onFalse: AbilityHelper.immediateEffects.noAction()
            })
        });
    }
}

RuggedSurvivors.implemented = true;
