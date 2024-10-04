describe('Cargo Juggernaut', function () {
    integration(function () {
        describe('Cargo Juggernaut\'s ability', function () {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['cargo-juggernaut'],
                        groundArena: ['pyke-sentinel'],
                    },
                    player2: {
                        groundArena: ['rugged-survivors']
                    }
                });
            });

            it('should heal base', function () {
                this.p1Base.damage = 10;
                this.player1.clickCard(this.cargoJuggernaut);
                this.player1.clickPrompt('If you control another [Vigilance] unit, heal 4 damage from your base');
                expect(this.player2).toBeActivePlayer();
                expect(this.p1Base.damage).toBe(6);
            });

            it('should not heal base', function () {
                this.p1Base.damage = 10;
                this.player1.passAction();
                // kill our vigilance unit
                this.player2.clickCard(this.ruggedSurvivors);
                // without vigilance unit cargo should not heal base
                this.player1.clickCard(this.cargoJuggernaut);
                this.player1.clickPrompt('If you control another [Vigilance] unit, heal 4 damage from your base');
                expect(this.player2).toBeActivePlayer();
                expect(this.p1Base.damage).toBe(10);
            });
        });
    });
});
