describe('Tactical Advantage', function () {
    integration(function () {
        describe('Tactical Advantage\'s ability', function () {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['tactical-advantage'],
                        groundArena: [{ card: 'pyke-sentinel' }],
                        leader: { card: 'sabine-wren#galvanized-revolutionary', deployed: true, damage: 4 }
                    },
                    player2: {
                        groundArena: ['wampa', 'atst'],
                        spaceArena: ['imperial-interceptor']
                    }
                });
            });

            it('can buff a unit', function () {
                this.player1.clickCard(this.tacticalAdvantage);
                expect(this.player1).toBeAbleToSelectExactly([this.pykeSentinel, this.atst, this.sabineWren, this.wampa, this.imperialInterceptor]);

                this.player1.clickCard(this.pykeSentinel);
                expect(this.pykeSentinel.getPower()).toBe(4);
                expect(this.pykeSentinel.getHp()).toBe(5);

                this.player2.clickCard(this.wampa);
                // pyke sentinel is automatically choose
                expect(this.wampa.damage).toBe(4);
                expect(this.pykeSentinel.damage).toBe(4);
                expect(this.pykeSentinel).toBeInLocation('ground arena');
            });
        });
    });
});
