describe('Rugged Survivors', function() {
    integration(function() {
        describe('Rugged Survivors\'s ability', function() {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        base: 'security-complex',
                        groundArena: ['rugged-survivors'],
                        leader: { card: 'ig88#ruthless-bounty-hunter', deployed: true }
                    },
                    player2: {
                        groundArena: ['frontier-atrt', 'wampa'],
                        leader: { card: 'boba-fett#daimyo', deployed: true }
                    }
                });
            });

            it('should draw', function () {
                this.player1.clickCard(this.ruggedSurvivors);
                this.player1.clickCard(this.p2Base);
                this.player1.clickPrompt('You may draw a card if you control a leader unit');
                expect(this.player1.hand.length).toBe(1);
                expect(this.p2Base.damage).toBe(3);
            });

            it('should not draw', function () {
                this.player1.pass();
                // kill rugged survivors' leader
                this.player2.clickCard(this.bobaFett);
                this.player2.clickCard(this.ig88);
                expect(this.ig88.deployed).toBeFalse();

                // now he shouldn't be able to draw
                expect(this.player1).toBeActivePlayer();
                this.player1.clickCard(this.ruggedSurvivors);
                this.player1.clickCard(this.p2Base);
                expect(this.player2).toBeActivePlayer();
                expect(this.player1.hand.length).toBe(0);
            });
        });
    });
});
