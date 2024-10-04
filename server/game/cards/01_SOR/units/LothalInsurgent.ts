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
                immediateEffect: AbilityHelper.immediateEffects.conditional({
                    condition: context => ,
                    onFalse: AbilityHelper.immediateEffects.noAction(),
                    onTrue: AbilityHelper.immediateEffects.sequential([
                        AbilityHelper.immediateEffects.draw(context => ({ target: context.source.controller.opponent })),
                        AbilityHelper.immediateEffects.discard(),
                    ])

                })
            }
        });
    }
}

BountyHunterCrew.implemented = true;
