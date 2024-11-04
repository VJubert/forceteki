describe('Guavian Antagonizer', function() {
    integration(function(contextRef) {
        describe('Guavian Antagonizer\'s Bounty ability', function() {
            it('should draw a card', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['guavian-antagonizer']
                    },
                    player2: {
                        groundArena: ['wampa']
                    }
                });

                const { context } = contextRef;

                context.player1.clickCard(context.guavianAntagonizer);
                context.player1.clickCard(context.wampa);
                expect(context.player2).toHaveExactPromptButtons(['Bounty: Draw a card', 'Pass']);
                context.player2.clickPrompt('Bounty: Draw a card');
                expect(context.player1.handSize).toBe(0);
                expect(context.player2.handSize).toBe(1);
                expect(context.player2).toBeActivePlayer();
            });

            it('should cause the opponent to take 3 damage to base if their deck is empty', function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        groundArena: ['guavian-antagonizer']
                    },
                    player2: {
                        groundArena: ['wampa'],
                        deck: []
                    }
                });

                const { context } = contextRef;

                context.player1.clickCard(context.guavianAntagonizer);
                context.player1.clickCard(context.wampa);
                expect(context.player2).toHaveExactPromptButtons(['Bounty: Draw a card', 'Pass']);
                context.player2.clickPrompt('Bounty: Draw a card');
                expect(context.player1.handSize).toBe(0);
                expect(context.player2.handSize).toBe(0);
                expect(context.p2Base.damage).toBe(3);
                expect(context.player2).toBeActivePlayer();
            });
        });
    });
});
