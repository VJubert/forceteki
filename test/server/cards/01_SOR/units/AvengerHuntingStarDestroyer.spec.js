describe('Avenger, Hunting Star Destroyer', function() {
    integration(function() {
        describe('Avenger\'s destroy ability', function() {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['avenger#hunting-star-destroyer'],
                        groundArena: ['pyke-sentinel'],
                        spaceArena: ['imperial-interceptor'],
                        leader: { card: 'grand-moff-tarkin#oversector-governor', deployed: true }
                    },
                    player2: {
                        groundArena: ['wampa'],
                        spaceArena: ['cartel-spacer', 'avenger#hunting-star-destroyer'],
                        leader: { card: 'grand-moff-tarkin#oversector-governor', deployed: true }
                    }
                });

                this.p1Avenger = this.player1.findCardByName('avenger#hunting-star-destroyer');
                this.p2Avenger = this.player2.findCardByName('avenger#hunting-star-destroyer');
            });

            it('forces opponent to defeat friendly non-leader unit when Avenger is played', function () {
                // Play Avenger
                this.player1.clickCard(this.p1Avenger);

                // Player 2 must choose its own unit
                expect(this.player2).toBeAbleToSelectExactly([this.wampa, this.cartelSpacer, this.p2Avenger]);
                this.player2.clickCard(this.cartelSpacer);

                // Chosen unit defeated
                expect(this.cartelSpacer).toBeInLocation('discard');
            });

            it('forces opponent to defeat friendly non-leader unit when Avenger attacks', function () {
                this.player2.setActivePlayer();

                // Attack with Avenger, choose base as target
                this.player2.clickCard(this.p2Avenger);
                this.player2.clickCard(this.p1Base);

                // Player 1 must choose its own unit
                expect(this.player1).toBeAbleToSelectExactly([this.imperialInterceptor, this.pykeSentinel]);
                this.player1.clickCard(this.pykeSentinel);
                expect(this.pykeSentinel).toBeInLocation('discard');
                expect(this.p1Base.damage).toBe(8);
            });

            it('allows the defender to be defeated and end the attack', function () {
                this.player2.setActivePlayer();

                // Attack with Avenger, choose interceptor as target
                this.player2.clickCard(this.p2Avenger);
                this.player2.clickCard(this.imperialInterceptor);

                // Interceptor not yet destroyed
                expect(this.imperialInterceptor).toBeInLocation('space arena');

                // Player 1 must choose its own unit
                expect(this.player1).toBeAbleToSelectExactly([this.imperialInterceptor, this.pykeSentinel]);

                // Choose the defender and check it was destroyed
                this.player1.clickCard(this.imperialInterceptor);
                expect(this.imperialInterceptor).toBeInLocation('discard');

                // Ensure no damage happened
                expect(this.p2Avenger.damage).toBe(0);
                expect(this.p1Base.damage).toBe(0);
            });
        });
    });
});
