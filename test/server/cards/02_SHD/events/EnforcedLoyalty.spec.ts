describe('Enforced Loyalty', function() {
    integration(function(contextRef) {
        describe('Enforced Loyalty\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['enforced-loyalty'],
                        groundArena: ['pyke-sentinel'],
                        spaceArena: ['cartel-spacer']
                    },
                    player2: {
                        groundArena: ['wampa']
                    }
                });
            });

            it('should defeat a friendly unit and draw 2 cards', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.enforcedLoyalty);
                expect(context.player1).toBeAbleToSelectExactly([context.pykeSentinel, context.cartelSpacer]);

                context.player1.clickCard(context.pykeSentinel);
                expect(context.pykeSentinel).toBeInLocation('discard');
                expect(context.player1.handSize).toBe(2);
                expect(context.player2).toBeActivePlayer();
            });
        });

        describe('Enforced Loyalty\'s ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['enforced-loyalty']
                    },
                    player2: {
                        groundArena: ['wampa']
                    }
                });
            });

            it('should do nothing if there are no friendly units', function () {
                const { context } = contextRef;

                context.player1.clickCard(context.enforcedLoyalty);
                expect(context.player1.handSize).toBe(0);
                expect(context.player2).toBeActivePlayer();
            });
        });
    });
});
