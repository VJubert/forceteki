describe('Devotion', function() {
    integration(function() {
        describe('Devotion\'s ability', function() {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: [{ card: 'wampa', upgrades: ['devotion'] }],
                    },
                    player2: {
                    }
                });
            });

            it('should cause the attached card to heal 2 damage from base on attack', function () {
                this.p1Base.damage = 5;

                // attack resolves automatically since there's only one target (p2Base)
                this.player1.clickCard(this.wampa);

                expect(this.p1Base.damage).toBe(3);
                expect(this.p2Base.damage).toBe(5);
                expect(this.wampa.exhausted).toBe(true);
            });
        });
    });
});
