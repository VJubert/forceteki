describe('No Bargain', function () {
    integration(function (contextRef) {
        describe('No Bargain\'s ability', function () {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['no-bargain'],
                    },
                    player2: {
                        hand: ['battlefield-marine', 'green-squadron-awing']
                    }
                });
            });

            it('can buff a unit', function () {
                const { context } = contextRef;
                context.player1.clickCard(context.noBargain);
                expect(context.player2).toBeAbleToSelectExactly([context.battlefieldMarine, context.greenSquadronAwing]);
                context.player2.clickCard(context.battlefieldMarine);
                expect(context.player1.hand.length).toBe(1);
                expect(context.player2.hand.length).toBe(1);
                expect(context.battlefieldMarine.location).toBe('discard');
            });
        });

        describe('No Bargain\'s ability', function () {
            beforeEach(function () {
                this.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['no-bargain'],
                    },
                    player2: {}
                });
            });

            it('can buff a unit', function () {
                const { context } = contextRef;
                context.player1.clickCard(context.noBargain);
                expect(context.player2).toBeActivePlayer();
                expect(context.player1.hand.length).toBe(1);
                expect(context.player2.hand.length).toBe(0);
            });
        });
    });
});
