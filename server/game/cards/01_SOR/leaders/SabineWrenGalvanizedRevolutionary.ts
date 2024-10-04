import AbilityHelper from '../../../AbilityHelper';
import { LeaderUnitCard } from '../../../core/card/LeaderUnitCard';
import { RelativePlayer } from '../../../core/Constants';

export default class SabineWrenGalvanizedRevolutionary extends LeaderUnitCard {
    protected override getImplementationId () {
        return {
            id: '4841169874',
            internalName: 'sabine-wren#galvanized-revolutionary',
        };
    }

    protected override setupLeaderSideAbilities () {
        this.addActionAbility({
            title: 'Deal 1 damage to each base',
            cost: [AbilityHelper.costs.exhaustSelf()],
            targetResolver: {
                controller: RelativePlayer.Self,
                immediateEffect: AbilityHelper.immediateEffects.simultaneous([
                    AbilityHelper.immediateEffects.damage((context) => ({ amount: 1, target: context.source.controller.base })),
                    AbilityHelper.immediateEffects.damage((context) => ({ amount: 1, target: context.source.controller.opponent.base }))
                ])
            }
        });
    }

    protected override setupLeaderUnitSideAbilities () {
        this.addOnAttackAbility({
            title: 'Deal 1 damage to each base',
            optional: true,
            targetResolver: {
                immediateEffect: AbilityHelper.immediateEffects.simultaneous([
                    AbilityHelper.immediateEffects.damage((context) => ({ amount: 1, target: context.source.controller.base })),
                    AbilityHelper.immediateEffects.damage((context) => ({ amount: 1, target: context.source.controller.opponent.base }))
                ])
            }
        });
    }
}

SabineWrenGalvanizedRevolutionary.implemented = true;
