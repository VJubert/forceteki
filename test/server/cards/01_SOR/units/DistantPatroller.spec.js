describe('Distant Patroller', function () {
    integration(function () {
        describe('Distant Patroller\'s ability', function () {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['death-trooper'],
                        spaceArena: ['red-three#unstoppable', 'distant-patroller', 'avenger#hunting-star-destroyer', 'inferno-four#unforgetting']
                    },
                    player2: {
                        spaceArena: ['system-patrol-craft']
                    }
                });
            });

            it('should give a shield to an another ally', function () {
                // kill distant patroller on sentinel
                this.player1.clickCard(this.distantPatroller);
                expect(this.player1).toBeAbleToSelectExactly([this.deathTrooper, this.avenger, this.infernoFour, this.systemPatrolCraft]);
                // add a shield on avenger
                this.player1.clickCard(this.avenger);
                expect(this.distantPatroller.location).toBe('discard');
                expect(this.avenger).toHaveExactUpgradeNames(['shield']);
            });
        });
    });
});
