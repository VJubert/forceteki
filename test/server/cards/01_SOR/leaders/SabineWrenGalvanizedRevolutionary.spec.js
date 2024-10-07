describe('Sabine Wren, Galvanized Revolutionary', function () {
    integration(function () {
        describe('Sabine\'s undeployed ability', function () {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        leader: 'sabine-wren#galvanized-revolutionary'
                    },
                    player2: {}
                });
            });

            it('should damage each base', function () {
                this.player1.clickCard(this.sabineWren);
                this.player1.clickPrompt('Deal 1 damage to each base');
                expect(this.sabineWren.exhausted).toBe(true);
                expect(this.p1Base.damage).toBe(1);
                expect(this.p2Base.damage).toBe(1);
                expect(this.player2).toBeActivePlayer();
            });
        });

        describe('Sabine\'s deployed ability', function () {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        leader: { card: 'sabine-wren#galvanized-revolutionary', deployed: true }
                    },
                    player2: {
                        groundArena: ['battlefield-marine']
                    }
                });
            });

            it('should damage each base', function () {
                // attack base, each base damage should be +1
                this.player1.clickCard(this.sabineWren);
                expect(this.player1).toBeAbleToSelectExactly([this.p2Base, this.battlefieldMarine]);
                this.player1.clickCard(this.p2Base);

                expect(this.player2).toBeActivePlayer();
                expect(this.p1Base.damage).toBe(1);
                expect(this.p2Base.damage).toBe(3);

                this.sabineWren.exhausted = false;
                this.player2.passAction();

                // attack another unit, each base should be damaged
                this.player1.clickCard(this.sabineWren);
                expect(this.player1).toBeAbleToSelectExactly([this.p2Base, this.battlefieldMarine]);
                this.player1.clickCard(this.battlefieldMarine);

                expect(this.player2).toBeActivePlayer();
                expect(this.battlefieldMarine.damage).toBe(2);
                expect(this.p1Base.damage).toBe(2);
                expect(this.p2Base.damage).toBe(4);
            });
        });
    });
});
