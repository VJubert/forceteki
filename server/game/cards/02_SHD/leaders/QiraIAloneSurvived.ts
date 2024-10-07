import AbilityHelper from '../../../AbilityHelper';
import { LeaderUnitCard } from '../../../core/card/LeaderUnitCard';
import { RelativePlayer } from "../../../core/Constants";

export default class QiraIAloneSurvived extends LeaderUnitCard {
    protected override getImplementationId () {
        return {
            id: '2432897157',
            internalName: 'qira#i-alone-survived',
        };
    }

    protected override setupLeaderSideAbilities () {
        this.addActionAbility({
            title: 'Give an Experience token to a unit with 2 or less power',
            cost: [AbilityHelper.costs.abilityResourceCost(1), AbilityHelper.costs.exhaustSelf()],
            targetResolver: {
                controller: RelativePlayer.Self,
                immediateEffect: AbilityHelper.immediateEffects.sequential([
                    AbilityHelper.immediateEffects.damage({ amount: 2 }),
                    AbilityHelper.immediateEffects.giveShield()
                ])
            }
        });
    }

    protected override setupLeaderUnitSideAbilities () {
        this.addTriggeredAbility({
            title: 'Give an Experience token to a unit with 2 or less power',
            when: { onUnitEntersPlay: (event, context) => event.card == context.source },
            immediateEffect: AbilityHelper.immediateEffects.sequential([
                AbilityHelper.immediateEffects.heal(context => ({ target: context.source.controller.getUnitsInPlay().concat(context.source.controller.opponent.getUnitsInPlay()), amount: 999 })),
                AbilityHelper.immediateEffects.damage(context => ({ target: context.source.controller.getUnitsInPlay().concat(context.source.controller.opponent.getUnitsInPlay()), amount: context.target.getHp() })),
            ]),
        });
    }
}

QiraIAloneSurvived.implemented = true;
