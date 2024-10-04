import AbilityHelper from '../../../AbilityHelper';
import { LeaderUnitCard } from '../../../core/card/LeaderUnitCard';
import { Trait } from '../../../core/Constants';
import { StateWatcherRegistrar } from '../../../core/stateWatcher/StateWatcherRegistrar';
import { AttacksThisPhaseWatcher } from '../../../stateWatchers/AttacksThisPhaseWatcher';

export default class BoKatanKryzePrincessInExile extends LeaderUnitCard {
    private attacksThisPhaseWatcher: AttacksThisPhaseWatcher;

    protected override getImplementationId () {
        return {
            id: '7424360283',
            internalName: 'bokatan-kryze#princess-in-exile',
        };
    }

    protected override setupStateWatchers (registrar: StateWatcherRegistrar): void {
        this.attacksThisPhaseWatcher = AbilityHelper.stateWatchers.attacksThisPhase(registrar, this);
    }

    protected override setupLeaderSideAbilities () {
        this.addActionAbility({
            title: 'If you attacked with a Mandalorian unit this phase, deal 1 damage to a unit',
            cost: [AbilityHelper.costs.exhaustSelf()],
            condition: (_) => this.attacksThisPhaseWatcher.getAttackers((attack) => attack.attacker.hasSomeTrait(Trait.Mandalorian)).length > 0,
            targetResolver: {
                immediateEffect: AbilityHelper.immediateEffects.damage({ amount: 1 })
            }
        });
    }

    protected override setupLeaderUnitSideAbilities () {
        this.addOnAttackAbility({
            title: 'You may deal 1 damage to a unit. If you attacked with another Mandalorian unit this phase, you may deal 1 damage to a unit',
            optional: true,
            targetResolver: {
                immediateEffect: AbilityHelper.immediateEffects.simultaneous([
                    AbilityHelper.immediateEffects.damage({ amount: 1 }),
                    AbilityHelper.immediateEffects.conditional({
                        optional: true,
                        condition: (context) => this.attacksThisPhaseWatcher.getAttackers((attack) => context.source !== attack.attacker && attack.attacker.hasSomeTrait(Trait.Mandalorian)).length > 0,
                        onTrue: AbilityHelper.immediateEffects.damage({ amount: 1 }),
                        onFalse: AbilityHelper.immediateEffects.noAction(),
                    })
                ])
            }
        });
    }
}

BoKatanKryzePrincessInExile.implemented = true;
