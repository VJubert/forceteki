describe('Play unit from hand', function() {
    integration(function() {
        describe('When a unit is played', function() {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['cartel-spacer', 'first-legion-snowtrooper', 'battlefield-marine'],
                        resources: 6,
                        leader: 'boba-fett#collecting-the-bounty',
                        base: 'jabbas-palace'
                    },
                    player2: {
                        groundArena: ['wampa'],
                    }
                });
            });

            it('it should land in the correct arena exausted and resources should be exhausted', function () {
                this.player1.clickCard(this.cartelSpacer);

                expect(this.cartelSpacer).toBeInLocation('space arena');
                expect(this.cartelSpacer.exhausted).toBe(true);
                expect(this.player1.countSpendableResources()).toBe(4);
                expect(this.player1.countExhaustedResources()).toBe(2);
            });

            it('it should cost 2 extra resources for one aspect penalty', function () {
                this.player1.clickCard(this.firstLegionSnowtrooper);

                expect(this.firstLegionSnowtrooper).toBeInLocation('ground arena');
                expect(this.firstLegionSnowtrooper.exhausted).toBe(true);
                expect(this.player1.countSpendableResources()).toBe(2);
                expect(this.player1.countExhaustedResources()).toBe(4);
            });

            it('it should cost 4 extra resources for two aspect penalties', function () {
                this.player1.clickCard(this.battlefieldMarine);

                expect(this.battlefieldMarine).toBeInLocation('ground arena');
                expect(this.battlefieldMarine.exhausted).toBe(true);
                expect(this.player1.countSpendableResources()).toBe(0);
                expect(this.player1.countExhaustedResources()).toBe(6);
            });
        });
    });
});
