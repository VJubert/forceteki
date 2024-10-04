describe('Rebel Assault', function() {
    integration(function() {
        describe('Rebel Assault\'s ability', function() {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['rebel-assault'],
                        groundArena: ['pyke-sentinel', 'battlefield-marine'],
                        spaceArena: ['green-squadron-awing']
                    },
                    player2: { }
                });
            });

            it('can defeat an upgrade on a friendly or enemy unit', function () {
                this.player1.clickCard(this.rebelAssault);
                expect(this.player1).toBeAbleToSelectExactly([this.greenSquadronAwing, this.battlefieldMarine]);

                this.player1.clickCard(this.battlefieldMarine);
                // base was automatically choose

                this.player1.clickPrompt('Attack with another REBEL unit. It gets +1/+0 for this attack');
                // a-wing & base were automatically choose

                expect(this.player2).toBeActivePlayer();
                expect(this.p2Base.damage).toBe(8);
            });
        });
    });
});
