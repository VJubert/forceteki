describe('Snapshot Reflexes', function() {
    integration(function() {
        describe('Snapshot Reflexes\'s ability', function() {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['snapshot-reflexes'],
                        groundArena: ['isb-agent', { card: 'wampa', exhausted: true }],
                        spaceArena: ['tieln-fighter']
                    },
                    player2: {
                        groundArena: ['sundari-peacekeeper', 'atst'],
                    }
                });
            });

            it('should allowing triggering an attack', function () {
                this.player1.clickCard(this.snapshotReflexes);
                expect(this.player1).toBeAbleToSelectExactly([this.isbAgent, this.tielnFighter, this.wampa, this.sundariPeacekeeper, this.atst]);
                // expect(this.player1).toHavePassAbilityButton();
                // expect(this.player1).toHavePrompt('toto');

                this.player1.clickCard(this.isbAgent);
                expect(this.p2Base.damage).toBe(0);
                expect(this.isbAgent.getPower()).toBe(2);
                expect(this.isbAgent).toHaveExactUpgradeNames(['snapshot-reflexes']);
                expect(this.player1).toHavePrompt('toto');
                // expect(this.player1).toBeAbleToSelectExactly([this.sundariPeacekeeper, this.atst, this.p2Base]);

                // this.player1.clickCard(this.sundariPeacekeeper);
                // expect(this.isbAgent.exhausted).toBe(true);
                // expect(this.sundariPeacekeeper.damage).toBe(2);
                // expect(this.isbAgent.damage).toBe(1);
            });

            // it('should not allow triggering an attack on exhaust unit', function () {
            //     this.player1.clickCard(this.snapshotReflexes);
            //     expect(this.player1).toBeAbleToSelectExactly([this.isbAgent, this.tielnFighter, this.wampa, this.sundariPeacekeeper, this.atst]);
            //
            //     this.player1.clickCard(this.wampa);
            //     expect(this.wampa.getPower()).toBe(5);
            //     expect(this.player2).toBeActivePlayer();
            // });
            //
            // it('should not allow triggering an attack on enemy unit', function () {
            //     this.player1.clickCard(this.snapshotReflexes);
            //     expect(this.player1).toBeAbleToSelectExactly([this.isbAgent, this.tielnFighter, this.wampa, this.sundariPeacekeeper, this.atst]);
            //
            //     this.player1.clickCard(this.atst);
            //     expect(this.atst.getPower()).toBe(7);
            //     expect(this.player2).toBeActivePlayer();
            // });
        });
    });
});
