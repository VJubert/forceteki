describe('Cartel Turncoat', function() {
    integration(function(contextRef) {
        describe('Cartel Turncoat\'s Bounty ability', function() {
            it('should draw a card', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        spaceArena: ['cartel-turncoat']
                    },
                    player2: {
                        spaceArena: ['razor-crest#reliable-gunship']
                    }
                });

                const { context } = contextRef;

                context.player1.clickCard(context.cartelTurncoat);
                context.player1.clickCard(context.razorCrest);
                expect(context.player1.handSize).toBe(0);
                expect(context.player2.handSize).toBe(1);
                expect(context.player2).toBeActivePlayer();
            });

            it('should cause the opponent to take 3 damage to base if their deck is empty', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        spaceArena: ['cartel-turncoat']
                    },
                    player2: {
                        spaceArena: ['razor-crest#reliable-gunship'],
                        deck: []
                    }
                });

                const { context } = contextRef;

                context.player1.clickCard(context.cartelTurncoat);
                context.player1.clickCard(context.razorCrest);
                expect(context.player1.handSize).toBe(0);
                expect(context.player2.handSize).toBe(0);
                expect(context.p2Base.damage).toBe(3);
                expect(context.player2).toBeActivePlayer();
            });
        });
    });
});
