import { UpgradeCard } from '../../../core/card/UpgradeCard';

export default class SnapshotReflexes extends UpgradeCard {
    protected override getImplementationId () {
        return {
            id: '9985638644',
            internalName: 'snapshot-reflexes',
        };
    }

    public override setupCardAbilities () {
        this.addWhenPlayedAbility({
            title: 'You may attack with attached unit',
            initiateAttack: (context) => {
                console.log('toto');
                return ({
                    attacker: context.source.parentCard
                });
            },
        });
    }
}

SnapshotReflexes.implemented = true;
