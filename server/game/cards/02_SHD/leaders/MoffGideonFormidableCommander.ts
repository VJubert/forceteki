import AbilityHelper from '../../../AbilityHelper';
import { LeaderUnitCard } from '../../../core/card/LeaderUnitCard';
import { AbilityType, Duration, KeywordName } from '../../../core/Constants';
import { Attack } from '../../../core/attack/Attack';

export default class MoffGideonFormidableCommander extends LeaderUnitCard {
    protected override getImplementationId () {
        return {
            id: '2503039837',
            internalName: 'moff-gideon#formidable-commander',
        };
    }

    protected override setupLeaderSideAbilities () {
        this.addActionAbility({
            title: 'Attack with a unit that costs 3 or less. If it\'s attacking a unit, it gets +1/+0 for this attack.',
            cost: [AbilityHelper.costs.exhaustSelf()],
            targetResolver: {
                cardCondition: (card, _) => card.isUnit() && card.getPower() <= 3
            },
            initiateAttack: {
                attackerLastingEffects: {
                    effect: AbilityHelper.ongoingEffects.modifyStats({ power: 1, hp: 0 }),
                    condition: (attack: Attack) => attack.target.isUnit()
                }
            },
        });
    }

    protected override setupLeaderUnitSideAbilities () {
        // this.addConstantAbility({
        //     title: 'Each friendly unit that costs 3 or less gets +1/+0 and gains Overwhelm while attacking an enemy unit',
        //     matchTarget: (card) => card.isUnit() && card.getPower() <= 3,
        //     ongoingEffect: AbilityHelper.ongoingEffects.gainAbility({
        //         type: AbilityType.Triggered,
        //         title: 'Gain +1/+0 and Overwhelm while attacking an enemy unit',
        //         when: { onAttackDeclared: (event, _) => event.attack.target.isUnit() },
        //     })
        //
        // });
    }
}

MoffGideonFormidableCommander.implemented = true;
