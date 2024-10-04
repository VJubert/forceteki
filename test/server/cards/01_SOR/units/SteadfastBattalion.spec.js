describe('Steadfast Battalion', function() {
    integration(function() {
        describe('Steadfast Battalion\'s ability', function() {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        base: 'security-complex',
                        groundArena: ['steadfast-battalion', 'battlefield-marine'],
                        leader: { card: 'ig88#ruthless-bounty-hunter', deployed: true }
                    },
                    player2: {
                        groundArena: ['frontier-atrt', 'wampa'],
                        leader: { card: 'boba-fett#daimyo', deployed: true }
                    }
                });
            });

            it('should give a unit +2/+2', function () {
                this.player1.clickCard(this.steadfastBattalion);
                this.player1.clickCard(this.p2Base);
                this.player1.clickCard(this.battlefieldMarine);
                expect(this.battlefieldMarine.getPower()).toBe(5)

                this.player2.pass()
                this.player1.clickCard(this.battlefieldMarine);
                this.player1.clickCard(this.p2Base);
                expect(this.p2Base.damage).toBe(10);
            });

            it('should not give a unit +2/+2', function () {
                this.player1.pass();
                // kill steadfast battalion's leader
                this.player2.clickCard(this.bobaFett);
                this.player2.clickCard(this.ig88);
                expect(this.ig88.deployed).toBeFalse();

                // now he shouldn't be buff unit
                this.player1.clickCard(this.steadfastBattalion);
                this.player1.clickCard(this.p2Base);
                expect(this.battlefieldMarine.getPower()).toBe(3)

                this.player2.pass()
                this.player1.clickCard(this.battlefieldMarine);
                this.player1.clickCard(this.p2Base);
                expect(this.p2Base.damage).toBe(8);
            });
        });
    });
});
