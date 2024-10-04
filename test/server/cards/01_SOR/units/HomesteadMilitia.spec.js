describe('Homestead Militia', function () {
    integration(function () {
        describe('Homestead Militia\'s ability', function () {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['homestead-militia'],
                        resources: ['distant-patroller', 'distant-patroller', 'distant-patroller', 'distant-patroller', 'distant-patroller']
                    },
                    player2: {
                        groundArena: ['rugged-survivors', 'cargo-juggernaut']
                    }
                });
            });

            it('should not gain Sentinel with 6 or more resources', function () {
                this.player1.pass();

                this.player2.clickCard(this.ruggedSurvivors);
                // no sentinel, I can attack base
                expect(this.player2).toBeAbleToSelectExactly([this.p1Base, this.homesteadMilitia]);
                this.player2.clickCard(this.p1Base);
                expect(this.p1Base.damage).toBe(3);

                this.player1.resources.push('distant-patroller');
                this.player1.pass();

                this.player2.clickCard(this.cargoJuggernaut);
                // homestead militia automaticaly selected because of Sentinel
                expect(this.player1).toBeActivePlayer();
                expect(this.homesteadMilitia.location).toBe('discard');
            });
        });
    });
});
